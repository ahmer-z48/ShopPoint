import {
  MapPin,
  Star,
  Heart,
  ArrowUpRight,
} from "lucide-react";

import { useState } from "react";

import "./ShopCard.css";
import { Link } from "react-router-dom";

const ShopCard = ({ shop }) => {
  const [favorite, setFavorite] = useState(false);

  return (


    <article className="shop-card">

      {/* Shop Image */}
      <div className="shop-image-wrapper">

        <img
          src={shop.image}
          alt={shop.name}
          className="shop-image"
        />

        {/* Category */}
        <span className="shop-category">
          {shop.category}
        </span>

        {/* Favorite */}
        <button
          className={`favorite-btn ${
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

        {/* Status */}
        <span
          className={`shop-status ${
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


      {/* Shop Content */}
      <div className="shop-content">

        <div className="shop-title-row">

          <h3>{shop.name}</h3>
          <Link to={`/shop/${shop.id}`}
          className="shop-arrow"
            aria-label="View shop">
            <ArrowUpRight size={18} />
          </Link>

        </div>


        {/* Rating */}
        <div className="shop-rating">

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
        <div className="shop-location">

          <MapPin size={15} />

          {shop.location}

        </div>


        {/* Services */}
        <div className="shop-services">

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

export default ShopCard;