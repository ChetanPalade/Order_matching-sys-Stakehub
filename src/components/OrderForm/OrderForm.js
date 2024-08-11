import React, { useState } from 'react';

const OrderForm = ({ onSubmit }) => {
  const [buyerQty, setBuyerQty] = useState('');
  const [buyerPrice, setBuyerPrice] = useState('');
  const [sellerPrice, setSellerPrice] = useState('');
  const [sellerQty, setSellerQty] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const order = {
      buyer_qty: parseInt(buyerQty),
      buyer_price: parseFloat(buyerPrice),
      seller_price: parseFloat(sellerPrice),
      seller_qty: parseInt(sellerQty),
    };
    onSubmit(order);
    setBuyerQty('');
    setBuyerPrice('');
    setSellerPrice('');
    setSellerQty('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Buyer Qty:</label>
        <input
          type="number"
          value={buyerQty}
          onChange={(e) => setBuyerQty(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Buyer Price:</label>
        <input
          type="number"
          step="0.01"
          value={buyerPrice}
          onChange={(e) => setBuyerPrice(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Seller Price:</label>
        <input
          type="number"
          step="0.01"
          value={sellerPrice}
          onChange={(e) => setSellerPrice(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Seller Qty:</label>
        <input
          type="number"
          value={sellerQty}
          onChange={(e) => setSellerQty(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit Order</button>
    </form>
  );
};

export default OrderForm;
