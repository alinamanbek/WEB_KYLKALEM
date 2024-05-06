import React from 'react';
import './css/Basket.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; 

const Basket = ({ basket, removeFromBasket }) => {
    const handleRemove = (index) => {
        removeFromBasket(index);
    };

    const handleOrder = async () => {
      try {
          if (basket.length === 0) {
              console.error('Cannot place order: Basket is empty');
              return;
          }
  
          const selectedPaintingId = basket[0].id; // Select the first painting from the basket
          
          const customerId = 1; // Replace with actual customer ID
          const painterId = 1; // Replace with actual painter ID
          const status = 'pending'; // Replace with actual status
          
          const orderData = {
              painting: selectedPaintingId, // Provide the primary key of the selected painting
              customer: customerId,
              painter: painterId,
              status: status
          };
          
          const response = await axios.post('http://localhost:8000/orders/', orderData);
          console.log('Order placed successfully:', response.data);
      } catch (error) {
          console.error('Failed to place order:', error);
      }
  };
  

    return (
        <div className="basket-page">
            <h2 className="basket-heading">Your Basket</h2>
            <div className="basket-items">
                {basket && basket.length > 0 ? (
                    basket.map((painting, index) => (
                        <div key={index} className="basket-item">
                            <img src={`http://localhost:8000${painting.image}`} alt={painting.name} className="basket-item-image" />
                            <div className="basket-item-details">
                                <p className="basket-item-name">{painting.name}</p>
                                <p className="basket-item-price">${painting.price}</p>
                            </div>
                            <button className="remove-item-button" onClick={() => handleRemove(index)}>
                                <FontAwesomeIcon icon={faTimes} className="remove-icon" />
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="empty-basket-message">Your basket is empty.</p>
                )}
            </div>
            {basket.length > 0 && (
                <button className="order-button" onClick={handleOrder}>Order</button>
            )}
        </div>
    );
};

export default Basket;
