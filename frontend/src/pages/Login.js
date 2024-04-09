// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

// class Login extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             formData: {
//                 username: '',
//                 password: '',
//             },
//             showPassword: false,
//             error: '',
//         };
//     }

//     handleChange = (e) => {
//         const { name, value } = e.target;
//         this.setState(prevState => ({
//             formData: {
//                 ...prevState.formData,
//                 [name]: value,
//             }
//         }));
//     };

//     handleLogin = async () => {
//         try {
//             const response = await fetch('http://localhost:8000/api/login/', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(this.state.formData),
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 const { userType } = data;

//                 if (userType === 'customer') {
//                     window.location = '/account_customer';
//                 } else if (userType === 'painter') {
//                     window.location = '/account_painter';
//                 } else if (userType === 'admin') {
//                     window.location = '/account_admin';
//                 }

//                 // Set login state to true upon successful login
//                 this.setState({ isLoggedIn: true });
//             } else {
//                 this.setState({ error: 'Invalid username or password.' });
//             }
//         } catch (error) {
//             console.error(error);
//             this.setState({ error: 'An error occurred. Please try again later.' });
//         }
//     };

//     handleSubmit = (e) => {
//         e.preventDefault();
//         this.handleLogin();
//     };

//     togglePasswordVisibility = () => {
//         this.setState(prevState => ({
//             showPassword: !prevState.showPassword
//         }));
//     };

//     render() {
//         const { formData, error, showPassword } = this.state;

//         return (
//             <div className="container mt-5 text-center">
//                 <h2>Login</h2>
//                 {error && <div className="alert alert-danger" role="alert">{error}</div>}
//                 <div className="row justify-content-center">
//                     <div className="col-md-6">
//                         <form onSubmit={this.handleSubmit}>
//                             <div className="form-group">
//                                 <input type="text" className="form-control" name="username" placeholder="Username" value={formData.username} onChange={this.handleChange} />
//                             </div>
//                             <div className="form-group">
//                                 <div className="input-group">
//                                     <input type={showPassword ? 'text' : 'password'} className="form-control" name="password" placeholder="Password" value={formData.password} onChange={this.handleChange} />
//                                     <button className="btn btn-outline-secondary" type="button" onClick={this.togglePasswordVisibility}>
//                                         <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
//                                     </button>
//                                 </div>
//                             </div>
//                             <button type="submit" className="btn btn-primary">Login</button>
//                         </form>
//                         <p className="mt-3">Don't have an account? <Link to="/register">Register here</Link></p>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }









// export default Login; 




import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
const Login = ({ setIsLoggedIn }) => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate(); // React router navigation function

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                const { token, userType } = data;

                // Store the token securely (e.g., in local storage or a cookie)
                localStorage.setItem('token', token);

                if (userType === 'painter') {
                    // Set isLoggedIn state to true upon successful login
                    setIsLoggedIn(true);
                    navigate('/account_painter');
                }else if (userType === 'customer') {
                    navigate('/account_customer');
                } else if (userType === 'admin') {
                    navigate('/account_admin');}
                else {
                    setError('Invalid user type.');
                }
            } else {
                setError('Invalid username or password.');
            }
        } catch (error) {
            console.error(error);
            setError('An error occurred. Please try again later.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleLogin();
    };

    return (
        <div className="container mt-5 text-center">
            <h2>Login</h2>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="text" className="form-control" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                    <p className="mt-3">Don't have an account? <Link to="/register">Register here</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Login;
