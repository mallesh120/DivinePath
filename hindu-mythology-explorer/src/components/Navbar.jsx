import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/gods">Gods</Link>
                </li>
                <li>
                    <Link to="/literature">Literature</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;