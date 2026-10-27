import { useMemo } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  Package,
  ShoppingBag,
  Truck,
  Store,
  CalendarDays,
  ArrowRight,
  UserRound,
  Heart,
  Settings,
} from "lucide-react";

import { useUser } from "../../Context/UserContext";
import "./AccountPages.css";
import "./UserPanel.css";
import Navbar from "../landingpage/Navbar";

const formatPrice = (price) =>
  `Rs. ${Number(price || 0).toLocaleString("en-PK")}`;

const formatDate = (date) => {
  if (!date) return "Date unavailable";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }

  return parsedDate.toLocaleDateString("en-PK", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const MyOrders = () => {
  const { user } = useUser();

  const orders = useMemo(() => {
    try {
      const savedOrders = JSON.parse(
        localStorage.getItem("shopPointOrders") || "[]",
      );

      const currentOrder = JSON.parse(
        localStorage.getItem("shopPointCurrentOrder") || "null",
      );

      const validOrders = Array.isArray(savedOrders) ? savedOrders : [];

      // Include an older current order if it was not added to history.
      const allOrders =
        currentOrder &&
        !validOrders.some((order) => order.id === currentOrder.id)
          ? [currentOrder, ...validOrders]
          : validOrders;

      // Show only the signed-in customer's orders.
      const customerOrders = user
        ? allOrders.filter(
            (order) =>
              !order.customerId ||
              String(order.customerId) === String(user.id) ||
              order.customerEmail === user.email,
          )
        : [];

      return customerOrders.sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
      );
    } catch (error) {
      console.error("Could not load order history:", error);
      return [];
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar />
      <div className="account-page">
          <div className="account-container">
            <div className="account-heading">
              <span className="account-eyebrow">YOUR ACCOUNT</span>
              <h1>My Orders</h1>
              <p>View your Shop Point purchases and order status.</p>
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
                  <Link to="/account" className="account-nav-link">
                    <UserRound size={18} />
                    My Account
                  </Link>

                  <Link
                    to="/account/orders"
                    className="account-nav-link active"
                    aria-current="page"
                  >
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

              <section className="account-card orders-card">
                <div className="account-card-heading">
                  <h2>Order History</h2>
                  <p>
                    {orders.length}{" "}
                    {orders.length === 1 ? "order" : "orders"} placed
                  </p>
                </div>

                {orders.length === 0 ? (
                  <div className="orders-empty">
                    <div className="orders-empty-icon">
                      <ShoppingBag size={32} />
                    </div>

                    <h2>No orders yet</h2>
                    <p>
                      Once you place an order from a local shop, its details
                      will appear here.
                    </p>

                    <Link to="/all-shops" className="user-primary-link">
                      Explore Local Shops
                    </Link>
                  </div>
                ) : (
                  <div className="orders-list">
                    {orders.map((order) => {
                      const isDelivery = order.deliveryMethod === "delivery";
                      const itemCount = (order.items || []).reduce(
                        (sum, item) => sum + Number(item.quantity || 1),
                        0,
                      );

                      return (
                        <article className="order-card" key={order.id}>
                          <div className="order-card-header">
                            <div className="order-number">
                              <div className="order-icon">
                                <Package size={21} />
                              </div>

                              <div>
                                <span>Order ID</span>
                                <h3>{order.id}</h3>
                              </div>
                            </div>

                            <span
                              className={`order-status ${
                                order.status === "Delivered" ||
                                order.status === "Order Ready for Pickup"
                                  ? "order-status-success"
                                  : "order-status-pending"
                              }`}
                            >
                              {order.status || "Order Confirmed"}
                            </span>
                          </div>

                          <div className="order-card-meta">
                            <span>
                              <CalendarDays size={16} />
                              {formatDate(order.createdAt)}
                            </span>

                            <span>
                              {isDelivery ? (
                                <Truck size={16} />
                              ) : (
                                <Store size={16} />
                              )}
                              {isDelivery ? "Home Delivery" : "Shop Pickup"}
                            </span>

                            <span>
                              <ShoppingBag size={16} />
                              {itemCount} {itemCount === 1 ? "item" : "items"}
                            </span>
                          </div>

                          <div className="order-card-items">
                            {(order.items || []).map((item, index) => (
                              <div
                                className="order-history-item"
                                key={`${
                                  item.id || item.productId || item.name
                                }-${index}`}
                              >
                                <div className="order-history-item-image">
                                  {item.image ? (
                                    <img
                                      src={item.image}
                                      alt={item.name || "Product"}
                                    />
                                  ) : (
                                    <Package size={22} />
                                  )}
                                </div>

                                <div className="order-history-item-info">
                                  <strong>{item.name || "Product"}</strong>
                                  <span>
                                    Qty: {Number(item.quantity || 1)}
                                  </span>
                                </div>

                                <strong>
                                  {formatPrice(
                                    item.itemTotal ??
                                      Number(item.price || 0) *
                                        Number(item.quantity || 1),
                                  )}
                                </strong>
                              </div>
                            ))}
                          </div>

                          <div className="order-card-footer">
                            <div>
                              <span>Total Amount</span>
                              <strong>{formatPrice(order.total)}</strong>
                            </div>

                            <Link
                              to={`/account/track/${encodeURIComponent(
                                order.id,
                              )}`}
                              className="order-track-link"
                            >
                              Track Order
                              <ArrowRight size={16} />
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
      </div>
    </>
  );
};

export default MyOrders;
