import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Home.css';
import { Link } from 'react-router-dom';
import image3 from '../photos/shyrdak.jpg';
import photo2 from '../photos/2.png';

const PaintCard = ({ paint }) => {
    return (
        <div className="paint-card">
            <div className="paint-image-container">
                <img src={`http://localhost:8000${paint.image}`} alt={paint.name} className="paint-image" />
            </div>
            <div className="paint-details">
                <h3>{paint.name}</h3>
                <p>Price: ${paint.price}</p>
            </div>
        </div>
    );
};

const Home = () => {
    const [paintings, setPaintings] = useState([]);

    useEffect(() => {
        const fetchPaintings = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/recent_paintings/');
                setPaintings(response.data);
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

           {/* First section */}
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

{/* Second section */}
<div className="two-part-division">
    {/* Left side photo */}
    <div className="left-side-photo">
        <img src={photo2} alt="2nd" width="470" height="350" />
    </div>

    {/* Right side text */}
    <div className="right-side-text">
        <p style={{ fontFamily: 'Frank Ruhl Libre' }}>
            Add your text here...
        </p>
    </div>
</div>

{/* Third section */}
<div className="two-part-division">
    {/* Left side text */}
    <div className="left-side-text">
        <p style={{ fontFamily: 'Frank Ruhl Libre' }}>
            Add your text here...
        </p>
        {/* Read more link */}
        <Link to="/about" className="read-more">Read</Link>
    </div>

    {/* Right side photo */}
    <div className="right-side-photo">
        <img src={photo2} alt="2nd" width="470" height="350" />
    </div>
</div>


            <div className="paint-cards-container">
                {/* Displaying paint cards */}
                <div className="paint-cards-row">
                    {paintings.map(paint => (
                        <PaintCard key={paint.id} paint={paint} />
                    ))}
                </div>
            </div>

            {/* Link to more paintings */}
            <Link to="/catalog" className="more-link">More</Link>
        </div>
    );
}

export default Home;
