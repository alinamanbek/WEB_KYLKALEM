import React from 'react';
import './css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="heading">
        <h2>KYLKALEM</h2>
      </div>
      <div className="content">
      
        <div className="social-media">
          <h4>Social</h4>
          <ul>
            <li><a href="#"><i className="fab fa-facebook"></i> Facebook</a></li>
            <li><a href="https://www.instagram.com/alinamanbek"><i className="fab fa-instagram"></i> Instagram</a></li>
            <li><a href="#"><i className="fab fa-twitter"></i>Twitter</a></li>
          </ul>
        </div>
        <div className="links">
          <h4>Quick links</h4>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/catalog">Catalog</a></li>
          </ul>
        </div>
        <div className="details">
          <h4>Contacts</h4>

          <ul>
            <li><a href="#">Chui Avenue, Bishkek, Kyrgyzstan</a></li>
            <li><a href="#">+996704107466</a></li>
            <li><a href="#">kylkalem@gmail.com</a></li>
          </ul>
         
        </div>
      </div>
      <hr />
      <div className="footer-bottom">
        © 2022 Bishkek.
      </div>
    </footer>
  );
};

export default Footer;
