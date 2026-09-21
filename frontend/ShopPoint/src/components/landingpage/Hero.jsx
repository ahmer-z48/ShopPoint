import { useState } from "react";

import {
  Search,
  MapPin,
  ArrowRight,
  Store,
  ShoppingBag,
} from "lucide-react";

const Hero = () => {

  // Stores whatever the user types in the search box
  const [searchTerm, setSearchTerm] = useState("");

  // Runs when the Search button is clicked
  const handleSearch = () => {

    if (searchTerm.trim() === "") {
      alert("Please enter something to search.");
      return;
    }

    console.log("Searching for:", searchTerm);

  };

  // Allows user to press Enter instead of clicking Search
  const handleKeyDown = (event) => {

    if (event.key === "Enter") {
      handleSearch();
    }

  };

  return (
    <section className="hero">

      <div className="hero-container">

        {/* Left Content */}
        <div className="hero-content">

          <div className="hero-badge">
            <span className="badge-dot"></span>
            Supporting local businesses
          </div>

          <h1>
            Every local shop,
            <span> one search away.</span>
          </h1>

          <p>
            Find products from trusted local shops near you.
            Discover shops, check available prices, place your
            order, and choose pickup or delivery.
          </p>

          {/* Hero Search */}
          <div className="hero-search">

            <Search size={21} />

            <input
              type="text"
              placeholder="What are you looking for?"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              onKeyDown={handleKeyDown}
            />

            <button onClick={handleSearch}>
              Search
            </button>

          </div>

          <div className="hero-actions">

            <button className="primary-btn">
              <Store size={18} />
              Browse local shops
              <ArrowRight size={18} />
            </button>

            <button className="secondary-btn">
              See how it works
            </button>

          </div>

          {/* Stats */}
          <div className="hero-stats">

            <div>
              <strong>640+</strong>
              <span>Registered shops</span>
            </div>

            <div>
              <strong>6</strong>
              <span>Cities covered</span>
            </div>

            <div>
              <strong>18,000+</strong>
              <span>Products listed</span>
            </div>

          </div>

        </div>

        {/* Right Visual */}
        <div className="hero-visual">

          <div className="hero-card">

            <div className="hero-card-header">

              <div>
                <span className="small-label">
                  Nearby shops
                </span>

                <h3>Find what you need</h3>
              </div>

              <div className="location-circle">
                <MapPin size={20} />
              </div>

            </div>

            <div className="mock-search">
              <Search size={17} />
              <span>Search for a product...</span>
            </div>

            <div className="mini-shop">

              <div className="mini-shop-image">
                <ShoppingBag size={22} />
              </div>

              <div className="mini-shop-info">
                <strong>Al-Falah Grocery Mart</strong>
                <span>Liaquat Bazaar, Quetta</span>
              </div>

              <span className="open-status">
                Open
              </span>

            </div>

            <div className="mini-shop">

              <div className="mini-shop-image">
                <Store size={22} />
              </div>

              <div className="mini-shop-info">
                <strong>City Local Store</strong>
                <span>Main Market, Quetta</span>
              </div>

              <span className="open-status">
                Open
              </span>

            </div>

            <div className="mini-shop">

              <div className="mini-shop-image">
                <ShoppingBag size={22} />
              </div>

              <div className="mini-shop-info">
                <strong>New Town Mart</strong>
                <span>Jinnah Road, Quetta</span>
              </div>

              <span className="closed-status">
                Closed
              </span>

            </div>

          </div>

          <div className="floating-card floating-card-one">
            <strong>18,000+</strong>
            <span>Products available</span>
          </div>

          <div className="floating-card floating-card-two">
            <strong>4.8 ★</strong>
            <span>Average shop rating</span>
          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;