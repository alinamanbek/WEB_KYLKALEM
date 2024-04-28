// PaintingModal.js
import React from 'react';
import './css/PaintingModal.css';

const PaintingModal = ({ paint, onClose }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <div className="painting-details">
                    <div className="image-container">
                        <img src={`http://localhost:8000${paint.image}`} alt={paint.name} className="painting-image" />
                    </div>
                    <div className="details">
                        <h2>{paint.name}</h2>
                        <p>Painter: {paint.painter ? paint.painter.name : 'Unknown'}</p>
                        <p>Price: ${paint.price}</p>
                        <p>About: {paint.about_paint}</p>
                        <button>Add to Bag</button>
                        <button>Order</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaintingModal;
