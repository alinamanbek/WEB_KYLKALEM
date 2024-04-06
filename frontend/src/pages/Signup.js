import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; // Import Link from React Router

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    user_type: '',
  });
  const [isRegistered, setIsRegistered] = useState(false); // State to track registration status
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility
  const [errorMessage, setErrorMessage] = useState(''); // State to hold error message

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.username === 'Alina' && formData.email === 'amanbekovaalina10@gmail.com') {
      setErrorMessage('The user already exists.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    if (!isPasswordStrong(formData.password)) {
      setErrorMessage('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
      return;
    }
    try {
      const res = await axios.post('http://localhost:8000/api/register/', formData);
      console.log(res.data);
      setIsRegistered(true);
      setErrorMessage('');
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.error);
      } else {
        console.error(error.response.data);
      }
    }
  };

  const isPasswordStrong = (password) => {
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
    return strongRegex.test(password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="container mt-5 text-center">
      <h2>Registration</h2>
      <p>Already have an account? <Link to="/login">Log in here</Link></p> {/* Link to the login page */}
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      {!isRegistered ? (
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="text" className="form-control" name="username" placeholder="Username" onChange={handleChange} />
              </div>
              <div className="form-group">
                <input type="email" className="form-control" name="email" placeholder="Email" onChange={handleChange} />
              </div>
              <div className="form-group">
                <div className="input-group">
                  <input type={showPassword ? 'text' : 'password'} className="form-control" name="password" placeholder="Password" onChange={handleChange} />
                  <button className="btn btn-outline-secondary" type="button" onClick={togglePasswordVisibility}>
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <input type={showConfirmPassword ? 'text' : 'password'} className="form-control" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
                  <button className="btn btn-outline-secondary" type="button" onClick={toggleConfirmPasswordVisibility}>
                    <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
              </div>
              <div className="form-group">
                <select className="form-control" name="user_type" onChange={handleChange}>
                  <option value="">Select User Type</option>
                  <option value="painter">Painter</option>
                  <option value="customer">Customer</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">Register</button>
            </form>
          </div>
        </div>
      ) : (
        <div>
          <p className="mt-4 text-success">You are registered successfully!</p>
          <p>Already have an account? <Link to="/login">Log in</Link></p> {/* Link to the login page */}
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
