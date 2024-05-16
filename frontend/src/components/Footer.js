import React from 'react';
import './css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="heading">
        <h2>KYLKALEM</h2>
      </div>
      <div className="content">
        <div className="services">
          <h4>Services</h4>
          <ul>
            <li><a href="#">App development</a></li>
            <li><a href="#">Web development</a></li>
            <li><a href="#">DevOps</a></li>
            <li><a href="#">Web designing</a></li>
          </ul>
        </div>
        <div className="social-media">
          <h4>Social</h4>
          <ul>
            <li><a href="#"><i className="fab fa-linkedin"></i> Linkedin</a></li>
            <li><a href="#"><i className="fab fa-twitter"></i> Twitter</a></li>
            <li><a href="https://github.com/farazc60"><i className="fab fa-github"></i> Github</a></li>
            <li><a href="https://www.facebook.com/codewithfaraz"><i className="fab fa-facebook"></i> Facebook</a></li>
            <li><a href="https://www.instagram.com/codewithfaraz"><i className="fab fa-instagram"></i> Instagram</a></li>
          </ul>
        </div>
        <div className="links">
          <h4>Quick links</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Blogs</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div className="details">
          <h4>Address</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur <br />
            adipisicing elit. Cupiditate, qui!
          </p>
          <h4>Mobile</h4>
          <p><a href="#">+91-12225*****</a></p>
          <h4>Email</h4>
          <p><a href="#">farazc60@gmail.com</a></p>
        </div>
      </div>
      <hr />
      <div className="footer-bottom">
        © 2022 codewithFaraz.
      </div>
    </footer>
  );
};

export default Footer;
