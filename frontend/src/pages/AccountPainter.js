
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/AccountPainter.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import photo2 from '../photos/kkkkk.jpg';
 
 

const AccountPainter = () => {
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        genre: '',
        price: '',
        about_paint: ''
    });
    const [painterPictures, setPainterPictures] = useState([]);
    const [editId, setEditId] = useState(null);
    const [painterDetails, setPainterDetails] = useState({});
    const [editingDetails, setEditingDetails] = useState(false);

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
        fetchPainterPictures();
        fetchPainterDetails();
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
            data.append('about_paint', formData.about_paint);

            const url = editId ? `http://localhost:8000/api/paintings/${editId}/` : 'http://localhost:8000/api/create_paint/';
            const method = editId ? 'put' : 'post';

            const response = await axios({
                method: method,
                url: url,
                data: data,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            });

            console.log(response.data);
            window.alert('Picture ' + (editId ? 'updated' : 'sent') + ' successfully!');
            setFormData({
                name: '',
                image: '',
                genre: '',
                price: '',
                about_paint: ''
            });
            setEditId(null);
             
            fetchPainterPictures();
        } catch (error) {
            console.error(error.response.data);
            // Handle error
        }
    };

    const handleSaveDetails = async () => {
        try {
            const response = await axios.put(`http://localhost:8000/api/edit_user_account_details/`, {
                name: painterDetails.name,
                AboutPainter: painterDetails.AboutPainter,
                workExperience: painterDetails.workExperience,
                education: painterDetails.education
            }, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            });
            console.log(response.data);
            window.alert('Details updated successfully!');
            setEditingDetails(false);
            fetchPainterDetails();
        } catch (error) {
            console.error('Error updating details:', error);
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
            fetchPainterPictures();
        } catch (error) {
            console.error('Error deleting picture:', error);
        }
    };

    const handleEdit = (id) => {
        const pictureToEdit = painterPictures.find(picture => picture.id === id);
        setFormData({
            name: pictureToEdit.name,
            genre: pictureToEdit.genre,
            price: pictureToEdit.price,
            about_paint: pictureToEdit.about_paint  
        });
        setEditId(id);
    };

    const handleEditDetails = () => {
        setEditingDetails(true);
    };

    const fetchPainterDetails = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/get_user_account_details/', {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            });
            setPainterDetails(response.data);
        } catch (error) {
            console.error('Error fetching painter details:', error);
        }
    };
    
    const handleCloseModal = () => {
        setFormData({
            name: '',
            image: null,
            genre: '',
            price: '',
            about_paint: ''
        });
        setEditId(null);
    };


    

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="account-painter-sectionn">
                        <div className="form-group">
                            <img src={photo2} alt="Painter 6" className="account_img" />
                            {/* {painterDetails.image && <img src={painterDetails.image} alt="Painter" className="circle-image small-image" />} */}
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" value={painterDetails.name} className="form-control" placeholder="Name" readOnly={!editingDetails} onChange={(e) => setPainterDetails({ ...painterDetails, name: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="about">About:</label>
                            <textarea id="about" value={painterDetails.AboutPainter} className="form-control" placeholder="About" readOnly={!editingDetails} onChange={(e) => setPainterDetails({ ...painterDetails, AboutPainter: e.target.value })}></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="experience">Work Experience:</label>
                            <textarea id="experience" value={painterDetails.workExperience} className="form-control" placeholder="Work Experience" readOnly={!editingDetails} onChange={(e) => setPainterDetails({ ...painterDetails, workExperience: e.target.value })}></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="education">Education:</label>
                            <textarea id="education" value={painterDetails.education} className="form-control" placeholder="Education" readOnly={!editingDetails} onChange={(e) => setPainterDetails({ ...painterDetails, education: e.target.value })}></textarea>
                        </div>
                        {editingDetails ? (
                            <button type="button" className="btn-green" onClick={handleSaveDetails}>Save</button>
                        ) : (
                            <button type="button" className="btn-clear" onClick={handleEditDetails}>Edit</button>
                        )}
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="account-painter-section">
                        <div className="heading">{editId ? 'Update Picture' : 'Create Picture'}</div>
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
                                <div className="form-group">
                                    <input type="text" name="about_paint" value={formData.about_paint} className="form-control" placeholder="About Paint" onChange={handleChange} />
                                </div>
                                <button type="submit" className="btn-green">{editId ? 'Update' : 'Submit'}</button>
                                <button type="button" className="btn-clear" onClick={handleCloseModal}>{editId ? 'Cancel' : 'Clear'}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
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
                                                <button onClick={() => handleEdit(picture.id)}> <FontAwesomeIcon icon={faEdit} />  </button>
                                                <button onClick={() => handleDelete(picture.id)}> <FontAwesomeIcon icon={faTrash} /> </button>
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



 