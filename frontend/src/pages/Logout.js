import React from 'react';

const Logout = ({ setIsLoggedIn }) => {
    React.useEffect(() => {
        const handleLogout = () => {
            setIsLoggedIn(false); // Set isLoggedIn state to false
            // Additional logout logic (e.g., clearing local storage, API call, etc.)
            // Redirect to Home page after logout
            window.location.href = "/home"; // Redirect to Home page
        };

        handleLogout(); // Call handleLogout when the component mounts
    }, [setIsLoggedIn]); // Add setIsLoggedIn to the dependency array

    return (
        <div>
            <h2>Logging out...</h2>
            {/* You can add additional UI elements or messages here */}
        </div>
    );
};

export default Logout;
