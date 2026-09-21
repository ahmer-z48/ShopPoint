import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import "./Auth.css";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    console.log("Login data:", formData);

    // Backend login will be connected here later
  };

  return (
    <div className="auth-page">

      {/* Left Side */}
      <div className="auth-info">

        <div className="auth-logo">
          <div className="auth-logo-icon">SP</div>
          <span>Shop Point</span>
        </div>

        <div className="auth-info-content">
          <span className="auth-label">
            LOCAL SHOPPING, SIMPLIFIED
          </span>

          <h1>
            Your local shops,
            <span> just one search away.</span>
          </h1>

          <p>
            Discover trusted local shops, find the products
            you need, and order from nearby businesses with ease.
          </p>
        </div>

      </div>


      {/* Right Side */}
      <div className="auth-form-side">

        <div className="auth-form-container">

          {/* Mobile Logo */}
          <div className="auth-mobile-logo">
            <div className="auth-logo-icon">SP</div>
            <span>Shop Point</span>
          </div>

          {/* Heading */}
          <div className="auth-heading">
            <h2>Welcome back</h2>

            <p>
              Sign in to your Shop Point account
            </p>
          </div>


          {/* Login Form */}
          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >

            {/* Email */}
            <div className="form-group">

              <label htmlFor="email">
                Email address
              </label>

              <div className="input-wrapper">

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


            {/* Password */}
            <div className="form-group">

              <div className="password-label-row">

                <label htmlFor="password">
                  Password
                </label>

                <Link to="/forgot-password">
                  Forgot password?
                </Link>

              </div>

              <div className="input-wrapper">

                <Lock size={19} />

                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

              </div>

            </div>


            {/* Remember Me */}
            <div className="remember-row">

              <label className="remember-label">

                <input type="checkbox" />

                <span>
                  Remember me
                </span>

              </label>

            </div>


            {/* Login Button */}
            <button
              type="submit"
              className="auth-submit-btn"
            >
              Sign in
              <ArrowRight size={18} />
            </button>

          </form>


          {/* Signup */}
          <div className="auth-switch">

            <span>
              Don't have an account?
            </span>

            <Link to="/signup">
              Create an account
            </Link>

          </div>


          {/* Other Registration */}
          <div className="registration-options">

            <p>
              Are you joining Shop Point for another purpose?
            </p>

            <div className="registration-links">

              <Link to="/vendor/register">
                Register as a Vendor
              </Link>

              <span>•</span>

              <Link to="/rider/register">
                Register as a Rider
              </Link>

            </div>

          </div>


          {/* Back to Home */}
          <Link
            to="/"
            className="back-home"
          >
            ← Back to Shop Point
          </Link>

        </div>

      </div>

    </div>
  );
};

export default Login;