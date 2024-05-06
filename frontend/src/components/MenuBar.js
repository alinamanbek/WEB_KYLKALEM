 
import React from 'react';
import { Link } from 'react-router-dom';
import image4 from '../photos/kyl.png';
import './css/MenuBar.css';

const MenuBar = ({ isLoggedIn, basket }) => {
 
    const userType = localStorage.getItem('userType');  

    return (
        <div className="menu-container">
            <div className="logo-container">
                <Link to="/"><img src={image4} alt="Logo" className="logo" /></Link>
                <div className="text">K Y L K A L E M</div>
                <div className="menu">
                    <ul>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/catalog">Catalog</Link></li>
                       
                        {/* Conditional rendering based on user type */}
                        {isLoggedIn && userType === 'painter' && (
                            <>
                                <li><Link to="/account_painter">Account</Link></li>
                                <li><Link to="/logout">Logout</Link></li>
                            </>
                        )}
                        {isLoggedIn && userType === 'customer' && (
                            <>
                                <li><Link to={{ pathname: "/basket", state: { basket } }}>Basket</Link></li>
                                <li><Link to="/logout">Logout</Link></li>
                            </>
                        )}
                        {/* Default menu items for unauthenticated users */}
                        {!isLoggedIn && (
                            <>
                                <li><Link to="/register">Signup</Link></li>
                                <li><Link to="/login">Login</Link></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default MenuBar;
