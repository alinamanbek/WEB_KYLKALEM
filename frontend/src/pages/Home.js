 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Home.css';
import { Link } from 'react-router-dom';
import image3 from '../photos/shyrdak.jpg';
import photo2 from '../photos/2.png';

const HomePaintCard = ({ paint }) => {
    return (
        <Link to={`/detail/${paint.id}`} className="home-paint-card-link">
            <div className="home-paint-card">
                <div className="home-paint-image-container">
                    <img src={`http://localhost:8000${paint.image}`} alt={paint.name} className="home-paint-image" />
                </div>
                <div className="home-paint-details">
                    <h3>{paint.name}</h3>
                    <p>Price: ${paint.price}</p>
                </div>
            </div>
        </Link>
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
            <div className="home-full-screen-photo">
                <img src={image3} alt="Full Screen" />
            </div>

            {/* "WHO WE ARE" text */}
            <div className="home-who-we-are">
                <h2 style={{ fontFamily: 'Frank Ruhl Libre' }}>WHO WE ARE</h2>
            </div>

            {/* First section */}
            <div className="home-two-part-division">
                {/* Left side text */}
                <div className="home-left-side-text">
                    <p style={{ fontFamily: 'Frank Ruhl Libre' }}>
                        The "Erkindik" Gallery, nestled in the shady alley between Ala-Too Square and Oak Park, is often referred to as Bishkek's Arbat or Vernissage. Here, one can explore paintings by local artists, showcasing a riot of colors and a diversity of styles. Visitors have the opportunity to commission new artworks of any genre, while portraits are crafted in mere minutes. This artistic haven reflects the vibrant culture and creativity of Bishkek, inviting patrons to immerse themselves in the beauty of local talent and the dynamic art scene.
                    </p>
                    {/* Read more link */}
                    <Link to="/about" className="home-read-more">Read</Link>
                </div>

                {/* Right side photo */}
                <div className="home-right-side-photo">
                    <img src={photo2} alt="2nd" width="470" height="350" />
                </div>
            </div>

            {/* Second section */}
            <div className="home-two-part-division">
                {/* Left side photo */}
                <div className="home-left-side-photo">
                    <img src={photo2} alt="2nd" width="470" height="350" />
                </div>

                {/* Right side text */}
                <div className="home-right-side-text">
                    <p style={{ fontFamily: 'Frank Ruhl Libre' }}>
                        Add your text here...
                    </p>
                </div>
            </div>

            {/* Third section */}
            <div className="home-two-part-division">
                {/* Left side text */}
                <div className="home-left-side-text">
                    <p style={{ fontFamily: 'Frank Ruhl Libre' }}>
                        Add your text here...
                    </p>
                    {/* Read more link */}
                    <Link to="/about" className="home-read-more">Read</Link>
                </div>

                {/* Right side photo */}
                <div className="home-right-side-photo">
                    <img src={photo2} alt="2nd" width="470" height="350" />
                </div>
            </div>

            <div className="home-paint-cards-container">
 
  <div className="home-paint-rows-container">
    {paintings.map((paint, index) => (
      <React.Fragment key={paint.id}>
        <HomePaintCard paint={paint} />
        
        {(index + 1) % 3 === 0 && <div className="home-paint-row-divider" />}
      </React.Fragment>
    ))}
  </div>
</div>

            
            {/* Link to more paintings */}
            <Link to="/catalog" className="home-more-link">More</Link>
        </div>
    );
}

export default Home;
