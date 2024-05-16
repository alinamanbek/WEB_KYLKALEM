import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/Basket.css';

const Basket = ({ basket, removeFromBasket }) => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [messages, setMessages] = useState({});

    const handleOrder = async (painterId) => {
        try {
            if (!painterId) {
                setError('Painter ID is not defined');
                return;
            }

            if (basket.length === 0) {
                setError('Cannot place order: Basket is empty');
                return;
            }

            const selectedPainting = basket[0];

            if (!selectedPainting) {
                setError('Selected painting is undefined');
                return;
            }

            const selectedPaintingId = selectedPainting.id;
            const customerId = localStorage.getItem('customerId');

            if (!customerId) {
                setError('Customer ID is invalid');
                return;
            }

            const customerMessage = messages[painterId];

            const orderData = {
                painting: selectedPaintingId,
                customer: customerId,
                painter: painterId,
                status: 'pending',
                message: customerMessage || '',
            };

            const orderResponse = await axios.post(`${process.env.REACT_APP_API_URL}/orders/`, orderData);

            console.log('Order placed successfully:', orderResponse.data);
            removeFromBasket(selectedPaintingId);
            navigate('/basket');
        
            alert('Successfully sent! Our painter will contact with you.');
        } catch (error) {
            console.error('Failed to place order:', error);
            setError('Failed to place order. Please try again later.');
        }
    };

    const handleInputChange = (painterId, message) => {
        setMessages(prevMessages => ({
            ...prevMessages,
            [painterId]: message
        }));
    };

    const handleRemove = (paintingId) => {
        removeFromBasket(paintingId);
    };

    const renderBasketItems = () => {
        const groupedPaintings = {};
        basket.forEach(painting => {
            if (!groupedPaintings[painting.painter_id]) {
                groupedPaintings[painting.painter_id] = [];
            }
            groupedPaintings[painting.painter_id].push(painting);
        });


        return Object.entries(groupedPaintings).map(([painterId, paintings]) => (
            <div key={painterId} className="painter-group">
  <h3 className="painter-name">Painter: {paintings[0].painter_name}</h3>
  <div className="paintings-container">
    {paintings.map((painting, index) => (
      <div key={index} className="painting-item">
        <div className="painting-content">
          <img src={`http://localhost:8000${painting.image}`} alt={painting.name} className="painting-item-image" />
          <div className="painting-details">
            <p className="painting-name">{painting.name}</p>
            <p className="painting-cost">{painting.price}</p>
          </div>
        </div>
        <button className="remove-button" onClick={() => handleRemove(painting.id)}>Remove</button>
      </div>
    ))}
  </div>
  <div className="message-order-container">
    <div className="message-input">
      <textarea
        className="message-textarea"
        placeholder="Add your phone number"
        value={messages[painterId] || ''}
        onChange={(e) => handleInputChange(painterId, e.target.value)}
      ></textarea>
    </div>
    <button className="order-button" onClick={() => handleOrder(painterId)}>Order</button>
  </div>
</div>

        ));
    };

    return (
        <div className="basket-container">
            <h2 className="basket-heading">Your Basket</h2>
            <div className="basket-items">
                {basket.length > 0 ? renderBasketItems() : <p className="empty-basket-message">Your basket is empty.</p>}
            </div>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default Basket;
