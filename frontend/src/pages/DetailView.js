 





// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import Zoom from '@mui/material/Zoom'; // Import Zoom component from Material-UI
// import './css/DetailView.css';

// const DetailView = () => {
//   const { id } = useParams();
//   const [painting, setPainting] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPaintingDetail = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/api/detail/${id}`);
//         setPainting(response.data);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPaintingDetail();
//   }, [id]);

//   if (loading) {
//     return <div className="loading">Loading...</div>;
//   }

//   if (error) {
//     return <div className="error">Error: {error.message}</div>;
//   }

//   return (
//     <div className="main">
//       <div className="detail-container">
//         {/* Wrap the image with the Zoom component */}
//         <Zoom in={true} style={{ transitionDelay: '200ms' }}>
//           <div className="image-container">
//             <img src={`http://localhost:8000${painting.image}`} alt={painting.name} className="painting-image" />
//           </div>
//         </Zoom>
//         <div className="info-container">
//           <h2>{painting.name}</h2>
//           <p><strong>Genre:</strong> {painting.genre}</p>
//           <p><strong>Cost:</strong> ${painting.price}</p>
//           <p><strong>About Paint:</strong></p>
//           <p>{painting.about_paint}</p>
//           <button className="add-to-basket-button">Add to Basket</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DetailView;


// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { Zoom } from '@mui/material';
// import './css/DetailView.css';

// const DetailView = () => {
//   const { id } = useParams();
//   const [painting, setPainting] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPaintingDetail = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/api/detail/${id}`);
//         setPainting(response.data);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPaintingDetail();
//   }, [id]);

//   if (loading) {
//     return <div className="loading">Loading...</div>;
//   }

//   if (error) {
//     return <div className="error">Error: {error.message}</div>;
//   }

//   return (
//     <div className="main">
//       <div className="detail-container">
//         {/* Wrap the image with the Zoom component */}
//         <Zoom in={true} style={{ transitionDelay: '200ms' }}>
//           <div className="image-container">
//             <img src={`http://localhost:8000${painting.image}`} alt={painting.name} className="painting-image" />
//           </div>
//         </Zoom>
//         <div className="info-container">
//           <h2>{painting.name}</h2>
//           <p><strong>Genre:</strong> {painting.genre}</p>
//           <p><strong>Cost:</strong> ${painting.price}</p>
//           <p><strong>About Paint:</strong></p>
//           <p>{painting.about_paint}</p>
//           <button className="add-to-basket-button">Add to Basket</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DetailView;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ZoomIn, ZoomOut } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import './css/DetailView.css';

const DetailView = () => {
    const { id } = useParams();
    const [painting, setPainting] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(1);

    useEffect(() => {
        const fetchPaintingDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/detail/${id}`);
                setPainting(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPaintingDetail();
    }, [id]);

    const handleZoomIn = () => {
        setZoomLevel(zoomLevel + 0.1);
    };

    const handleZoomOut = () => {
        setZoomLevel(zoomLevel - 0.1);
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error.message}</div>;
    }

    return (
        <div className="main">
            <div className="detail-container">
                {/* Zoom buttons */}
                <div className="zoom-buttons">
                    <IconButton onClick={handleZoomIn}>
                        <ZoomIn />
                    </IconButton>
                    <IconButton onClick={handleZoomOut}>
                        <ZoomOut />
                    </IconButton>
                </div>
                {/* Zoomable image */}
                <div className="image-container" style={{ overflow: 'hidden', width: '100%', height: '100%' }}>
                    <img
                        src={`http://localhost:8000${painting.image}`}
                        alt={painting.name}
                        className="painting-image"
                        style={{ width: '100%', height: '100%', transform: `scale(${zoomLevel})`, transition: 'transform 0.5s ease' }}
                    />
                </div>
                <div className="info-container">
                    <h2>{painting.name}</h2>
                    <p><strong>Genre:</strong> {painting.genre}</p>
                    <p><strong>Cost:</strong> ${painting.price}</p>
                    <p><strong>About Paint:</strong></p>
                    <p>{painting.about_paint}</p>
                    <button className="add-to-basket-button">Add to Basket</button>
                </div>
            </div>
        </div>
    );
};

export default DetailView;
