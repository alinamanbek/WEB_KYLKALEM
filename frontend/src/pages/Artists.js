import React from 'react';
import './css/Artists.css'; // Import CSS styles for the Artists page
import artist1Image from '../photos/artist1.jpg'; // Import images for the Artists page
import artist2Image from '../photos/artist2.jpg';
import artist3Image from '../photos/artist3.jpg';

const Artists = () => {
    return (
        <div className="artists-container">
            <h2>Featured Artists</h2>
            <table className="artists-table">
                <thead>
                    <tr>
                        <th>Picture</th>
                        <th>Name</th>
                        <th>About</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><img src={artist1Image} alt="Artist 1" className="artist-image" /></td>
                        <td>Artist 1</td>
                        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod velit sit amet enim vulputate fringilla. Nullam non diam vitae urna semper tempor.</td>
                    </tr>
                    <tr>
                        <td><img src={artist2Image} alt="Artist 2" className="artist-image" /></td>
                        <td>Artist 2</td>
                        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod velit sit amet enim vulputate fringilla. Nullam non diam vitae urna semper tempor.</td>
                    </tr>
                    <tr>
                        <td><img src={artist3Image} alt="Artist 3" className="artist-image" /></td>
                        <td>Artist 3</td>
                        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod velit sit amet enim vulputate fringilla. Nullam non diam vitae urna semper tempor.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Artists;
