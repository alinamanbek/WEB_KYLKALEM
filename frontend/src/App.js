
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
import AccountCustomer from './pages/AccountCostumer'; // Typo in component name corrected
import AccountAdmin from './pages/AccountAdmin';
import NotFound from './pages/NotFound';
import DetailView from './pages/DetailView';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [customerId, setCustomerId] = useState(null); // Added customerId state
  const [basket, setBasket] = useState([]);


  const addToBasket = (painting) => {
    setBasket(prevBasket => [...prevBasket, painting]);
};

const removeFromBasket = (indexToRemove) => {
  setBasket(prevBasket => prevBasket.filter((_, index) => index !== indexToRemove));
};

  return (
    <Router>
      <MenuBar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} setCustomerId={setCustomerId} />} // Pass setCustomerId as prop
        />
        <Route path="/register" element={<Signup />} />
        <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} />} />
       <Route
          path="/basket"
          element={<Basket customerId={customerId} basket={basket} removeFromBasket={removeFromBasket} />}
        />
        <Route path="/account_painter" element={<AccountPainter />} />
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
