
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/AccountCustomer.css'; // Import CSS file
export const ACCOUNT_PAINTER_URL = '/account-painter'; 
const AccountCustomer = ({ isLoggedIn }) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const customerId = localStorage.getItem('customerId');
            if (!customerId) {
                console.error('Customer ID not found.');
                return;
            }
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/fetch_customer_orders/${customerId}/`);
            const sortedOrders = response.data.sort((a, b) => {
                const dateA = new Date(a.created_at);
                const dateB = new Date(b.created_at);
                return dateB - dateA;
            });
            setOrders(sortedOrders);
        } catch (error) {
            console.error('Failed to fetch customer orders:', error);
        }
    };

    

    const handleClearHistory = async () => {
        try {
            const customerId = localStorage.getItem('customerId');
            if (!customerId) {
                console.error('Customer ID not found.');
                return;
            }
    
            const csrfToken = getCsrfTokenFromCookie();
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/clear_order_history/${customerId}/`, {
                headers: {
                    'X-CSRFToken': csrfToken
                }
            });
    
            setOrders([]);
            console.log('Order history cleared successfully.');
        } catch (error) {
            console.error('Failed to clear order history:', error);
        }
    };

    const getCsrfTokenFromCookie = () => {
        const cookieString = document.cookie;
        const cookieArray = cookieString.split(';');
        for (const cookie of cookieArray) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName.trim() === 'csrftoken') {
                return cookieValue;
            }
        }
        return '';
    };

    return (
        <div className="account-customer-container">
            <h2>Order History</h2>
            <button className="clear-history-button" onClick={handleClearHistory}>Clear History</button>
            <div className="order-history">
                {orders.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Painting Image</th>
                                <th>Painting Name</th>
                                <th>Painter Name</th>
                                <th>Status</th>
                                <th>Cost</th>
                                <th>Message</th>
                               
                                <th>Order Date</th>
                              

                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    {/* Modify the src attribute to fetch image from Django backend */}
                                    <td><img src={`http://localhost:8000${order.paint_image}`} alt="Painting" /></td>
                                    <td>{order.paint_name}</td>
                                    <td>{order.painter_name}</td>
                                    <td>{order.status}</td>
                                    <td>{order.paint_cost}</td>
                                    <td>{order.message}</td>
                                    <td>{new Date(order.created_at).toLocaleDateString('en-GB')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No orders found.</p>
                )}
            </div>
        </div>
    );
};

export default AccountCustomer;