

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuBar from './components/MenuBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Catalog from './pages/Catalog';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Logout from './pages/Logout';
import Basket from './pages/Basket';
import AccountPainter from './pages/AccountPainter';
import AccountCustomer from './pages/AccountCostumer';
import AccountAdmin from './pages/AccountAdmin';
import NotFound from './pages/NotFound';
import DetailView from './pages/DetailView';
import Orders from './pages/Orders';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [customerId, setCustomerId] = useState(null);
  const [basket, setBasket] = useState([]);
  const [basketItemCount, setBasketItemCount] = useState(0);
  const addToBasket = (painting) => {
    setBasket((prevBasket) => [...prevBasket, painting]);
    setBasketItemCount((prevCount) => prevCount + 1);  
  };

  const removeFromBasket = (paintingId) => {
    setBasket((prevBasket) =>
        prevBasket.filter((painting) => painting.id !== paintingId)
    );
    setBasketItemCount((prevCount) => prevCount - 1);  
};

  return (
    <Router>
      <MenuBar isLoggedIn={isLoggedIn} basketItemCount={basketItemCount} /> {/* Pass basketItemCount */}
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} setCustomerId={setCustomerId} />}
        />
        <Route path="/register" element={<Signup />} />
        <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/basket"
          element={<Basket customerId={customerId} basket={basket} removeFromBasket={removeFromBasket} />}
        />
        <Route path="/account_painter" element={<AccountPainter />} />
        <Route path="/api/fetch_painter_orders/" element={<Orders />} />
        <Route path="/account_customer" element={<AccountCustomer />} />
        <Route path="/account_admin" element={<AccountAdmin />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/detail/:id"
          element={<DetailView addToBasket={addToBasket} />} 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;
