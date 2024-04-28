// PaintCard.js
import React from 'react';

const PaintCard = ({ paint }) => {
    const handleCardClick = () => {
        // Show alert with painting details
     
    };

    return (
        <div className="paint-card" onClick={handleCardClick}>
            <div className="paint-card-content">
                <div className="paint-image-container">
                    <img src={`http://localhost:8000${paint.image}`} alt={paint.name} className="paint-image" />
                </div>
                <div className="paint-details">
                    <h3>{paint.name}</h3>
                    <p>Painter: {paint.painter ? paint.painter.name : 'Unknown'}</p>
                    <p>Price: ${paint.price}</p>
                </div>
            </div>
        </div>
    );
};

export default PaintCard;
