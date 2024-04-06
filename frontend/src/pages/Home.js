// Home.js
import React from 'react';
import image3 from '../photos/shyrdak.jpg'; 
 
import './css/Home.css'; // Import your CSS file for styling

const Home = () => {
    return (
        <div className="home-container">
           
            {/* Full-screen photo */}
            <div className="full-screen-photo">
                <img src={image3} 
                alt="Full Screen" />
            </div>
        </div>
    );
}

export default Home;
