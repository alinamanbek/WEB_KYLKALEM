// Home.js
// import React from 'react';
import image3 from '../photos/shyrdak.jpg';
import photo2 from '../photos/2.png'; // Import photo2
import { Link } from 'react-router-dom'; // Import Link for routing
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Home.css'; 

const Home = () => {
    const [paintings, setPaintings] = useState([]);
    useEffect(() => {
        const fetchPaintings = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/paintings/');
                setPaintings(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPaintings();
    }, []);
    return (
        <div className="home-container">
            {/* Full-screen photo */}
            <div className="full-screen-photo">
                <img src={image3} alt="Full Screen" />
            </div>
            
            {/* "WHO WE ARE" text */}
            <div className="who-we-are">
                <h2 style={{ fontFamily: 'Frank Ruhl Libre' }}>WHO WE ARE</h2>
            </div>
            
            {/* Two-part division */}
            <div className="two-part-division">
                {/* Left side text */}
                <div className="left-side-text">
                    <p style={{ fontFamily: 'Frank Ruhl Libre' }}>
                        The "Erkindik" Gallery, nestled in the shady alley between Ala-Too Square and Oak Park, is often referred to as Bishkek's Arbat or Vernissage. Here, one can explore paintings by local artists, showcasing a riot of colors and a diversity of styles. Visitors have the opportunity to commission new artworks of any genre, while portraits are crafted in mere minutes. This artistic haven reflects the vibrant culture and creativity of Bishkek, inviting patrons to immerse themselves in the beauty of local talent and the dynamic art scene.
                    </p>
                    {/* Read more link */}
                    <Link to="/about" className="read-more">Read</Link>
                </div>
                
                {/* Right side photo */}
                <div className="right-side-photo">
                    <img src={photo2} alt="2nd" width="470" height="350" />
                </div>
                
            </div>
            <div>
                {paintings.map(painting => (
                    <img key={painting.id} src={`http://localhost:8000${painting.image}`} alt={painting.name} />
                ))}
                </div>
        </div>
    );
}

export default Home;
