import React from 'react';

const BookCard = ({ book }) => {
    return (
        <div className="book-card">
            <h4>{book.title}</h4>
            <p>{book.summary}</p>
        </div>
    );
};

export default BookCard;