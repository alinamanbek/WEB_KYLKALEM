// // import React, { useState } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

// // const Login = ({ setIsLoggedIn }) => {
// //     const navigate = useNavigate();
// //     const [formData, setFormData] = useState({ username: '', password: '' });
// //     const [error, setError] = useState('');
// //     const [showPassword, setShowPassword] = useState(false);

// //     const handleChange = (e) => {
// //         const { name, value } = e.target;
// //         setFormData(prevState => ({
// //             ...prevState,
// //             [name]: value
// //         }));
// //     };

// //     const handleLogin = async () => {
// //         try {
// //             // Perform authentication
// //             const response = await fetch('http://localhost:8000/api/login/', {
// //                 method: 'POST',
// //                 headers: {
// //                     'Content-Type': 'application/json',
// //                 },
// //                 body: JSON.stringify(formData),
// //             });

// //             if (response.ok) {
// //                 const data = await response.json();
// //                 const { token, userType } = data;

// //                 // Store token and user type in local storage
// //                 localStorage.setItem('token', token);
// //                 localStorage.setItem('userType', userType);

// //                 // Set isLoggedIn state to true
// //                 setIsLoggedIn(true);

// //                 // Redirect based on user type
// //                 if (userType === 'painter') {
// //                     navigate('/account_painter');
// //                 } else if (userType === 'customer') {
// //                     navigate('/account_customer');
// //                 } else if (userType === 'admin') {
// //                     navigate('/account_admin');
// //                 }
// //             } else {
// //                 setError('Invalid username or password.');
// //             }
// //         } catch (error) {
// //             console.error(error);
// //             setError('An error occurred. Please try again later.');
// //         }
// //     };

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         handleLogin();
// //     };

// //     const togglePasswordVisibility = () => {
// //         setShowPassword(prevState => !prevState);
// //     };

// //     return (
// //         <div className="container mt-5 text-center">
// //             <h2>Login</h2>
// //             {error && <div className="alert alert-danger" role="alert">{error}</div>}
// //             <div className="row justify-content-center">
// //                 <div className="col-md-6">
// //                     <form onSubmit={handleSubmit}>
// //                         <div className="form-group">
// //                             <input type="text" className="form-control" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
// //                         </div>
// //                         <div className="form-group">
// //                             <div className="input-group">
// //                                 <input type={showPassword ? 'text' : 'password'} className="form-control" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
// //                                 <button className="btn btn-outline-secondary" type="button" onClick={togglePasswordVisibility}>
// //                                     <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
// //                                 </button>
// //                             </div>
// //                         </div>
// //                         <button type="submit" className="btn btn-primary">Login</button>
// //                     </form>
// //                     <p className="mt-3">Don't have an account? <Link to="/register">Register here</Link></p>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }

// // export default Login;































import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLogin = async () => {
        try {
            // Perform authentication
            const response = await fetch('http://localhost:8000/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                const { token, userType, customerId } = data;

                // Store token, user type, and customer ID in local storage
                localStorage.setItem('token', token);
                localStorage.setItem('userType', userType);
                if (userType === 'customer') {
                    localStorage.setItem('customerId', customerId);
                }

                // Set isLoggedIn state to true
                setIsLoggedIn(true);

                // Redirect based on user type
                if (userType === 'painter') {
                    navigate('/account_painter');
                } else if (userType === 'customer') {
                    navigate('/home');
                } else if (userType === 'admin') {
                    navigate('/account_admin');
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

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
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
                            <div className="input-group">
                                <input type={showPassword ? 'text' : 'password'} className="form-control" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                                <button className="btn btn-outline-secondary" type="button" onClick={togglePasswordVisibility}>
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </button>
                            </div>
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


//  // Login.js
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

// const Login = ({ setIsLoggedIn, setCustomerId }) => { // Receive setCustomerId as prop
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ username: '', password: '' });
//   const [error, setError] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleLogin = async () => {
//     try {
//       // Perform authentication
//       const response = await fetch('http://localhost:8000/api/login/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         const { token, userType, customerId } = data;

//         // Store token, user type, and customer ID in local storage
//         localStorage.setItem('token', token);
//         localStorage.setItem('userType', userType);
//         if (userType === 'customer') {
//           localStorage.setItem('customerId', customerId);
//           setCustomerId(customerId); // Set customerId state
//         }

//         // Set isLoggedIn state to true
//         setIsLoggedIn(true);

//         // Redirect based on user type
//         if (userType === 'painter') {
//           navigate('/account_painter');
//         } else if (userType === 'customer') {
//           navigate('/catalog');
//         } else if (userType === 'admin') {
//           navigate('/account_admin');
//         }
//       } else {
//         setError('Invalid username or password.');
//       }
//     } catch (error) {
//       console.error(error);
//       setError('An error occurred. Please try again later.');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     handleLogin();
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword((prevState) => !prevState);
//   };

//   return (
//     <div className="container mt-5 text-center">
//       <h2>Login</h2>
//       {error && <div className="alert alert-danger" role="alert">{error}</div>}
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <input type="text" className="form-control" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
//             </div>
//             <div className="form-group">
//               <div className="input-group">
//                 <input type={showPassword ? 'text' : 'password'} className="form-control" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
//                 <button className="btn btn-outline-secondary" type="button" onClick={togglePasswordVisibility}>
//                   <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
//                 </button>
//               </div>
//             </div>
//             <button type="submit" className="btn btn-primary">Login</button>
//           </form>
//           <p className="mt-3">Don't have an account? <Link to="/register">Register here</Link></p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
