import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GodsPage from './pages/GodsPage';
import LiteraturePage from './pages/LiteraturePage';
import Navbar from './components/Navbar';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Hindu Mythology Explorer</h1>
                <Navbar />
            </header>
            <main>
                <Routes>
                    <Route path="/gods" element={<GodsPage />} />
                    <Route path="/literature" element={<LiteraturePage />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;