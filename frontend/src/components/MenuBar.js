
import React from 'react';
import { Link } from 'react-router-dom';

const MenuBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">KYL-KALEM</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/catalog">Catalog</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Log in</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Sign up</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default MenuBar;