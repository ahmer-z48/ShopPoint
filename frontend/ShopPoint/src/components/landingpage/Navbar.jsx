import { useState } from "react";
import { 
  Menu,
  X,
  Search,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  const navigate = useNavigate();

  const goToLogin = () => {
    setMobileMenu(false);
    navigate("/login");
  };

  const goToSignup = () => {
    setMobileMenu(false);
    navigate("/signup");
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <a href="#" className="logo">
          <div className="logo-icon">
            SP
          </div>

          <span>Shop Point</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="nav-links">
          <a href="#shops">Shops</a>
          <a href="#categories">Categories</a>
          <a href="#how-it-works">How it works</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        {/* Desktop Actions */}
        <div className="nav-actions">

          <button
            className="sign-in-btn"
            onClick={goToLogin}
          >
            Sign in
          </button>

          <button
            className="vendor-btn"
            onClick={goToSignup}
          >
            Become a vendor
          </button>

        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? (
            <X size={25} />
          ) : (
            <Menu size={25} />
          )}
        </button>
      </div>

      {/* Search Toolbar */}
      <div className="search-toolbar">
        <div className="search-container">

          <div className="search-box">
            <Search size={20} />

            <input
              type="text"
              placeholder="Search shops or products near you"
            />
          </div>

          <button className="filter-btn">
            Categories
            <ChevronDown size={16} />
          </button>

          <button className="filter-btn">
            Filters
            <ChevronDown size={16} />
          </button>

          <button className="location-btn">
            <MapPin size={18} />
            Quetta
            <ChevronDown size={16} />
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="mobile-menu">

          <a
            href="#shops"
            onClick={() => setMobileMenu(false)}
          >
            Shops
          </a>

          <a
            href="#categories"
            onClick={() => setMobileMenu(false)}
          >
            Categories
          </a>

          <a
            href="#how-it-works"
            onClick={() => setMobileMenu(false)}
          >
            How it works
          </a>

          <a
            href="#about"
            onClick={() => setMobileMenu(false)}
          >
            About
          </a>

          <a
            href="#contact"
            onClick={() => setMobileMenu(false)}
          >
            Contact
          </a>

          <button
            className="mobile-signin"
            onClick={goToLogin}
          >
            Sign in
          </button>

          <button
            className="mobile-vendor"
            onClick={goToSignup}
          >
            Become a vendor
          </button>

        </div>
      )}
    </header>
  );
};

export default Navbar;