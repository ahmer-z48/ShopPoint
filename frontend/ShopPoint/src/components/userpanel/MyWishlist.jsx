
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useUser } from "../../Context/UserContext";
import products from "../data/product";
import shops from "../data/Shops";
import "./AccountPages.css";
import Navbar from "../landingpage/Navbar";

export default function MyWishlist() {
  const { user, isLoggedIn } = useUser();

  const wishlistKey = user
    ? `shopPointWishlist_${user.id}`
    : "";

  const [savedIds, setSavedIds] = useState([]);

  useEffect(() => {
    if (!wishlistKey) return;

    try {
      const saved = JSON.parse(
        localStorage.getItem(wishlistKey) || "[]"
      );

      setSavedIds(Array.isArray(saved) ? saved : []);
    } catch {
      setSavedIds([]);
    }
  }, [wishlistKey]);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  function removeFromWishlist(productId) {
    const updated = savedIds.filter(
      (id) => String(id) !== String(productId)
    );

    setSavedIds(updated);

    try {
      localStorage.setItem(wishlistKey, JSON.stringify(updated));
    } catch {
      // Keep the current UI usable if storage is unavailable.
    }
  }

  const wishlistProducts = products.filter((product) =>
    savedIds.some((id) => String(id) === String(product.id))
  );

  return (
    <>
    <Navbar/>
    <div className="account-page">
      <div className="account-container">
        <div className="account-heading">
          <span className="account-eyebrow">YOUR ACCOUNT</span>
          <h1>My Wishlist</h1>
          <p>Keep track of products you would like to buy.</p>
        </div>

        <div className="account-layout">
          <aside className="account-sidebar">
            <div className="account-user-summary">
              <div className="account-avatar">
                <Heart size={27} />
              </div>
              <div>
                <h3>{user.name}</h3>
                <p>{user.email}</p>
              </div>
            </div>

            <nav className="account-navigation">
              <Link to="/account" className="account-nav-link">
                Personal Details
              </Link>
              <Link to="/account/orders" className="account-nav-link">
                My Orders
              </Link>
              <Link
                to="/account/wishlist"
                className="account-nav-link active"
              >
                <Heart size={18} />
                My Wishlist
              </Link>
              <Link to="/account/settings" className="account-nav-link">
                Account Settings
              </Link>
            </nav>
          </aside>

          <section className="account-card wishlist-card">
            <div className="account-card-heading wishlist-heading">
              <div>
                <h2>Saved Products</h2>
                <p>
                  {wishlistProducts.length}{" "}
                  {wishlistProducts.length === 1 ? "item" : "items"} saved
                </p>
              </div>
            </div>

            {wishlistProducts.length === 0 ? (
              <div className="wishlist-empty">
                <div className="wishlist-empty-icon">
                  <Heart size={32} />
                </div>
                <h3>Your wishlist is empty</h3>
                <p>
                  Save products you like and find them here whenever
                  you need them.
                </p>
                <Link to="/all-shops" className="account-primary-btn">
                  <ShoppingBag size={17} />
                  Explore Local Shops
                </Link>
              </div>
            ) : (
              <div className="wishlist-grid">
                {wishlistProducts.map((product) => {
                  const shop = shops.find(
                    (item) =>
                      String(item.id) === String(product.shopId)
                  );

                  return (
                    <article
                      className="wishlist-product"
                      key={product.id}
                    >
                      <Link
                        to={`/product/${product.id}`}
                        className="wishlist-product-image"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                        />
                      </Link>

                      <button
                        type="button"
                        className="wishlist-remove"
                        aria-label={`Remove ${product.name} from wishlist`}
                        title="Remove from wishlist"
                        onClick={() => removeFromWishlist(product.id)}
                      >
                        <Trash2 size={17} />
                      </button>

                      <div className="wishlist-product-info">
                        <h3>
                          <Link to={`/product/${product.id}`}>
                            {product.name}
                          </Link>
                        </h3>

                        <p className="wishlist-shop-name">
                          {shop?.name || "Local shop"}
                        </p>

                        <div className="wishlist-price-row">
                          <strong>
                            Rs. {Number(product.price).toLocaleString()}
                          </strong>
                          {product.unit && <span>/ {product.unit}</span>}
                        </div>

                        <Link
                          to={`/product/${product.id}`}
                          className="wishlist-view-btn"
                        >
                          View Product
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </div></>
  );
}
