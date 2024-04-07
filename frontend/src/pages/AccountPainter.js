import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/AccountPainter.css';
import oymo from '../photos/account.png'; 

const AccountPainter = () => {
    const [formData, setFormData] = useState({
        name: '',
        image: null,
        genre: '',
        price: ''
    });
    const [painterPictures, setPainterPictures] = useState([]);

    const fetchPainterPictures = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/paintings/', {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            });
            setPainterPictures(response.data);
        } catch (error) {
            console.error('Error fetching painter pictures:', error);
        }
    };

    useEffect(() => {
        // Fetch painter's pictures data from the API endpoint
        fetchPainterPictures();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('image', formData.image);
            data.append('genre', formData.genre);
            data.append('price', formData.price);

            const response = await axios.post('http://localhost:8000/api/create_paint/', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            });
            console.log(response.data);
            window.alert('Picture sent successfully!');
            setFormData({
                name: '',
                image: null,
                genre: '',
                price: ''
            });
            // Fetch updated painter pictures after successful submission
            fetchPainterPictures();
        } catch (error) {
            console.error(error.response.data);
            // Handle error
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/paintings/${id}/`, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            });
            window.alert('Picture deleted successfully!');
            // Fetch updated painter pictures after successful deletion
            fetchPainterPictures();
        } catch (error) {
            console.error('Error deleting picture:', error);
        }
    };

    return (
        <div className="container">
            <img src={oymo} alt="Oymo" className="picture-img" /> {/* Include the image */}
            <div className="row">
                <div className="col-md-6">
                    <div className="account-painter-section">
                        <div className="heading">Create Picture</div>
                        <div className="form-container">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <input type="text" name="name" value={formData.name} className="form-control" placeholder="Name" onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <input type="file" name="image" className="form-control-file" onChange={handleImageChange} />
                                </div>
                                <div className="form-group">
                                    <input type="text" name="genre" value={formData.genre} className="form-control" placeholder="Genre" onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <input type="text" name="price" value={formData.price} className="form-control" placeholder="Price" onChange={handleChange} />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="account-painter-section">
                        <div className="heading">Painter Pictures</div>
                        <div className="picture-table-container">
                            <table className="picture-table table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Genre</th>
                                        <th>Price</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {painterPictures.map(picture => (
                                        <tr key={picture.id}>
                                            <td>{picture.name}</td>
                                            <td>{picture.genre}</td>
                                            <td>{picture.price}</td>
                                            <td>
                                                <button onClick={() => handleDelete(picture.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountPainter;
