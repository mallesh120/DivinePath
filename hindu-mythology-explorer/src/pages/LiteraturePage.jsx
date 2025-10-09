import React, { useState, useEffect } from 'react';
import { getRamayana } from '../services/api';
import BookCard from '../components/BookCard';

const LiteraturePage = () => {
    const [ramayana, setRamayana] = useState(null);

    useEffect(() => {
        getRamayana().then(response => {
            setRamayana(response.data);
        });
    }, []);

    if (!ramayana) {
        return <div>Loading...</div>;
    }

    return (
        <div className="literature-library">
            <h2>{ramayana.title}</h2>
            <p>{ramayana.summary}</p>
            <div className="books-gallery">
                {ramayana.books.map(book => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
        </div>
    );
};

export default LiteraturePage;