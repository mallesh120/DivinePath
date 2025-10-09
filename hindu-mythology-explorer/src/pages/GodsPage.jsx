import React, { useState, useEffect } from 'react';
import { getGods } from '../services/api';
import GodCard from '../components/GodCard';

const GodsPage = () => {
    const [gods, setGods] = useState([]);

    useEffect(() => {
        getGods().then(response => {
            setGods(response.data);
        });
    }, []);

    return (
        <div className="gods-gallery">
            {gods.map(god => (
                <GodCard key={god.id} god={god} />
            ))}
        </div>
    );
};

export default GodsPage;