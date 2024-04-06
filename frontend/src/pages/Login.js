// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './css/Login.css'; // Import the CSS file

// const LoginForm = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//   });
//   const [error, setError] = useState(''); // State to hold error message
//   const navigate = useNavigate(); // Initialize useNavigate

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:8000/api/login/', formData);
//       console.log(res.data);
//       // If login successful, redirect based on userType
//       const { userType } = res.data; // Assuming your response contains userType
//       if (userType === 'painter') {
//         navigate('/painter-page');
//       } else if (userType === 'admin') {
//         navigate('/admin-page');
//       } else {
//         navigate('/main-page'); // Redirect to main page for customers
//       }
//     } catch (error) {
//       console.error(error.response.data);
//       // Set error message based on response status
//       if (error.response.status === 401) {
//         setError('Invalid username or password. Please try again.');
//       } else {
//         setError('An error occurred. Please try again later.');
//       }
//     }
//   };

//   return (
//     <div className="login-container">
//       <form className="login-form" onSubmit={handleSubmit}>
//         <div className="login-heading">Log in</div>
//         {error && <div className="error-message">{error}</div>} {/* Display error message */}
//         <input type="text" name="username" placeholder="Username" onChange={handleChange} />
//         <input type="password" name="password" placeholder="Password" onChange={handleChange} />
//         <button type="submit">Login</button>
//         <div className="login-links">
//           <a href="/forgot-password">Forgot Password?</a> {/* Forgot Password link */}
//           <span> | </span> {/* Separator */}
//           <a href="/register">Register</a> {/* Registration link */}
//         </div>
//       </form>
//     </div>
//   );import React, { useState } from 'react';
import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                username: '',
                password: '',
            },
            error: '',
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            formData: {
                ...prevState.formData,
                [name]: value,
            }
        }));
    };

    handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state.formData),
            });

            if (response.ok) {
                const data = await response.json();
                const { userType } = data;

                // Redirect user based on userType using window.location
                if (userType === 'customer') {
                    window.location = '/account_customer';
                } else if (userType === 'painter') {
                    window.location = '/account_painter';
                } else if (userType === 'admin') {
                    window.location = '/account_admin';
                }
            } else {
                this.setState({ error: 'Invalid username or password.' });
            }
        } catch (error) {
            console.error(error);
            this.setState({ error: 'An error occurred. Please try again later.' });
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.handleLogin();
    };

    render() {
        const { formData, error } = this.state;

        return (
            <div>
                <h2>Login</h2>
                {error && <div>{error}</div>}
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" value={formData.username} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={this.handleChange} />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }
}

export default Login;
