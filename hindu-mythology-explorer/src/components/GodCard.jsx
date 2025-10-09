import React from 'react';

const GodCard = ({ god }) => {
    return (
        <div className="god-card">
            <h3>{god.name}</h3>
            <p>{god.description}</p>
        </div>
    );
};

export default GodCard;