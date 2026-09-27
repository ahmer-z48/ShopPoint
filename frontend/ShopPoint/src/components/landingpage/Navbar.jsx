import { useMemo, useState } from "react";
import {
  Menu,
  X,
  Search,
  MapPin,
  ChevronDown,
  Star,
  Store,
  Package,
  Check,
  SlidersHorizontal,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import shops from "../data/Shops";
import products from "../data/product";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const [mobileMenu, setMobileMenu] = useState(false);

  // Search
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Dropdowns
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);

  // Selected filters
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedRating, setSelectedRating] = useState("");

  /* --------------------------------
     DYNAMIC CATEGORIES
  -------------------------------- */

  const categories = useMemo(() => {
    return [...new Set(shops.map((shop) => shop.category))].sort();
  }, []);

  /* --------------------------------
     DYNAMIC LOCATIONS
  -------------------------------- */

  const locations = useMemo(() => {
    return [...new Set(shops.map((shop) => shop.location))].sort();
  }, []);

  /* --------------------------------
     PRODUCT SEARCH SUGGESTIONS
  -------------------------------- */

  const suggestions = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return [];
    }

    return products
      .filter((product) => {
        const productName = product.name?.toLowerCase() || "";
        const productCategory = product.category?.toLowerCase() || "";

        return (
          productName.includes(query) ||
          productCategory.includes(query)
        );
      })
      .map((product) => {
        const shop = shops.find(
          (shop) => String(shop.id) === String(product.shopId)
        );

        return {
          product,
          shop,
        };
      })
      .filter((item) => item.shop);
  }, [searchTerm]);

  /* --------------------------------
     SEARCH
  -------------------------------- */

  const handleSearch = (specificProduct = "") => {
    const query = specificProduct || searchTerm.trim();

    // Allow search using ONLY filters
    if (
      !query &&
      !selectedCategory &&
      !selectedLocation &&
      !selectedStatus &&
      !selectedService &&
      !selectedRating
    ) {
      setShowSuggestions(false);
      return;
    }

    const params = new URLSearchParams();

    if (query) {
      params.set("query", query);
    }

    if (selectedCategory) {
      params.set("category", selectedCategory);
    }

    if (selectedLocation) {
      params.set("location", selectedLocation);
    }

    if (selectedStatus) {
      params.set("status", selectedStatus);
    }

    if (selectedService) {
      params.set("service", selectedService);
    }

    if (selectedRating) {
      params.set("rating", selectedRating);
    }

    setShowSuggestions(false);
    setCategoryOpen(false);
    setFilterOpen(false);
    setLocationOpen(false);

    navigate(`/search?${params.toString()}`);
  };

  /* --------------------------------
     ENTER KEY
  -------------------------------- */

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      // Search using current text + filters
      handleSearch();
    }

    if (event.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  /* --------------------------------
     CLEAR FILTERS
  -------------------------------- */

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedLocation("");
    setSelectedStatus("");
    setSelectedService("");
    setSelectedRating("");
    setFilterOpen(false);
  };

  /* --------------------------------
     MOBILE NAVIGATION
  -------------------------------- */

  const goToLogin = () => {
    setMobileMenu(false);
    navigate("/login");
  };

  const goToSignup = () => {
    setMobileMenu(false);
    navigate("/signup");
  };

  const goHome = () => {
    setMobileMenu(false);
    navigate("/");
  };

  /* --------------------------------
     SELECT CATEGORY
  -------------------------------- */

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setCategoryOpen(false);
  };

  /* --------------------------------
     SELECT LOCATION
  -------------------------------- */

  const selectLocation = (location) => {
    setSelectedLocation(location);
    setLocationOpen(false);
  };

  /* --------------------------------
     FILTER STATUS
  -------------------------------- */

  const selectStatus = (status) => {
    setSelectedStatus(
      selectedStatus === status ? "" : status
    );
  };

  /* --------------------------------
     FILTER SERVICE
  -------------------------------- */

  const selectService = (service) => {
    setSelectedService(
      selectedService === service ? "" : service
    );
  };

  /* --------------------------------
     FILTER RATING
  -------------------------------- */

  const selectRating = (rating) => {
    setSelectedRating(
      selectedRating === rating ? "" : rating
    );
  };

  return (
    <header className="navbar">
      {/* =====================================
          MAIN NAVBAR
      ====================================== */}

      <div className="navbar-container">

        {/* LOGO */}

        <button className="logo" onClick={goHome}>
          <div className="logo-icon">SP</div>
          <span>Shop Point</span>
        </button>

        {/* DESKTOP NAVIGATION */}

        <nav className="nav-links">
          <a href="#shops">Shops</a>
          <a href="#categories">Categories</a>
          <a href="#how-it-works">How it works</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        {/* DESKTOP ACTIONS */}

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

        {/* MOBILE BUTTON */}

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

      {/* =====================================
          SEARCH TOOLBAR
      ====================================== */}

      <div className="search-toolbar">
        <div className="search-container">

          {/* SEARCH BOX */}

          <div className="search-wrapper">

            <div className="search-box">
              <Search size={20} />

              <input
                type="text"
                placeholder="Search for products near you"
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                  setShowSuggestions(
                    event.target.value.trim() !== ""
                  );
                }}
                onFocus={() => {
                  if (searchTerm.trim()) {
                    setShowSuggestions(true);
                  }
                }}
                onKeyDown={handleKeyDown}
              />

              {searchTerm && (
                <button
                  className="search-clear"
                  onClick={() => {
                    setSearchTerm("");
                    setShowSuggestions(false);
                  }}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* =================================
                PRODUCT SUGGESTIONS
            ================================== */}

            {showSuggestions && searchTerm.trim() && (
              <div className="search-suggestions">

                {suggestions.length > 0 ? (
                  <>
                    <div className="suggestions-header">
                      <span>Available products</span>
                      <span>
                        {suggestions.length} result
                        {suggestions.length !== 1 ? "s" : ""}
                      </span>
                    </div>

                    {suggestions.slice(0, 8).map(
                      ({ product, shop }) => (
                        <button
                          key={product.id}
                          className="suggestion-item"
                          onClick={() =>
                            handleSearch(product.name)
                          }
                        >
                          {/* PRODUCT IMAGE */}

                          <div className="suggestion-image">
                            <img
                              src={product.image}
                              alt={product.name}
                            />
                          </div>

                          {/* PRODUCT INFO */}

                          <div className="suggestion-info">
                            <strong>
                              {product.name}
                            </strong>

                            <span>
                              <Store size={14} />
                              {shop.name}
                            </span>

                            <small>
                              <MapPin size={13} />
                              {shop.location}
                            </small>
                          </div>

                          {/* PRICE */}

                          <div className="suggestion-price">
                            <strong>
                              Rs.{" "}
                              {Number(
                                product.price
                              ).toLocaleString()}
                            </strong>

                            <span>
                              / {product.unit}
                            </span>
                          </div>
                        </button>
                      )
                    )}

                    {/* VIEW ALL */}

                    {suggestions.length > 8 && (
                      <button
                        className="view-all-suggestions"
                        onClick={() => handleSearch()}
                      >
                        View all {suggestions.length} results
                      </button>
                    )}
                  </>
                ) : (
                  <div className="no-suggestions">
                    <Package size={22} />

                    <div>
                      <strong>
                        No products found
                      </strong>

                      <span>
                        Try another product name
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* =====================================
              CATEGORY DROPDOWN
          ====================================== */}

          <div className="toolbar-dropdown">

            <button
              className={`filter-btn ${
                selectedCategory
                  ? "active-filter"
                  : ""
              }`}
              onClick={() => {
                setCategoryOpen(!categoryOpen);
                setFilterOpen(false);
                setLocationOpen(false);
                setShowSuggestions(false);
              }}
            >
              <span>
                {selectedCategory || "Categories"}
              </span>

              <ChevronDown
                size={16}
                className={
                  categoryOpen ? "rotate-icon" : ""
                }
              />
            </button>

            {categoryOpen && (
              <div className="dropdown-menu">

                <button
                  className={!selectedCategory ? "selected-option" : ""}
                  onClick={() => selectCategory("")}
                >
                  {!selectedCategory && (
                    <Check size={15} />
                  )}
                  <span>All categories</span>
                </button>

                {categories.map((category) => (
                  <button
                    key={category}
                    className={
                      selectedCategory === category
                        ? "selected-option"
                        : ""
                    }
                    onClick={() =>
                      selectCategory(category)
                    }
                  >
                    {selectedCategory === category && (
                      <Check size={15} />
                    )}

                    <span>{category}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* =====================================
              FILTER DROPDOWN
          ====================================== */}

          <div className="toolbar-dropdown">

            <button
              className={`filter-btn ${
                selectedStatus ||
                selectedService ||
                selectedRating
                  ? "active-filter"
                  : ""
              }`}
              onClick={() => {
                setFilterOpen(!filterOpen);
                setCategoryOpen(false);
                setLocationOpen(false);
                setShowSuggestions(false);
              }}
            >
              <SlidersHorizontal size={16} />

              <span>
                {selectedStatus ||
                selectedService ||
                selectedRating
                  ? "Filters applied"
                  : "Filters"}
              </span>

              <ChevronDown
                size={16}
                className={
                  filterOpen ? "rotate-icon" : ""
                }
              />
            </button>

            {filterOpen && (
              <div className="filter-menu">

                {/* STATUS */}

                <div className="filter-section">
                  <span className="filter-title">
                    Shop Status
                  </span>

                  <button
                    onClick={() =>
                      selectStatus("Open")
                    }
                    className={
                      selectedStatus === "Open"
                        ? "filter-option selected-option"
                        : "filter-option"
                    }
                  >
                    <span className="status-dot open-dot"></span>
                    <span>Open</span>

                    {selectedStatus === "Open" && (
                      <Check size={15} />
                    )}
                  </button>

                  <button
                    onClick={() =>
                      selectStatus("Closed")
                    }
                    className={
                      selectedStatus === "Closed"
                        ? "filter-option selected-option"
                        : "filter-option"
                    }
                  >
                    <span className="status-dot closed-dot"></span>
                    <span>Closed</span>

                    {selectedStatus === "Closed" && (
                      <Check size={15} />
                    )}
                  </button>
                </div>

                <div className="filter-divider"></div>

                {/* SERVICE */}

                <div className="filter-section">
                  <span className="filter-title">
                    Service
                  </span>

                  <button
                    onClick={() =>
                      selectService("Delivery")
                    }
                    className={
                      selectedService === "Delivery"
                        ? "filter-option selected-option"
                        : "filter-option"
                    }
                  >
                    <span>Delivery</span>

                    {selectedService === "Delivery" && (
                      <Check size={15} />
                    )}
                  </button>

                  <button
                    onClick={() =>
                      selectService("Pickup")
                    }
                    className={
                      selectedService === "Pickup"
                        ? "filter-option selected-option"
                        : "filter-option"
                    }
                  >
                    <span>Pickup</span>

                    {selectedService === "Pickup" && (
                      <Check size={15} />
                    )}
                  </button>
                </div>

                <div className="filter-divider"></div>

                {/* RATING */}

                <div className="filter-section">
                  <span className="filter-title">
                    Minimum Rating
                  </span>

                  <button
                    onClick={() =>
                      selectRating("4")
                    }
                    className={
                      selectedRating === "4"
                        ? "filter-option selected-option"
                        : "filter-option"
                    }
                  >
                    <Star size={14} fill="currentColor" />
                    <span>4.0+</span>

                    {selectedRating === "4" && (
                      <Check size={15} />
                    )}
                  </button>

                  <button
                    onClick={() =>
                      selectRating("4.5")
                    }
                    className={
                      selectedRating === "4.5"
                        ? "filter-option selected-option"
                        : "filter-option"
                    }
                  >
                    <Star size={14} fill="currentColor" />
                    <span>4.5+</span>

                    {selectedRating === "4.5" && (
                      <Check size={15} />
                    )}
                  </button>
                </div>

                {/* CLEAR */}

                {(selectedStatus ||
                  selectedService ||
                  selectedRating) && (
                  <>
                    <div className="filter-divider"></div>

                    <button
                      className="clear-filter-btn"
                      onClick={clearFilters}
                    >
                      Clear filters
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* =====================================
              LOCATION
          ====================================== */}

          <div className="toolbar-dropdown">

            <button
              className={`location-btn ${
                selectedLocation
                  ? "active-location"
                  : ""
              }`}
              onClick={() => {
                setLocationOpen(!locationOpen);
                setCategoryOpen(false);
                setFilterOpen(false);
                setShowSuggestions(false);
              }}
            >
              <MapPin size={18} />

              <span>
                {selectedLocation
                  ? selectedLocation.split(",")[0]
                  : "Quetta"}
              </span>

              <ChevronDown
                size={16}
                className={
                  locationOpen ? "rotate-icon" : ""
                }
              />
            </button>

            {locationOpen && (
              <div className="location-menu">

                <button
                  className={
                    !selectedLocation
                      ? "selected-option"
                      : ""
                  }
                  onClick={() =>
                    selectLocation("")
                  }
                >
                  {!selectedLocation && (
                    <Check size={15} />
                  )}

                  <span>All Quetta</span>
                </button>

                {locations.map((location) => (
                  <button
                    key={location}
                    className={
                      selectedLocation === location
                        ? "selected-option"
                        : ""
                    }
                    onClick={() =>
                      selectLocation(location)
                    }
                  >
                    {selectedLocation === location && (
                      <Check size={15} />
                    )}

                    <span>{location}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* SEARCH BUTTON */}

          <button
            className="toolbar-search-btn"
            onClick={() => handleSearch()}
          >
            <Search size={18} />
            Search
          </button>
        </div>
      </div>

      {/* =====================================
          MOBILE MENU
      ====================================== */}

      {mobileMenu && (
        <div className="mobile-menu">

          <a
            href="#shops"
            onClick={() =>
              setMobileMenu(false)
            }
          >
            Shops
          </a>

          <a
            href="#categories"
            onClick={() =>
              setMobileMenu(false)
            }
          >
            Categories
          </a>

          <a
            href="#how-it-works"
            onClick={() =>
              setMobileMenu(false)
            }
          >
            How it works
          </a>

          <a
            href="#about"
            onClick={() =>
              setMobileMenu(false)
            }
          >
            About
          </a>

          <a
            href="#contact"
            onClick={() =>
              setMobileMenu(false)
            }
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