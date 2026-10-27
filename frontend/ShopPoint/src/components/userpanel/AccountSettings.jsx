
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Bell, LockKeyhole, Settings } from "lucide-react";
import { useUser } from "../../Context/UserContext";
import "./AccountPages.css";
import Navbar from "../landingpage/Navbar";

export default function AccountSettings() {
  const { user, isLoggedIn } = useUser();

  const settingsKey = user
    ? `shopPointSettings_${user.id}`
    : "";

  const [preferences, setPreferences] = useState({
    orderUpdates: true,
    offers: false,
  });

  const [passwordMessage, setPasswordMessage] = useState("");

  useEffect(() => {
    if (!settingsKey) return;

    try {
      const saved = localStorage.getItem(settingsKey);

      if (saved) {
        setPreferences((previous) => ({
          ...previous,
          ...JSON.parse(saved),
        }));
      }
    } catch {
      // Keep the default preferences if saved data is invalid.
    }
  }, [settingsKey]);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  function togglePreference(name) {
    setPreferences((previous) => {
      const updated = {
        ...previous,
        [name]: !previous[name],
      };

      try {
        localStorage.setItem(settingsKey, JSON.stringify(updated));
      } catch {
        // The preference remains usable for the current session.
      }

      return updated;
    });
  }

  function handlePasswordSubmit(event) {
    event.preventDefault();
    setPasswordMessage(
      "Password changes will be available when backend authentication is connected."
    );
  }

  return (
    <>
    <Navbar/>
    <div className="account-page">
      <div className="account-container">
        <div className="account-heading">
          <span className="account-eyebrow">YOUR ACCOUNT</span>
          <h1>Account Settings</h1>
          <p>Manage your notification preferences and security options.</p>
        </div>

        <div className="account-layout">
          <aside className="account-sidebar">
            <div className="account-user-summary">
              <div className="account-avatar">
                <Settings size={27} />
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
              <Link to="/account/wishlist" className="account-nav-link">
                My Wishlist
              </Link>
              <Link
                to="/account/settings"
                className="account-nav-link active"
              >
                <Settings size={18} />
                Account Settings
              </Link>
            </nav>
          </aside>

          <div className="account-settings-content">
            <section className="account-card">
              <div className="account-card-heading settings-title">
                <Bell size={21} />
                <div>
                  <h2>Notifications</h2>
                  <p>Choose which updates you would like to receive.</p>
                </div>
              </div>

              <div className="settings-option">
                <div>
                  <h3>Order Updates</h3>
                  <p>Stay informed about your order status.</p>
                </div>

                <label className="settings-switch">
                  <input
                    type="checkbox"
                    checked={preferences.orderUpdates}
                    onChange={() => togglePreference("orderUpdates")}
                  />
                  <span className="settings-slider" />
                </label>
              </div>

              <div className="settings-option">
                <div>
                  <h3>Offers and Promotions</h3>
                  <p>Receive updates about offers from local shops.</p>
                </div>

                <label className="settings-switch">
                  <input
                    type="checkbox"
                    checked={preferences.offers}
                    onChange={() => togglePreference("offers")}
                  />
                  <span className="settings-slider" />
                </label>
              </div>

              <p className="settings-note">
                These are demo preferences. Notifications are not sent yet.
              </p>
            </section>

            <section className="account-card">
              <div className="account-card-heading settings-title">
                <LockKeyhole size={21} />
                <div>
                  <h2>Password and Security</h2>
                  <p>Manage your sign-in security.</p>
                </div>
              </div>

              <form
                className="account-form"
                onSubmit={handlePasswordSubmit}
              >
                <div className="account-field">
                  <label htmlFor="current-password">Current Password</label>
                  <input
                    id="current-password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter current password"
                    required
                  />
                </div>

                <div className="account-field">
                  <label htmlFor="new-password">New Password</label>
                  <input
                    id="new-password"
                    type="password"
                    autoComplete="new-password"
                    minLength={8}
                    placeholder="At least 8 characters"
                    required
                  />
                </div>

                <button type="submit" className="account-primary-btn">
                  Change Password
                </button>

                {passwordMessage && (
                  <p className="account-message" role="status">
                    {passwordMessage}
                  </p>
                )}
              </form>
            </section>
          </div>
        </div>
      </div>
    </div></>
  );
}
