// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import image4 from '../photos/kyl.png';
// import './css/MenuBar.css';

// const MenuBar = () => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     const handleLogout = () => {
//         setIsLoggedIn(false);
//     };

//     return (
//         <div className="menu-container">
//             <div className="logo-container">
//                 <Link to="/"><img src={image4} alt="Logo" className="logo" /></Link>
//                 <div className="text">K Y L K A L E M</div>
//                 <div className="menu">
//                     <ul>
//                         <li><Link to="/home">Home</Link></li>
//                         <li><Link to="/about">About</Link></li>
//                         <li><Link to="/catalog">Catalog</Link></li>
//                         <li><Link to="/artists">Artists</Link></li>
//                         {isLoggedIn ? (
//                             <>
//                                 <li><Link to="/account">Account</Link></li>
//                                 <li><button onClick={handleLogout}>Logout</button></li>
//                             </>
//                         ) : (
//                             <>
//                                 <li><Link to="/register">Signup</Link></li>
//                                 <li><Link to="/login">Login</Link></li>
//                             </>
//                         )}
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default MenuBar;

import React from 'react';
import { Link } from 'react-router-dom';
import image4 from '../photos/kyl.png';
import './css/MenuBar.css';

const MenuBar = ({ isLoggedIn }) => {
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
                        <li><Link to="/artists">Artists</Link></li>
                        {/* Conditionally render menu items based on login status */}
                        {isLoggedIn ? (
                            <>
                                <li><Link to="/account_painter">Account</Link></li>
                                <li><Link to="/logout">Logout</Link></li>
                            </>
                        ) : (
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
