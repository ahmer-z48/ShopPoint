
import { ArrowRight } from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer" id="contact">

      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">

          <div className="footer-logo">
            <div className="logo-icon">
              SP
            </div>

            <span>
              Shop Point
            </span>
          </div>

          <p>
            Connecting customers with trusted local
            shops and helping small businesses grow
            through technology.
          </p>

          <div className="social-icons">

            <a
              href="#"
              aria-label="Facebook"
            >
              <FaFacebookF size={17} />
            </a>

            <a
              href="#"
              aria-label="Instagram"
            >
              <FaInstagram size={18} />
            </a>

            <a
              href="#"
              aria-label="Twitter"
            >
              <FaTwitter size={17} />
            </a>

            <a
              href="#"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn size={17} />
            </a>

          </div>

        </div>


        {/* Marketplace */}
        <div className="footer-column">

          <h4>
            Marketplace
          </h4>

          <a href="#shops">
            Find shops
          </a>

          <a href="#categories">
            Categories
          </a>

          <a href="#">
            Search products
          </a>

          <a href="#shops">
            Popular shops
          </a>

        </div>


        {/* Company */}
        <div className="footer-column">

          <h4>
            Company
          </h4>

          <a href="#about">
            About us
          </a>

          <a href="#how-it-works">
            How it works
          </a>

          <a href="#">
            Become a vendor
          </a>

          <a href="#">
            Careers
          </a>

        </div>


        {/* Support */}
        <div className="footer-column">

          <h4>
            Support
          </h4>

          <a href="#">
            Help center
          </a>

          <a href="#contact">
            Contact us
          </a>

          <a href="#">
            Privacy policy
          </a>

          <a href="#">
            Terms & conditions
          </a>

        </div>


        {/* Newsletter */}
        <div className="footer-newsletter">

          <h4>
            Stay updated
          </h4>

          <p>
            Get updates about new shops and features.
          </p>

          <div className="newsletter-form">

            <input
              type="email"
              placeholder="Your email address"
            />

            <button
              type="button"
              aria-label="Subscribe"
            >
              <ArrowRight size={18} />
            </button>

          </div>

        </div>

      </div>


      {/* Footer Bottom */}
      <div className="footer-bottom">

        <span>
          © 2026 Shop Point. All rights reserved.
        </span>

        <span>
          Built to support local businesses.
        </span>

      </div>

    </footer>
  );
};

export default Footer;
