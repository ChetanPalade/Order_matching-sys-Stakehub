// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import OrderForm from './components/OrderForm';
import OrderTables from './components/OrderTables';
import PriceChart from './components/PriceChart';


const socket = io('http://localhost:3000');

const App = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);

  useEffect(() => {
    fetchOrders();

    // Real-time update listener
    socket.on('orderMatched', (newOrder) => {
      setCompletedOrders((prevCompletedOrders) => [
        ...prevCompletedOrders,
        newOrder,
      ]);
      fetchOrders();
    });

    return () => {
      socket.off('orderMatched');
    };
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3000/orders');
      setPendingOrders(response.data.pending);
      setCompletedOrders(response.data.completed);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleOrderSubmit = async (order) => {
    try {
      await axios.post('http://localhost:3000/orders', order);
      fetchOrders(); // Refresh orders after submission
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  return (
    <div className="App">
      <h1>Order Matching System</h1>
      <OrderForm onSubmit={handleOrderSubmit} />
      <OrderTables pendingOrders={pendingOrders} completedOrders={completedOrders} />
      <PriceChart completedOrders={completedOrders} />
    </div>
  );
};

export default App;
