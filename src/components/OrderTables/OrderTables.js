import React from 'react';

const OrderTables = ({ pendingOrders, completedOrders }) => {
  return (
    <div>
      <h2>Pending Orders</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Buyer Qty</th>
            <th>Buyer Price</th>
            <th>Seller Price</th>
            <th>Seller Qty</th>
          </tr>
        </thead>
        <tbody>
          {pendingOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.buyer_qty}</td>
              <td>{order.buyer_price}</td>
              <td>{order.seller_price}</td>
              <td>{order.seller_qty}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Completed Orders</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Price</th>
            <th>Qty</th>
          </tr>
        </thead>
        <tbody>
          {completedOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.price}</td>
              <td>{order.qty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTables;
