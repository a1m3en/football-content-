import React from "react";
import "./Navbar.css";  

const Navbar = ({ selected, setSelected }) => {
    
    const handleClick = (item) => {
        setSelected(item);
    }
    
    return(
        <div>
            <nav className="navbar">
                <div className="navbar-brand">
                    <h1>⚽ Football Content Hub</h1>
                </div>
                <ul className="navbar-list">
                    <li className={`navbar-item ${selected === 'Home' ? 'active' : ''}`} onClick={() => handleClick('Home')}>Home</li>
                    <li className={`navbar-item ${selected === 'Matches' ? 'active' : ''}`} onClick={() => handleClick('Matches')}>Matches</li>
                    <li className={`navbar-item ${selected === 'Summaries' ? 'active' : ''}`} onClick={() => handleClick('Summaries')}>AI Summaries</li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;