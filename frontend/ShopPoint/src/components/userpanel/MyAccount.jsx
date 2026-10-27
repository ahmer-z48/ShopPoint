
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserRound, Package, Heart, Settings, Save } from "lucide-react";
import { useUser } from "../../Context/UserContext";
import "./AccountPages.css";
import Navbar from "../landingpage/Navbar";

export default function MyAccount() {
  const { user, isLoggedIn, updateProfile } = useUser();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  const [message, setMessage] = useState("");

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.name.trim()) {
      setMessage("Please enter your name.");
      return;
    }

    updateProfile(formData);
    setMessage("Your personal details have been saved.");
  }

  return (
<><Navbar/>
    <div className="account-page">
      <div className="account-container">
        <div className="account-heading">
          <span className="account-eyebrow">YOUR ACCOUNT</span>
          <h1>My Account</h1>
          <p>Manage your personal information and preferences.</p>
        </div>

        <div className="account-layout">
          <aside className="account-sidebar">
            <div className="account-user-summary">
              <div className="account-avatar">
                <UserRound size={28} />
              </div>
              <div>
                <h3>{user.name}</h3>
                <p>{user.email}</p>
              </div>
            </div>

            <nav className="account-navigation">
              <Link to="/account" className="account-nav-link active">
                <UserRound size={18} />
                My Account
              </Link>

              <Link to="/account/orders" className="account-nav-link">
                <Package size={18} />
                My Orders
              </Link>

              <Link to="/account/wishlist" className="account-nav-link">
                <Heart size={18} />
                My Wishlist
              </Link>

              <Link to="/account/settings" className="account-nav-link">
                <Settings size={18} />
                Account Settings
              </Link>
            </nav>
          </aside>

          <section className="account-card">
            <div className="account-card-heading">
              <h2>Personal Details</h2>
              <p>Keep your contact information up to date.</p>
            </div>

            <form onSubmit={handleSubmit} className="account-form">
              <div className="account-field">
                <label htmlFor="account-name">Full Name</label>
                <input
                  id="account-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="account-field">
                <label htmlFor="account-email">Email Address</label>
                <input
                  id="account-email"
                  type="email"
                  value={user.email}
                  readOnly
                />
                <small>Your email address cannot be edited here.</small>
              </div>

              <div className="account-field">
                <label htmlFor="account-phone">Phone Number</label>
                <input
                  id="account-phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="account-field">
                <label htmlFor="account-address">Address</label>
                <textarea
                  id="account-address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your delivery address"
                  rows={3}
                />
              </div>

              {message && (
                <p className="account-message" role="status">
                  {message}
                </p>
              )}

              <button type="submit" className="account-primary-btn">
                <Save size={17} />
                Save Changes
              </button>
            </form>
          </section>
        </div>
      </div>
    </div></>
  );
}
