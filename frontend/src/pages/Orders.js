import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Orders.css';

const Orders = () => {
  const [painterId, setPainterId] = useState(null);
  const [painterName, setPainterName] = useState('');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchPainterId = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/get_user_account_details/', {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
          }
        });
        setPainterId(response.data.id);
        setPainterName(response.data.name);
      } catch (error) {
        console.error('Error fetching logged-in user id:', error);
      }
    };

    fetchPainterId();
  }, []); 

  useEffect(() => {
    const fetchPainterOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/fetch_painter_orders/${painterId}/`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching painter orders:', error);
      }
    };

    if (painterId) {
      fetchPainterOrders();
    }
  }, [painterId]);

  const handleAnswerStatus = async (orderId, newStatus) => {
    try {
        const response = await axios.put(`http://localhost:8000/api/fetch_painter_orders/${orderId}/`, { status: newStatus });
      console.log(response.status);
        console.log('Axios PUT request:', response);
        const updatedOrders = orders.map(order => order.id === orderId ? { ...order, status: newStatus } : order);
        setOrders(updatedOrders);
        // Handle response and update state as needed
    } catch (error) {
        console.error('Error updating order status:', error);
    }
};

  
  

  return (
    <div>
      <h1 className="page-title">{painterName ? `Welcome😊 ${painterName}` : 'Orders Page'}</h1>
      {/* <h2>Painter Orders:</h2> */}
      <table className="order-table table">
        <thead>
          <tr>
            <th>#</th>
            <th>Paint Image</th>
            <th>Paint Name</th>
            <th>Cost</th>
            <th>Customer Name</th>
            <th>Customer Phone</th>
            <th>Message</th>
            <th>Created At</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td><img src={`http://localhost:8000${order.painting.image}`} alt="Painting" className="paint-image-orders" /></td>
              <td>{order.painting.name}</td>
              <td>${order.painting.price}</td>
              <td>{order.customer ? order.customer.name : 'N/A'}</td>
              <td>{order.customer ? order.customer.phone_number : 'N/A'}</td>
              <td>{order.message}</td>
              <td>{new Date(order.created_at).toLocaleDateString()}</td>
              <td>
                <select value={order.status} onChange={(e) => handleAnswerStatus(order.id, e.target.value)}>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
