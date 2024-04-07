import React from 'react';

const AccountCostumer = ({ isLoggedIn }) => {
    // Your account costumer page content
    return (
        <div>
           
                <h1>Welcome to your customer account!</h1>
        
       </div>
    );
}

// Provide a default value for isLoggedIn in case it's not provided
AccountCostumer.defaultProps = {
    isLoggedIn: false
};

export default AccountCostumer;
