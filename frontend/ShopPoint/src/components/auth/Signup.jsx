import { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

import "./Signup.css";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    console.log("Signup data:", formData);

    // Backend registration will be connected here later
  };

  return (
    <div className="signup-page">

      {/* Left Side */}
      <div className="signup-info">

        <Link to="/" className="signup-logo">
          <div className="signup-logo-icon">
            SP
          </div>

          <span>Shop Point</span>
        </Link>

        <div className="signup-info-content">

          <span className="signup-label">
            JOIN SHOP POINT
          </span>

          <h1>
            Discover more.
            <span> Shop local.</span>
          </h1>

          <p>
            Create your account and discover trusted local
            shops, products, prices, and convenient ordering
            options near you.
          </p>

        </div>

      </div>


      {/* Right Side */}
      <div className="signup-form-side">

        <div className="signup-form-container">

          {/* Mobile Logo */}
          <Link to="/" className="signup-mobile-logo">

            <div className="signup-logo-icon">
              SP
            </div>

            <span>Shop Point</span>

          </Link>


          {/* Heading */}
          <div className="signup-heading">

            <h2>Create your account</h2>

            <p>
              Join Shop Point and start shopping locally.
            </p>

          </div>


          {/* Signup Form */}
          <form
            className="signup-form"
            onSubmit={handleSubmit}
          >

            {/* Full Name */}
            <div className="signup-form-group">

              <label htmlFor="name">
                Full name
              </label>

              <div className="signup-input-wrapper">

                <User size={19} />

                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            {/* Email */}
            <div className="signup-form-group">

              <label htmlFor="email">
                Email address
              </label>

              <div className="signup-input-wrapper">

                <Mail size={19} />

                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            {/* Phone */}
            <div className="signup-form-group">

              <label htmlFor="phone">
                Phone number
              </label>

              <div className="signup-input-wrapper">

                <Phone size={19} />

                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            {/* Password */}
            <div className="signup-form-group">

              <label htmlFor="password">
                Password
              </label>

              <div className="signup-input-wrapper">

                <Lock size={19} />

                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="signup-password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

              </div>

            </div>


            {/* Confirm Password */}
            <div className="signup-form-group">

              <label htmlFor="confirmPassword">
                Confirm password
              </label>

              <div className="signup-input-wrapper">

                <Lock size={19} />

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="signup-password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

              </div>

            </div>


            {/* Submit */}
            <button
              type="submit"
              className="signup-submit-btn"
            >
              Create account
              <ArrowRight size={18} />
            </button>

          </form>


          {/* Login */}
          <div className="signup-switch">

            <span>
              Already have an account?
            </span>

            <Link to="/login">
              Sign in
            </Link>

          </div>


          {/* Other Registration Options */}
          <div className="signup-registration">

            <p>
              Looking to join Shop Point in another role?
            </p>

            <div className="signup-registration-links">

              <Link to="/vendor/register">
                Register as a Vendor
              </Link>

              <span>•</span>

              <Link to="/rider/register">
                Register as a Rider
              </Link>

            </div>

          </div>


          {/* Back Home */}
          <Link
            to="/"
            className="signup-back-home"
          >
            ← Back to Shop Point
          </Link>

        </div>

      </div>

    </div>
  );
};

export default Signup;