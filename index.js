// index.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

// Set up Express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server);



app.use(express.json());
app.use(cors());

// Set up SQLite database
const db = new sqlite3.Database(':memory:');

// Create tables
db.serialize(() => {
  db.run(`
    CREATE TABLE PendingOrderTable (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      buyer_qty INTEGER,
      buyer_price REAL,
      seller_price REAL,
      seller_qty INTEGER
    )
  `);

  db.run(`
    CREATE TABLE CompletedOrderTable (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      price REAL,
      qty INTEGER
    )
  `);
});

// API route to get all orders
app.get('/orders', (req, res) => {
  db.serialize(() => {
    db.all(`SELECT * FROM PendingOrderTable`, [], (err, pendingOrders) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      db.all(`SELECT * FROM CompletedOrderTable`, [], (err, completedOrders) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }

        res.json({ pending: pendingOrders, completed: completedOrders });
      });
    });
  });
});

// API route to create a new order
app.post('/orders', (req, res) => {
  const { buyer_qty, buyer_price, seller_price, seller_qty } = req.body;

  db.serialize(() => {
    const stmt = db.prepare(`
      INSERT INTO PendingOrderTable (buyer_qty, buyer_price, seller_price, seller_qty)
      VALUES (?, ?, ?, ?)
    `);
    stmt.run(buyer_qty, buyer_price, seller_price, seller_qty, function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      matchOrders();
      res.status(201).json({ message: 'Order created', id: this.lastID });
    });
    stmt.finalize();
  });
});

// Order matching logic
function matchOrders() {
  db.serialize(() => {
    db.all(`
      SELECT * FROM PendingOrderTable
      WHERE buyer_price >= seller_price
      ORDER BY buyer_price DESC, seller_price ASC
    `, [], (err, orders) => {
      if (err) {
        console.error('Error matching orders:', err.message);
        return;
      }

      orders.forEach(order => {
        const matchedQty = Math.min(order.buyer_qty, order.seller_qty);

        db.run(`
          INSERT INTO CompletedOrderTable (price, qty)
          VALUES (?, ?)
        `, [order.seller_price, matchedQty]);

        db.run(`
          DELETE FROM PendingOrderTable
          WHERE id = ?
        `, [order.id]);

        if (order.buyer_qty > order.seller_qty) {
          db.run(`
            INSERT INTO PendingOrderTable (buyer_qty, buyer_price, seller_price, seller_qty)
            VALUES (?, ?, ?, ?)
          `, [order.buyer_qty - matchedQty, order.buyer_price, order.seller_price, 0]);
        } else if (order.seller_qty > order.buyer_qty) {
          db.run(`
            INSERT INTO PendingOrderTable (buyer_qty, buyer_price, seller_price, seller_qty)
            VALUES (?, ?, ?, ?)
          `, [0, order.buyer_price, order.seller_price, order.seller_qty - matchedQty]);
        }

        // Notify the frontend about the match
        io.emit('orderMatched', {
          price: order.seller_price,
          qty: matchedQty
        });
      });
    });
  });
}

// Set up WebSocket connection
io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
