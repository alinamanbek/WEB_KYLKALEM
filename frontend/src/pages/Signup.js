import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Signup = () => {
  const navigate = useNavigate(); // Get the navigate function
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    user_type: '',
    // Additional fields for painter
    image: null,
    AboutPainter: '',
    workExperience: '',
    education: '',
    // Additional fields for customer
    phone_number: ''
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

    // Check if the password meets the required criteria
    if (!isPasswordStrong(formData.password)) {
      setErrorMessage('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
      return;
    }

    try {
      // Gather additional data based on user type
      let additionalData = {};
      if (formData.user_type === 'painter') {
        additionalData = {
          image: formData.image,
          AboutPainter: formData.AboutPainter,
          workExperience: formData.workExperience,
          education: formData.education,
          name: formData.username  // Assuming 'username' is used for painter's name
        };
      } else if (formData.user_type === 'customer') {
        additionalData = {
          name: formData.username,  // Assuming 'username' is used for customer's name
          phone_number: formData.phone_number
        };
      }

      const userData = { ...formData, ...additionalData };

      const res = await axios.post('http://localhost:8000/api/register/', userData);
      console.log(res.data);
      setIsRegistered(true);
      setErrorMessage('');

      // Redirect to AccountDetail page after successful registration
      navigate('/login', { state: { user_type: formData.user_type } });
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.error);
      } else {
        console.error(error.response.data);
      }
    }
  };

  const isPasswordStrong = (password) => {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
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
              {formData.user_type === 'painter' && (
                <>
                  <div className="form-group">
                    <input type="file" className="form-control-file" name="image" onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <textarea className="form-control" name="AboutPainter" placeholder="About Painter" onChange={handleChange}></textarea>
                  </div>
                  <div className="form-group">
                    <textarea className="form-control" name="workExperience" placeholder="Work Experience" onChange={handleChange}></textarea>
                  </div>
                  <div className="form-group">
                    <textarea className="form-control" name="education" placeholder="Education" onChange={handleChange}></textarea>
                  </div>
                </>
              )}
              {formData.user_type === 'customer' && (
                <div className="form-group">
                  <input type="text" className="form-control" name="phone_number" placeholder="Phone Number" onChange={handleChange} />
                </div>
              )}
              <button type="submit" className="btn btn-primary">Register</button>
            </form>
          </div>
        </div>
      ) : (
        <p className="mt-4 text-success">You are registered successfully!</p>
      )}
    </div>
  );
};

export default Signup;
