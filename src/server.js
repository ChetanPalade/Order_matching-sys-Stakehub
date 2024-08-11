// //const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const bodyParser = require('body-parser');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// app.use(bodyParser.json());

// // In-memory storage (replace with database logic)
// let pendingOrders = [];
// let completedOrders = [];

// // API to create a new order
// app.post('/orders', (req, res) => {
//   const { buyer_qty, buyer_price, seller_price, seller_qty } = req.body;

//   // Find matching orders
//   const matchIndex = pendingOrders.findIndex(
//     order => order.seller_price === buyer_price || order.buyer_price === seller_price
//   );

//   if (matchIndex !== -1) {
//     // Move matching order to completedOrders
//     const matchedOrder = pendingOrders.splice(matchIndex, 1)[0];
//     const qty = Math.min(buyer_qty, matchedOrder.seller_qty);
//     completedOrders.push({ price: buyer_price, qty });
//     io.emit('orderCompleted', { price: buyer_price, qty });
//   } else {
//     // Add new order to pendingOrders
//     pendingOrders.push({ buyer_qty, buyer_price, seller_price, seller_qty });
//     io.emit('orderPending', { buyer_qty, buyer_price, seller_price, seller_qty });
//   }

//   res.status(201).json({ message: 'Order processed successfully.' });
// });

// // API to get all orders
// app.get('/orders', (req, res) => {
//   res.json({ pending: pendingOrders, completed: completedOrders });
// });

// // Handle WebSocket connections
// io.on('connection', (socket) => {
//   console.log('New client connected');

//   // Send current orders when a new client connects
//   socket.emit('initialData', { pending: pendingOrders, completed: completedOrders });

//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   });
// });

// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
