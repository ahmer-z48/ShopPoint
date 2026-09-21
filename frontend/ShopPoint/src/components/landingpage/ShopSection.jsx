import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import ShopCard from "./ShopCard";
import shops from '../data/Shops';

import "./ShopSection.css";

const ShopSection = () => {
  return (
    <section className="shops-section" id="shops">

      <div className="wrap">

        {/* Section Heading */}
        
          <div className="section-head">
  <div className="section-head-content">
    <h2>Popular shops near you</h2>

    <p>
      A mix of the local shops shoppers in Quetta are
      searching and ordering from most this week.
    </p>
  </div>

  <Link to="/all-shops" className="view-all">
    View all shops
    <ArrowRight size={18} />
  </Link>
</div>


        {/* Shops Grid */}
        <div className="shop-grid">

          {shops.slice(0, 6).map((shop) => (
            <ShopCard
              key={shop.id}
              shop={shop}
            />
          ))}

        </div>

      </div>

    </section>
  );
};

export default ShopSection;