import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                username: '',
                password: '',
            },
            showPassword: false,
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

    togglePasswordVisibility = () => {
        this.setState(prevState => ({
            showPassword: !prevState.showPassword
        }));
    };

    render() {
        const { formData, error, showPassword } = this.state;

        return (
            <div className="container mt-5 text-center">
                <h2>Login</h2>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input type="text" className="form-control" name="username" placeholder="Username" value={formData.username} onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <input type={showPassword ? 'text' : 'password'} className="form-control" name="password" placeholder="Password" value={formData.password} onChange={this.handleChange} />
                                    <button className="btn btn-outline-secondary" type="button" onClick={this.togglePasswordVisibility}>
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
}

export default Login;
