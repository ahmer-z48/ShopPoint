import React, { useState } from "react";
import {
  Search,
  MapPin,
  Star,
  Heart,
  ArrowLeft,
  ShoppingCart,
  Clock,
  Truck,
  Store,
  Plus,
} from "lucide-react";

import { Link, useNavigate, useParams } from "react-router-dom";

import shops from "../data/Shops";
import products from "../data/product";

import "./DisplayShop.css";

const DisplayShop = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const shop = shops.find((shop) => shop.id === id);

  const shopProducts = products.filter(
    (product) => product.shopId === id
  );

  const [favorite, setFavorite] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All Products");

  const [cartCount, setCartCount] = useState(() => {
    const cart = JSON.parse(
      localStorage.getItem("shopPointCart") || "[]"
    );

    return cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
  });

  const handleQuickAdd = (event, product) => {
    event.stopPropagation();

    const cart = JSON.parse(
      localStorage.getItem("shopPointCart") || "[]"
    );

    const existingProduct = cart.find(
      (item) => item.productId === product.id
    );

    const updatedCart = existingProduct
      ? cart.map((item) =>
          item.productId === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      : [
          ...cart,
          {
            productId: product.id,
            quantity: 1,
          },
        ];

    localStorage.setItem(
      "shopPointCart",
      JSON.stringify(updatedCart)
    );

    setCartCount(
      updatedCart.reduce(
        (total, item) => total + item.quantity,
        0
      )
    );
  };

  if (!shop) {
    return (
      <div className="shop-display-page">
        <header className="shop-display-header">
          <div className="shop-display-header-container">
            <Link
              to="/all-shops"
              className="shop-back-btn"
            >
              <ArrowLeft size={18} />
              <span>All Shops</span>
            </Link>

            <Link
              to="/"
              className="shop-display-logo"
            >
              <div className="shop-display-logo-icon">
                SP
              </div>

              <span>Shop Point</span>
            </Link>
          </div>
        </header>

        <main
          style={{
            minHeight: "60vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "40px",
          }}
        >
          <h1>Shop Not Found</h1>

          <p>
            The shop you are looking for does not exist.
          </p>

          <Link
            to="/all-shops"
            className="shop-back-btn"
            style={{ marginTop: "20px" }}
          >
            <ArrowLeft size={18} />
            Back to All Shops
          </Link>
        </main>
      </div>
    );
  }

  const categories = [
    "All Products",
    ...new Set(
      shopProducts.map((product) => product.category)
    ),
  ];

  const filteredProducts = shopProducts.filter(
    (product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All Products" ||
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    }
  );

  return (
    <div className="shop-display-page">
      <header className="shop-display-header">
        <div className="shop-display-header-container">
          <Link
            to="/all-shops"
            className="shop-back-btn"
          >
            <ArrowLeft size={18} />
            <span>All Shops</span>
          </Link>

          <Link
            to="/"
            className="shop-display-logo"
          >
            <div className="shop-display-logo-icon">
              SP
            </div>

            <span>Shop Point</span>
          </Link>

          <button
            type="button"
            className="shop-cart-btn"
          >
            <ShoppingCart size={20} />

            <span>
              Cart {cartCount > 0 ? `(${cartCount})` : ""}
            </span>
          </button>
        </div>
      </header>

      <section className="shop-hero">
        <div className="shop-cover">
          <img
            src={shop.image}
            alt={shop.name}
          />

          <div className="shop-cover-overlay"></div>
        </div>

        <div className="shop-profile-container">
          <div className="shop-profile-card">
            <img
              src={shop.logo}
              alt={shop.name}
              className="shop-profile-image"
            />

            <div className="shop-profile-info">
              <div className="shop-name-row">
                <div>
                  <div className="shop-category-label">
                    {shop.category}
                  </div>

                  <h1>{shop.name}</h1>
                </div>

                <button
                  type="button"
                  className={`shop-save-btn ${
                    favorite
                      ? "shop-save-active"
                      : ""
                  }`}
                  onClick={() =>
                    setFavorite(!favorite)
                  }
                >
                  <Heart
                    size={20}
                    fill={
                      favorite
                        ? "currentColor"
                        : "none"
                    }
                  />

                  <span>
                    {favorite ? "Saved" : "Save"}
                  </span>
                </button>
              </div>

              <div className="shop-meta">
                <div className="shop-rating-detail">
                  <Star
                    size={17}
                    fill="currentColor"
                  />

                  <strong>{shop.rating}</strong>

                  <span>
                    ({shop.reviews} reviews)
                  </span>
                </div>

                <div className="shop-meta-item">
                  <MapPin size={16} />
                  <span>{shop.location}</span>
                </div>

                <div className="shop-meta-item">
                  <Clock size={16} />
                  <span>{shop.openingHours}</span>
                </div>
              </div>

              <div className="shop-services-detail">
                <span className="shop-open-status">
                  <span></span>

                  {shop.status === "Open"
                    ? "Open now"
                    : "Closed"}
                </span>

                {shop.services.includes("Delivery") && (
                  <span>
                    <Truck size={14} />
                    Delivery available
                  </span>
                )}

                {shop.services.includes("Pickup") && (
                  <span>
                    <Store size={14} />
                    Pickup available
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shop-information">
        <div className="shop-information-container">
          <div className="shop-about">
            <span className="section-label">
              ABOUT THE SHOP
            </span>

            <h2>
              Everything you need,
              <br />
              from your local shop.
            </h2>

            <p>{shop.description}</p>
          </div>

          <div className="shop-hours-card">
            <div className="hours-icon">
              <Clock size={21} />
            </div>

            <div>
              <span>Opening Hours</span>

              <strong>{shop.openingHours}</strong>

              <small>Monday - Sunday</small>
            </div>
          </div>
        </div>
      </section>

      <main className="shop-products-section">
        <div className="shop-products-container">
          <div className="products-heading">
            <div>
              <span className="section-label">
                SHOP PRODUCTS
              </span>

              <h2>Browse Products</h2>

              <p>
                Find what you need from this shop.
              </p>
            </div>
          </div>

          <div className="product-search-box">
            <Search size={19} />

            <input
              type="text"
              placeholder="Search products in this shop..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
            />
          </div>

          <div className="product-categories">
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                className={
                  selectedCategory === category
                    ? "category-active"
                    : ""
                }
                onClick={() =>
                  setSelectedCategory(category)
                }
              >
                {category}
              </button>
            ))}
          </div>

          <div className="product-results-info">
            <span>
              {filteredProducts.length} products
            </span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <article
                  className="product-card product-card-clickable"
                  key={product.id}
                  role="link"
                  tabIndex={0}
                  onClick={() =>
                    navigate(`/product/${product.id}`)
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      navigate(`/product/${product.id}`);
                    }
                  }}
                >
                  <div className="product-image-wrapper">
                    <img
                      src={product.image}
                      alt={product.name}
                    />

                    <span>{product.category}</span>
                  </div>

                  <div className="product-content">
                    <h3>{product.name}</h3>

                    <p>{product.unit}</p>

                    <div className="product-bottom">
                      <div className="product-price">
                        <span>Rs.</span>
                        {product.price}
                      </div>

                      <button
                        type="button"
                        className="add-cart-btn"
                        onClick={(event) =>
                          handleQuickAdd(event, product)
                        }
                      >
                        <Plus size={17} />
                        Add
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="no-products">
              <Search size={38} />

              <h3>No products found</h3>

              <p>
                Try another product or category.
              </p>
            </div>
          )}
        </div>
      </main>

      <footer className="shop-display-footer">
        <div className="shop-display-footer-container">
          <div>
            <div className="shop-display-footer-logo">
              <div className="shop-display-logo-icon">
                SP
              </div>

              <span>Shop Point</span>
            </div>

            <p>
              Every local shop, one search away.
            </p>
          </div>

          <div className="shop-footer-links">
            <Link to="/">Home</Link>
            <Link to="/all-shops">All Shops</Link>
            <Link to="/login">Sign In</Link>
          </div>

          <div className="shop-footer-copy">
            © 2026 Shop Point. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DisplayShop;