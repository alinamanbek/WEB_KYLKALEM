// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import './css/Catalog.css';

// const PaintCard = ({ paint }) => {
//     return (
//         <div className="paint-card">
//             <div className="paint-image-container">
//                 <img src={`http://localhost:8000${paint.image}`} alt={paint.name} className="paint-image" />
//             </div>
//             <div className="paint-details">
//                 <h3>{paint.name}</h3>
//                 <p>Painter: {paint.painter ? paint.painter.name : 'Unknown'}</p>
//                 <p>Price: ${paint.price}</p>
//             </div>
//         </div>
//     );
// };

// const Catalog = () => {
//     const [paintings, setPaintings] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchPaintings = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8000/api/all_paintings/');
//                 setPaintings(response.data);
//             } catch (error) {
//                 setError(error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchPaintings();
//     }, []);

//     const handleSearchChange = event => {
//         setSearchTerm(event.target.value);
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error.message}</div>;
//     }

//     const filteredPaintings = paintings.filter(paint => {
//         const nameMatch = paint.name.toLowerCase().includes(searchTerm.toLowerCase());
//         const costMatch = paint.price.toString().includes(searchTerm); // Convert price to string for search
//         return nameMatch || costMatch;
//     });

//     return (
//         <div className="catalog-container">
//             <div className="search-container">
//                 <input
//                     type="text"
//                     placeholder="Search paintings..."
//                     value={searchTerm}
//                     onChange={handleSearchChange}
//                     className="search-input"
//                 />
//             </div>
//             <div className="paint-cards-container">
//                 <div className="paint-cards-row">
//                     {filteredPaintings.map(paint => (
//                         <PaintCard key={paint.id} paint={paint} />
//                     ))}
//                 </div>
//             </div>
//             <Link to="/home" className="back-link">Back to Home</Link>
//         </div>
//     );
// };

// export default Catalog;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/Catalog.css';

const PaintCard = ({ paint }) => {
    return (
        <div className="paint-card">
            <div className="paint-image-container">
                <img src={`http://localhost:8000${paint.image}`} alt={paint.name} className="paint-image" />
            </div>
            <div className="paint-details">
                <h3>{paint.name}</h3>
                <p>Painter: {paint.painter ? paint.painter.name : 'Unknown'}</p>
                <p>Price: ${paint.price}</p>
            </div>
        </div>
    );
};

const Catalog = () => {
    const [paintings, setPaintings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPaintings = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/all_paintings/');
                setPaintings(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPaintings();
    }, []);

    const handleSearchChange = event => {
        setSearchTerm(event.target.value);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const filteredPaintings = paintings.filter(paint => {
        const nameMatch = paint.name.toLowerCase().includes(searchTerm.toLowerCase());
        const costMatch = paint.price.toString().includes(searchTerm); // Convert price to string for search
        return nameMatch || costMatch;
    });

    return (
        <div className="catalog-container">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search paintings..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
            </div>
            <div className="paint-cards-container">
                <div className="paint-cards-row">
                    {filteredPaintings.map(paint => (
                        <PaintCard key={paint.id} paint={paint} />
                    ))}
                </div>
            </div>
            <Link to="/home" className="back-link">Back to Home</Link>
        </div>
    );
};

export default Catalog;
