import React, { useState } from "react";
import {
  Search,
  MapPin,
  Star,
  Heart,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import shops from "../data/Shops";
import "./AllShops.css";

const AllShops = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredShops = shops.filter((shop) => {
    const search = searchTerm.toLowerCase();

    return (
      shop.name.toLowerCase().includes(search) ||
      shop.category.toLowerCase().includes(search) ||
      shop.location.toLowerCase().includes(search)
    );
  });

  return (
    <div className="all-shops-page">

      {/* Header */}
      <header className="all-shops-header">
        <div className="all-shops-header-container">

          <Link to="/" className="all-shops-logo">
            <div className="all-shops-logo-icon">SP</div>
            <span>Shop Point</span>
          </Link>

          <div className="all-shops-location">
            <MapPin size={18} />
            <span>Quetta</span>
          </div>

          <Link to="/" className="back-home-btn">
            Back to Home
          </Link>

        </div>
      </header>

      {/* Search Section */}
      <section className="all-shops-search-section">
        <div className="all-shops-search-container">

          <div className="all-shops-heading">
            <span>LOCAL MARKETPLACE</span>

            <h1>Explore All Shops</h1>

            <p>
              Discover local shops and find the products you need,
              all in one place.
            </p>
          </div>

          <div className="all-shops-search-box">

            <Search size={21} />

            <input
              type="text"
              placeholder="Search shops, categories or locations..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />

            {searchTerm && (
              <button
                className="clear-search"
                onClick={() => setSearchTerm("")}
              >
                Clear
              </button>
            )}

          </div>

        </div>
      </section>

      {/* Shops */}
      <main className="all-shops-main">

        <div className="all-shops-top-row">
          <div>
            <h2>All Shops</h2>

            <p>
              {filteredShops.length} shops available
            </p>
          </div>
        </div>

        {filteredShops.length > 0 ? (

          <div className="all-shops-grid">

            {filteredShops.map((shop) => (
              <ShopCard
                key={shop.id}
                shop={shop}
              />
            ))}

          </div>

        ) : (

          <div className="no-shops">

            <Search size={40} />

            <h3>No shops found</h3>

            <p>
              Try searching for another shop, category or location.
            </p>

          </div>

        )}

      </main>

      {/* Footer */}
      <footer className="all-shops-footer">
        <div className="all-shops-footer-container">

          <div className="footer-brand">

            <div className="all-shops-logo">
              <div className="all-shops-logo-icon">SP</div>
              <span>Shop Point</span>
            </div>

            <p>
              Every local shop, one search away.
            </p>

          </div>

          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/">About</Link>
            <Link to="/">Contact</Link>
          </div>

          <p className="footer-copy">
            © 2026 Shop Point. All rights reserved.
          </p>

        </div>
      </footer>

    </div>
  );
};


/* =========================
   SHOP CARD
========================= */

const ShopCard = ({ shop }) => {

  const [favorite, setFavorite] = useState(false);

  return (
    <article className="all-shop-card">

      {/* Image */}
      <div className="all-shop-image-wrapper">

        <img
          src={shop.image}
          alt={shop.name}
          className="all-shop-image"
        />

        <span className="all-shop-category">
          {shop.category}
        </span>

        <button
          className={`all-shop-favorite ${
            favorite ? "favorite-active" : ""
          }`}
          onClick={() => setFavorite(!favorite)}
          aria-label="Save shop"
        >
          <Heart
            size={19}
            fill={favorite ? "currentColor" : "none"}
          />
        </button>

        <span
          className={`all-shop-status ${
            shop.status === "Open"
              ? "status-open"
              : "status-closed"
          }`}
        >
          <span className="status-dot"></span>

          {shop.status === "Open"
            ? "Open now"
            : "Closed"}
        </span>

      </div>


      {/* Content */}
      <div className="all-shop-content">

        <div className="all-shop-title-row">

          <h3>{shop.name}</h3>

          {/* Open Shop */}
          <Link
            to={`/shop/${shop.id}`}
            className="all-shop-arrow"
            aria-label={`View ${shop.name}`}
          >
            <ArrowUpRight size={18} />
          </Link>

        </div>


        {/* Rating */}
        <div className="all-shop-rating">

          <Star
            size={16}
            fill="currentColor"
          />

          <strong>{shop.rating}</strong>

          <span>
            ({shop.reviews} reviews)
          </span>

        </div>


        {/* Location */}
        <div className="all-shop-location">

          <MapPin size={15} />

          <span>{shop.location}</span>

        </div>


        {/* Services */}
        <div className="all-shop-services">

          {shop.services.map((service) => (
            <span
              key={service}
              className={
                service === "Pickup only"
                  ? "service-alt"
                  : ""
              }
            >
              {service}
            </span>
          ))}

        </div>

      </div>

    </article>
  );
};

export default AllShops;