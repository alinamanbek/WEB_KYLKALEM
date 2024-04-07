// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import MenuBar from './components/MenuBar'; // Import MenuBar component
// import Footer from './components/Footer'; // Import Footer component
// import Home from './pages/Home';
// import About from './pages/About';
// import Catalog from './pages/Catalog';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Basket from './pages/Basket';
// import AccountPainter from './pages/AccountPainter.js';
// import AccountCostumer from './pages/AccountCostumer.js';
// import AccountAdmin from './pages/AccountAdmin.js';
// import NotFound from './pages/NotFound';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function App() {
//   return (
//     <Router>
//       <MenuBar />  
//       <Routes>
//         <Route path="/menu" element={<MenuBar />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/catalog" element={<Catalog />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Signup />} />
//         <Route path="/basket" element={<Basket />} />
//         <Route path="/account_painter" element={<AccountPainter />} />
//         <Route path="/account_costumer" element={<AccountCostumer />} />
//         <Route path="/account_admin" element={<AccountAdmin />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//       <Footer /> {/* Include Footer component */}
//     </Router>
//   );
// }

// export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuBar from './components/MenuBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Catalog from './pages/Catalog';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Basket from './pages/Basket';
import AccountPainter from './pages/AccountPainter';
import AccountCustomer from './pages/AccountCostumer';
import AccountAdmin from './pages/AccountAdmin';
import NotFound from './pages/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <MenuBar isLoggedIn={isLoggedIn} />  
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/account_painter" element={<AccountPainter />} />
        <Route path="/account_customer" element={<AccountCustomer />} />
        <Route path="/account_admin" element={<AccountAdmin />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
