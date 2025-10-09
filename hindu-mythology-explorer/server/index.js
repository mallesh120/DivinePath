const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const gods = [
    { id: 1, name: 'Ganesha', description: 'Ganesha is the god of beginnings, wisdom, and success. He is widely revered as the remover of obstacles.' },
    { id: 2, name: 'Shiva', description: 'Shiva is one of the principal deities of Hinduism. He is the supreme being within Shaivism, one of the major traditions within contemporary Hinduism.' },
    { id: 3, name: 'Vishnu', description: 'Vishnu is the preserver and protector of the universe. His role is to return to the earth in troubled times and restore the balance of good and evil.' },
    { id: 4, name: 'Lakshmi', description: 'Lakshmi is the goddess of wealth, fortune, and prosperity. She is the wife and active energy of Vishnu.' },
    { id: 5, name: 'Saraswati', description: 'Saraswati is the goddess of knowledge, music, art, wisdom, and learning. She is a part of the trinity of Saraswati, Lakshmi, and Parvati.' }
];

const ramayana = {
    title: 'Ramayana',
    summary: 'The Ramayana is an ancient Indian epic poem which narrates the struggle of the divine prince Rama to rescue his wife Sita from the demon king Ravana.',
    books: [
        { id: 1, title: 'Bala Kanda', summary: 'The book of childhood.' },
        { id: 2, title: 'Ayodhya Kanda', summary: 'The book of Ayodhya.' },
        { id: 3, title: 'Aranya Kanda', summary: 'The book of the forest.' },
        { id: 4, title: 'Kishkindha Kanda', summary: 'The book of the monkey kingdom.' },
        { id: 5, title: 'Sundara Kanda', summary: 'The book of beauty.' },
        { id: 6, title: 'Yuddha Kanda', summary: 'The book of war.' },
        { id: 7, title: 'Uttara Kanda', summary: 'The book of the north.' }
    ]
};

app.get('/api/gods', (req, res) => {
    res.json(gods);
});

app.get('/api/ramayana', (req, res) => {
    res.json(ramayana);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});