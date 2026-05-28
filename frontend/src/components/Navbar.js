import React from 'react';
import {Link} from 'react-router-dom';

const Navbar=()=>{
    return(
        <nav>
            <h1>AI Chat Support</h1>
            <div>
                <Link to="/">Chat</Link>
                <Link to="/tickets">Tickets</Link>
            </div>
        </nav>
    );
};

export default Navbar;