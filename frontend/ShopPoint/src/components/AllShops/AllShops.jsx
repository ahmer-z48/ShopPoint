
import React, { useState } from "react";
import {
  Search,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

import shops from "../data/Shops";
import ShopCard from "../../components/landingpage/ShopCard";

import "./AllShops.css";
import Footer from "../landingpage/Footer";

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
            <div className="all-shops-logo-icon">
              SP
            </div>

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


          {/* Search */}
          <div className="all-shops-search-box">

            <Search size={21} />

            <input
              type="text"
              placeholder="Search shops, categories or locations..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
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


        {/* Shop Grid */}
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

          /* No Results */
          <div className="no-shops">

            <Search size={40} />

            <h3>No shops found</h3>

            <p>
              Try searching for another shop, category or location.
            </p>

          </div>

        )}

      </main>
      <Footer/>

    </div>
  );
};

export default AllShops;