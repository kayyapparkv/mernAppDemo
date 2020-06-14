import React from 'react';
import {Link} from 'react-router-dom';

import './App.css';

function Nav() {

    return (
        <nav>
            <ul className = "nav-links">
                <Link className="nav-style" to="/">
                    <li>Home</li>
                </Link>
                <Link className="nav-style" to='/details'>
                    <li>Add Cattle Details</li>
                </Link>
            </ul>
        </nav>
        
    );
}

export default Nav;