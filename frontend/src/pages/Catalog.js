
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Catalog.css';
import { useNavigate } from 'react-router-dom'; 
import DetailView from './DetailView';

const PaintCard = ({ paint, onClick }) => {
  return (
    <div className="paint-card" onClick={() => onClick(paint)}>
      <div className="paint-image-container">
        <img src={`http://localhost:8000${paint.image}`} alt={paint.name} className="paint-image" />
      </div>
      <div className="paint-details">
        <h3 className="paint-name">{paint.name}</h3>
        <p className="paint-cost">Cost: ${paint.price}</p>
        <p className="paint-genre">Genre: ${paint.genre}</p>
        <p className="painter-name">Painter: {paint.painter_name}</p> 
      </div>
    </div>
  );
};

const Catalog = () => {
  const [paintings, setPaintings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPainting, setSelectedPainting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/all_paintings/');
        setPaintings(response.data.reverse()); 
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaintings();
  }, []); //created data

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const closeDetailView = () => {
    setSelectedPainting(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const openDetail = (paint) => {
    navigate(`/detail/${paint.id}`);
  };

  const filteredPaintings = paintings.filter(paint => {
    const nameMatch = paint.name.toLowerCase().includes(searchTerm.toLowerCase());
    const genreMatch = paint.genre.toLowerCase().includes(searchTerm.toLowerCase());
    const costMatch = paint.price.toString().includes(searchTerm);
    return nameMatch || genreMatch || costMatch;
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
      
        {Array.from({ length: Math.ceil(filteredPaintings.length / 3) }).map((_, rowIndex) => (
          <div className="paint-cards-row" key={rowIndex}>
            {filteredPaintings.slice(rowIndex * 3, rowIndex * 3 + 3).map(paint => (
              <PaintCard key={paint.id} paint={paint} onClick={openDetail} />
            ))}
          </div>
        ))}
      </div>

      {selectedPainting && (
        <DetailView painting={selectedPainting} onClose={closeDetailView} />
      )}
    </div>
  );
};

export default Catalog;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './css/Catalog.css';
// import DetailView from './DetailView';

// const PaintCard = ({ paint, onClick, onMouseEnter, onMouseLeave }) => {
//   return (
//     <div className="paint-card" onClick={() => onClick(paint)} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
//       <div className="paint-image-container">
//         <img src={`http://localhost:8000${paint.image}`} alt={paint.name} className="paint-image" />
//         <div className="paint-info">
//           <h3 className="paint-name">{paint.name}</h3>
//           <p className="paint-cost">Cost: ${paint.price}</p>
//           <p className="paint-genre">Genre: {paint.genre}</p>
//           <p className="painter-name">Painter: {paint.painter_name}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Catalog = () => {
//   const [paintings, setPaintings] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedPainting, setSelectedPainting] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPaintings = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/api/all_paintings/');
//         setPaintings(response.data.reverse()); // Reverse the order of paintings
//       } catch (error) {
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPaintings();
//   }, []);

//   const handleSearchChange = event => {
//     setSearchTerm(event.target.value);
//   };

//   const closeDetailView = () => {
//     setSelectedPainting(null);
//   };

//   const openDetail = (paint) => {
//     setSelectedPainting(paint);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   const onMouseEnter = (paint) => {
//     // Handle mouse enter event, if needed
//   };

//   const onMouseLeave = () => {
//     // Handle mouse leave event, if needed
//   };

//   const rows = [];
//   for (let i = 0; i < Math.ceil(paintings.length / 3); i++) {
//     const rowPaintings = paintings.slice(i * 3, i * 3 + 3);
//     rows.push(
//       <div className="paint-cards-row" key={i}>
//         {rowPaintings.map(paint => (
//           <PaintCard key={paint.id} paint={paint} onClick={openDetail} onMouseEnter={() => onMouseEnter(paint)} onMouseLeave={onMouseLeave} />
//         ))}
//       </div>
//     );
//   }

//   return (
//     <div className="catalog-container">
//       <div className="search-container">
//         <input
//           type="text"
//           placeholder="Search paintings..."
//           value={searchTerm}
//           onChange={handleSearchChange}
//           className="search-input"
//         />
//       </div>
      
//       <div className="paint-cards-container">
//         {rows}
//       </div>

//       {selectedPainting && (
//         <DetailView painting={selectedPainting} onClose={closeDetailView} />
//       )}
//     </div>
//   );
// };

// export default Catalog;
