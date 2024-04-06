
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import MenuBar from './Components/MenuBar';
// import Catalog from './Components/Catalog';
// import Footer from './Components/Footer';
// import RegistrationForm from './Components/RegistrationForm';
// import LoginForm from './Components/LoginForm';
// import AboutPage from './pages/AboutPage';
// import BasketsPage from './pages/BasketsPage';
// import LogoutPage from './pages/LogoutPage';

// function App() {
//   const isLoggedIn = false; // Set to true if the user is logged in

//   return (
//     <Router>
//       <div>
//         <MenuBar isLoggedIn={isLoggedIn} />
//         <Routes>
//           <Route path="/register" element={<RegistrationForm />} />
//           <Route path="/login" element={<LoginForm />} />
//           <Route path="/about" element={<AboutPage />} />
//           <Route path="/baskets" element={<BasketsPage />} />
//           <Route path="/logout" element={<LogoutPage />} />
//           <Route path="/" element={<Catalog />} />
//         </Routes>
//         <Footer />
//       </div>
//     </Router>
//   );
// } import React, { useState } from 'react';  import React, { useState, useEffect } from 'react';import React, { useState, useEffect } from 'react';
// App.js









// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LoginForm from './Components/LoginForm';
// import RegistrationForm from './Components/RegistrationForm';
// //import MainPage from './pages/HomePage';
// import PainterPage from './pages/PainterAccountPage';
// import AdminPage from './pages/AdminAccountPage';
// import MainCustomerPage from './pages/MainCustomerPage';
 

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<LoginForm />} />
//         <Route path="/register" element={<RegistrationForm />} />
//         <Route path="/main-page" element={<MainCustomerPage />} />
//         <Route path="/painter-page" element={<PainterPage />} />
//         <Route path="/admin-page" element={<AdminPage />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;import React from 'react';import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuBar from './components/MenuBar'; // Import MenuBar component
import Footer from './components/Footer'; // Import Footer component
import Home from './pages/Home';
import About from './pages/About';
import Catalog from './pages/Catalog';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Basket from './pages/Basket';
import AccountPainter from './pages/AccountPainter';
import AccountCostumer from './pages/AccountCostumer';
import AccountAdmin from './pages/AccountAdmin';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <MenuBar /> {/* Include MenuBar component */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/account_painter" element={<AccountPainter />} />
        <Route path="/account_costumer" element={<AccountCostumer />} />
        <Route path="/account_admin" element={<AccountAdmin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer /> {/* Include Footer component */}
    </Router>
  );
}

export default App;
