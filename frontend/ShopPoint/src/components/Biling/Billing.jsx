import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Bike,
  Check,
  CheckCircle2,
  Clock3,
  MapPin,
  Package,
  Phone,
  ShieldCheck,
  ShoppingBag,
  Store,
  Truck,
  User,
  WalletCards,
  Trash2,
  Navigation,
} from "lucide-react";

import products from "../../components/data/product";
import shops from "../../components/data/Shops";
import "./Billing.css";

const PICKUP_FEE_PER_SHOP = 0;
const DELIVERY_FEE = 150;

const formatPrice = (price) => `Rs. ${Number(price).toLocaleString("en-PK")}`;

const Billing = () => {
  const [deliveryMethod, setDeliveryMethod] = useState("pickup");
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [riderAccepted, setRiderAccepted] = useState(false);
  const [orderStatus, setOrderStatus] = useState(0);

  // Load cart from localStorage
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("shopPointCart") || "[]");
    } catch {
      return [];
    }
  });

  // --------------------------------------------------
  // DUMMY RIDER
  // --------------------------------------------------

  const dummyRider = {
    name: "Bilal Ahmed",
    vehicle: "Honda CD 70",
    vehicleNumber: "QTA-4587",
    phone: "0300-1234567",
  };

  // --------------------------------------------------
  // CREATE COMPLETE ORDER ITEMS
  // --------------------------------------------------

  const orderItems = useMemo(() => {
    return cart
      .map((cartItem) => {
        const product = products.find((item) => item.id === cartItem.productId);

        if (!product) return null;

        const quantity = Math.max(1, Number(cartItem.quantity) || 1);

        const shop = shops.find((item) => item.id === product.shopId);

        return {
          ...product,
          quantity,
          shop,
          itemTotal: Number(product.price) * quantity,
        };
      })
      .filter(Boolean);
  }, [cart]);

  // --------------------------------------------------
  // GROUP PRODUCTS BY SHOP
  // --------------------------------------------------

  const shopGroups = useMemo(() => {
    const groups = {};

    orderItems.forEach((item) => {
      const shopId = item.shop?.id || item.shopId;

      if (!groups[shopId]) {
        groups[shopId] = {
          shop: item.shop,
          items: [],
          subtotal: 0,
        };
      }

      groups[shopId].items.push(item);
      groups[shopId].subtotal += item.itemTotal;
    });

    return Object.values(groups);
  }, [orderItems]);

  // --------------------------------------------------
  // NUMBER OF SHOPS
  // --------------------------------------------------

  const shopCount = shopGroups.length;

  // --------------------------------------------------
  // SUBTOTAL
  // --------------------------------------------------

  const subtotal = useMemo(() => {
    return orderItems.reduce((total, item) => total + item.itemTotal, 0);
  }, [orderItems]);

  // --------------------------------------------------
  // PICKUP / DELIVERY FEE
  // --------------------------------------------------

  const pickupFee =
    deliveryMethod === "pickup" ? shopCount * PICKUP_FEE_PER_SHOP : 0;

  const deliveryFee = deliveryMethod === "delivery" ? DELIVERY_FEE : 0;

  const serviceFee = pickupFee + deliveryFee;

  const total = subtotal + serviceFee;

  // --------------------------------------------------
  // DELETE PRODUCT
  // --------------------------------------------------

  const handleDeleteItem = (productId) => {
    const updatedCart = cart.filter((item) => item.productId !== productId);

    setCart(updatedCart);

    localStorage.setItem("shopPointCart", JSON.stringify(updatedCart));
  };

  // --------------------------------------------------
  // CONFIRM ORDER
  // --------------------------------------------------

  const handleConfirmOrder = () => {
    if (!orderItems.length) return;

    const order = {
      id: `SP-${Date.now().toString().slice(-6)}`,
      items: orderItems,
      shops: shopGroups.map((group) => ({
        shopId: group.shop?.id,
        shopName: group.shop?.name,
        location: group.shop?.location,
        subtotal: group.subtotal,
      })),
      subtotal,
      deliveryMethod,
      pickupFee,
      deliveryFee,
      total,
      status:
        deliveryMethod === "delivery"
          ? "Preparing Order"
          : "Order Ready for Pickup",
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("shopPointCurrentOrder", JSON.stringify(order));

    setOrderConfirmed(true);
  };

  // --------------------------------------------------
  // DUMMY RIDER TRACKING
  // --------------------------------------------------

  useEffect(() => {
    if (!orderConfirmed || deliveryMethod !== "delivery") {
      return;
    }

    const riderTimer = setTimeout(() => {
      setRiderAccepted(true);
    }, 3000);

    const statusOneTimer = setTimeout(() => {
      setOrderStatus(1);
    }, 6000);

    const statusTwoTimer = setTimeout(() => {
      setOrderStatus(2);
    }, 10000);

    const statusThreeTimer = setTimeout(() => {
      setOrderStatus(3);
    }, 16000);

    return () => {
      clearTimeout(riderTimer);
      clearTimeout(statusOneTimer);
      clearTimeout(statusTwoTimer);
      clearTimeout(statusThreeTimer);
    };
  }, [orderConfirmed, deliveryMethod]);

  // --------------------------------------------------
  // EMPTY CART
  // --------------------------------------------------

  if (!orderItems.length && !orderConfirmed) {
    return (
      <main className="billing-page">
        <div className="billing-empty">
          <div className="billing-empty-icon">
            <ShoppingBag size={42} />
          </div>

          <h1>Your cart is empty</h1>

          <p>
            Add some products from local shops before proceeding to checkout.
          </p>

          <Link to="/all-shops" className="billing-primary-btn">
            Browse Shops
          </Link>
        </div>
      </main>
    );
  }

  // --------------------------------------------------
  // ORDER CONFIRMED
  // --------------------------------------------------

  if (orderConfirmed) {
    return (
      <main className="billing-page">
        <div className="billing-container">
          {/* SUCCESS */}
          <section className="success-banner">
            <div className="success-banner-icon">
              <CheckCircle2 size={34} />
            </div>

            <div>
              <span className="success-label">Order Successfully Placed</span>

              <h1>Thank you for your order!</h1>

              <p>
                Your order has been sent to{" "}
                <strong>
                  {shopCount} {shopCount === 1 ? "shop" : "shops"}
                </strong>
                .
              </p>
            </div>

            <div className="success-check">
              <Check size={20} />
            </div>
          </section>

          {/* ORDER SUMMARY */}
          <section className="billing-card">
            <div className="billing-card-header">
              <div className="billing-card-title">
                <Package size={21} />

                <div>
                  <h2>Order Summary</h2>

                  <span>
                    {shopCount} {shopCount === 1 ? "shop" : "shops"} ·{" "}
                    {orderItems.length}{" "}
                    {orderItems.length === 1 ? "product" : "products"}
                  </span>
                </div>
              </div>

              <div className="confirmed-badge">
                <Check size={14} />
                Confirmed
              </div>
            </div>

            {/* SHOPS */}
            <div className="confirmed-shops">
              {shopGroups.map((group) => (
                <div className="confirmed-shop" key={group.shop?.id}>
                  <div className="confirmed-shop-icon">
                    <Store size={19} />
                  </div>

                  <div className="confirmed-shop-info">
                    <strong>{group.shop?.name || "Local Shop"}</strong>

                    <span>
                      <MapPin size={13} />
                      {group.shop?.location || "Quetta"}
                    </span>
                  </div>

                  <strong className="confirmed-shop-total">
                    {formatPrice(group.subtotal)}
                  </strong>
                </div>
              ))}
            </div>

            {/* PRODUCTS */}
            <div className="billing-items confirmed-items">
              {orderItems.map((item) => (
                <div className="billing-item" key={item.id}>
                  <Link
                    to={`/product/${item.id}`}
                    className="billing-item-image"
                  >
                    <img src={item.image} alt={item.name} />
                  </Link>

                  <div className="billing-item-details">
                    <Link
                      to={`/product/${item.id}`}
                      className="billing-product-link"
                    >
                      <h3>{item.name}</h3>
                    </Link>

                    <span>{item.shop?.name || "Local Shop"}</span>

                    <p>
                      Qty: <strong>{item.quantity}</strong>
                    </p>
                  </div>

                  <div className="billing-item-price">
                    <span>{formatPrice(item.price)}</span>

                    <strong>{formatPrice(item.itemTotal)}</strong>
                  </div>
                </div>
              ))}
            </div>

            <div className="confirmation-total">
              <span>Total Order Value</span>
              <strong>{formatPrice(total)}</strong>
            </div>
          </section>

          {/* DELIVERY / PICKUP INFORMATION */}
          <section className="billing-card">
            <div className="billing-card-header">
              <div className="billing-card-title">
                {deliveryMethod === "delivery" ? (
                  <Truck size={21} />
                ) : (
                  <Store size={21} />
                )}

                <div>
                  <h2>
                    {deliveryMethod === "delivery"
                      ? "Delivery Information"
                      : "Pickup Information"}
                  </h2>

                  <span>
                    {deliveryMethod === "delivery"
                      ? "Your order will be delivered"
                      : "Collect your orders from the shops"}
                  </span>
                </div>
              </div>
            </div>

            {deliveryMethod === "pickup" ? (
              <div className="pickup-shops">
                {shopGroups.map((group, index) => (
                  <div className="pickup-shop-card" key={group.shop?.id}>
                    <div className="pickup-shop-number">{index + 1}</div>

                    <div className="pickup-shop-content">
                      <h3>{group.shop?.name || "Local Shop"}</h3>

                      <div className="pickup-location">
                        <MapPin size={15} />
                        <span>
                          {group.shop?.location || "Quetta, Balochistan"}
                        </span>
                      </div>

                      <p>
                        {group.items.length}{" "}
                        {group.items.length === 1 ? "product" : "products"} ·
                        Pickup fee{" "}
                        <strong>{formatPrice(PICKUP_FEE_PER_SHOP)}</strong>
                      </p>
                    </div>

                    <div className="pickup-shop-status">
                      <CheckCircle2 size={17} />
                      Ready for Pickup
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="delivery-info-grid">
                <div className="delivery-info-box">
                  <MapPin size={19} />

                  <div>
                    <span>Delivery Location</span>

                    <strong>Quetta, Balochistan</strong>
                  </div>
                </div>

                <div className="delivery-info-box">
                  <Clock3 size={19} />

                  <div>
                    <span>Estimated Time</span>

                    <strong>30–45 minutes</strong>
                  </div>
                </div>

                <div className="delivery-info-box">
                  <Store size={19} />

                  <div>
                    <span>Order From</span>

                    <strong>
                      {shopCount} {shopCount === 1 ? "shop" : "shops"}
                    </strong>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* RIDER TRACKING */}
          {deliveryMethod === "delivery" && (
            <section className="billing-card rider-tracking-card">
              <div className="billing-card-header">
                <div className="billing-card-title">
                  <Bike size={21} />

                  <div>
                    <h2>Delivery Tracking</h2>

                    <span>Follow your order status</span>
                  </div>
                </div>

                {riderAccepted ? (
                  <span className="tracking-live">
                    <span className="live-dot"></span>
                    Live
                  </span>
                ) : (
                  <span className="tracking-waiting">Finding Rider</span>
                )}
              </div>

              {!riderAccepted ? (
                <div className="rider-searching">
                  <div className="rider-loader">
                    <Bike size={27} />
                  </div>

                  <h3>Finding a rider...</h3>

                  <p>Nearby riders have been notified about your delivery.</p>
                </div>
              ) : (
                <>
                  <div className="rider-profile">
                    <div className="rider-avatar">
                      <User size={25} />
                    </div>

                    <div className="rider-details">
                      <span>YOUR RIDER</span>
                      <h3>{dummyRider.name}</h3>

                      <p>
                        {dummyRider.vehicle} · {dummyRider.vehicleNumber}
                      </p>
                    </div>

                    <a
                      href={`tel:${dummyRider.phone}`}
                      className="rider-call-btn"
                    >
                      <Phone size={17} />
                      Call Rider
                    </a>
                  </div>

                  <div className="tracking-timeline">
                    <div
                      className={`tracking-step ${
                        orderStatus >= 0 ? "active" : ""
                      }`}
                    >
                      <div className="tracking-step-icon">
                        <Check size={16} />
                      </div>

                      <div>
                        <strong>Order Confirmed</strong>

                        <span>Your order has been received</span>
                      </div>
                    </div>

                    <div
                      className={`tracking-step ${
                        orderStatus >= 1 ? "active" : ""
                      }`}
                    >
                      <div className="tracking-step-icon">
                        <Package size={16} />
                      </div>

                      <div>
                        <strong>Preparing Order</strong>

                        <span>Shops are preparing your products</span>
                      </div>
                    </div>

                    <div
                      className={`tracking-step ${
                        orderStatus >= 2 ? "active" : ""
                      }`}
                    >
                      <div className="tracking-step-icon">
                        <Bike size={16} />
                      </div>

                      <div>
                        <strong>On the Way</strong>

                        <span>Rider is delivering your order</span>
                      </div>
                    </div>

                    <div
                      className={`tracking-step ${
                        orderStatus >= 3 ? "active" : ""
                      }`}
                    >
                      <div className="tracking-step-icon">
                        <CheckCircle2 size={16} />
                      </div>

                      <div>
                        <strong>Delivered</strong>

                        <span>Order delivered successfully</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </section>
          )}

          {/* PICKUP STATUS */}
          {deliveryMethod === "pickup" && (
            <section className="pickup-ready-banner">
              <div className="pickup-ready-icon">
                <Store size={26} />
              </div>

              <div>
                <span>Pickup Order</span>

                <h3>Your orders are ready for pickup</h3>

                <p>Please visit each listed shop to collect your products.</p>
              </div>

              <CheckCircle2 size={25} />
            </section>
          )}

          <Link to="/all-shops" className="continue-shopping">
            <ArrowLeft size={17} />
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  // --------------------------------------------------
  // MAIN BILLING PAGE
  // --------------------------------------------------

  return (
    <main className="billing-page">
      <div className="billing-container">
        {/* HEADER */}
        <div className="billing-header">
          <Link to="/all-shops" className="billing-back-link">
            <ArrowLeft size={17} />
            Continue Shopping
          </Link>

          <div className="billing-heading">
            <div className="billing-heading-icon">
              <WalletCards size={24} />
            </div>

            <div>
              <span className="billing-eyebrow">SHOP POINT CHECKOUT</span>

              <h1>Review Your Order</h1>

              <p>
                Your order contains products from{" "}
                <strong>
                  {shopCount} {shopCount === 1 ? "local shop" : "local shops"}
                </strong>
                .
              </p>
            </div>
          </div>
        </div>

        <div className="billing-layout">
          {/* =========================================
              LEFT SIDE
          ========================================= */}

          <div className="billing-main">
            {/* ALL SHOPS */}
            <section className="billing-card">
              <div className="billing-card-header">
                <div className="billing-card-title">
                  <Store size={21} />

                  <div>
                    <h2>Shops in Your Order</h2>

                    <span>
                      {shopCount}{" "}
                      {shopCount === 1 ? "local shop" : "local shops"}
                    </span>
                  </div>
                </div>

                <div className="shop-count-pill">{shopCount}</div>
              </div>

              <div className="shop-groups">
                {shopGroups.map((group, index) => (
                  <div className="shop-order-group" key={group.shop?.id}>
                    {/* SHOP HEADER */}
                    <div className="shop-order-header">
                      <div className="shop-order-number">{index + 1}</div>

                      <div className="shop-order-icon">
                        <Store size={20} />
                      </div>

                      <div className="shop-order-info">
                        <h3>{group.shop?.name || "Local Shop"}</h3>

                        <div>
                          <MapPin size={13} />

                          <span>
                            {group.shop?.location || "Quetta, Balochistan"}
                          </span>
                        </div>
                      </div>

                      <div className="shop-order-total">
                        <span>Shop Total</span>

                        <strong>{formatPrice(group.subtotal)}</strong>
                      </div>
                    </div>

                    {/* PRODUCTS OF THIS SHOP */}
                    <div className="billing-items">
                      {group.items.map((item) => (
                        <div className="billing-item" key={item.id}>
                          {/* IMAGE */}
                          <Link
                            to={`/product/${item.id}`}
                            className="billing-item-image"
                          >
                            <img src={item.image} alt={item.name} />
                          </Link>

                          {/* DETAILS */}
                          <div className="billing-item-details">
                            <Link
                              to={`/product/${item.id}`}
                              className="billing-product-link"
                            >
                              <h3>{item.name}</h3>
                            </Link>

                            <span>{item.unit || "Item"}</span>

                            <p>
                              Qty: <strong>{item.quantity}</strong>
                            </p>
                          </div>

                          {/* PRICE + DELETE */}
                          <div className="billing-item-actions">
                            <div className="billing-item-price">
                              <span>{formatPrice(item.price)}</span>

                              <strong>{formatPrice(item.itemTotal)}</strong>
                            </div>

                            <button
                              type="button"
                              className="delete-item-btn"
                              onClick={() => handleDeleteItem(item.id)}
                              aria-label={`Remove ${item.name} from cart`}
                              title="Remove item"
                            >
                              <Trash2 size={17} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* DELIVERY METHOD */}
            <section className="billing-card">
              <div className="billing-card-header">
                <div className="billing-card-title">
                  <Truck size={21} />

                  <div>
                    <h2>How would you like to receive it?</h2>

                    <span>Choose pickup or delivery</span>
                  </div>
                </div>
              </div>

              <div className="delivery-method-options">
                {/* PICKUP */}
                <button
                  type="button"
                  className={`delivery-method-option ${
                    deliveryMethod === "pickup" ? "selected" : ""
                  }`}
                  onClick={() => setDeliveryMethod("pickup")}
                >
                  <div className="delivery-method-icon">
                    <Store size={22} />
                  </div>

                  <div className="delivery-method-content">
                    <strong>Pickup from Shops</strong>

                    <span>
                      Collect your products from each shop in your order
                    </span>

                    <small>Rs. {PICKUP_FEE_PER_SHOP} per shop</small>
                  </div>

                  <div className="delivery-method-price">
                    {formatPrice(pickupFee)}
                  </div>

                  <div className="delivery-method-radio">
                    {deliveryMethod === "pickup" && <Check size={15} />}
                  </div>
                </button>

                {/* DELIVERY */}
                <button
                  type="button"
                  className={`delivery-method-option ${
                    deliveryMethod === "delivery" ? "selected" : ""
                  }`}
                  onClick={() => setDeliveryMethod("delivery")}
                >
                  <div className="delivery-method-icon">
                    <Bike size={22} />
                  </div>

                  <div className="delivery-method-content">
                    <strong>Home Delivery</strong>

                    <span>Get your order delivered to your location</span>

                    <small>Delivery service</small>
                  </div>

                  <div className="delivery-method-price">
                    {formatPrice(DELIVERY_FEE)}
                  </div>

                  <div className="delivery-method-radio">
                    {deliveryMethod === "delivery" && <Check size={15} />}
                  </div>
                </button>
              </div>

              {/* PICKUP EXPLANATION */}
              {deliveryMethod === "pickup" && (
                <div className="fee-info-box pickup-fee-info">
                  <Store size={18} />

                  <div>
                    <strong>Pickup fee calculation</strong>

                    <p>
                      {shopCount} {shopCount === 1 ? "shop" : "shops"} × Rs. 50
                      = <strong>{formatPrice(pickupFee)}</strong>
                    </p>
                  </div>
                </div>
              )}

              {/* DELIVERY ADDRESS */}
              {deliveryMethod === "delivery" && (
                <div className="delivery-address-box">
                  <div className="address-icon">
                    <Navigation size={18} />
                  </div>

                  <div>
                    <span>Delivery Address</span>

                    <strong>Quetta, Balochistan</strong>

                    <p>
                      Your delivery address will be confirmed during the order
                      process.
                    </p>
                  </div>
                </div>
              )}
            </section>

            {/* SECURITY */}
            <section className="billing-security-card">
              <div className="security-icon">
                <ShieldCheck size={22} />
              </div>

              <div>
                <h3>Safe & Secure Order</h3>

                <p>
                  Review your products, shops and delivery method before
                  confirming your order.
                </p>
              </div>

              <div className="security-badge">Secure</div>
            </section>
          </div>

          {/* =========================================
              RIGHT SIDE SUMMARY
          ========================================= */}

          <aside className="billing-summary">
            <div className="summary-card">
              <div className="summary-header">
                <div>
                  <span>YOUR ORDER</span>
                  <h2>Order Summary</h2>
                </div>

                <div className="summary-bag">
                  <ShoppingBag size={19} />
                </div>
              </div>

              {/* SHOP LIST */}
              <div className="summary-shop-list">
                {shopGroups.map((group) => (
                  <div className="summary-shop" key={group.shop?.id}>
                    <div className="summary-shop-icon">
                      <Store size={14} />
                    </div>

                    <div>
                      <span>{group.shop?.name || "Local Shop"}</span>

                      <small>
                        {group.items.length}{" "}
                        {group.items.length === 1 ? "product" : "products"}
                      </small>
                    </div>

                    <strong>{formatPrice(group.subtotal)}</strong>
                  </div>
                ))}
              </div>

              {/* BREAKDOWN */}
              <div className="summary-breakdown">
                <div className="summary-row">
                  <span>Products</span>

                  <strong>{formatPrice(subtotal)}</strong>
                </div>

                {deliveryMethod === "pickup" ? (
                  <div className="summary-row">
                    <span>
                      Pickup {shopCount > 1 ? `(${shopCount} shops)` : ""}
                    </span>

                    <strong>{formatPrice(pickupFee)}</strong>
                  </div>
                ) : (
                  <div className="summary-row">
                    <span>Delivery</span>

                    <strong>{formatPrice(DELIVERY_FEE)}</strong>
                  </div>
                )}
              </div>

              {/* TOTAL */}
              <div className="summary-total">
                <div>
                  <span>Total</span>

                  <small>
                    {deliveryMethod === "pickup"
                      ? "Pickup from shops"
                      : "Home delivery"}
                  </small>
                </div>

                <strong>{formatPrice(total)}</strong>
              </div>

              {/* CONFIRM */}
              <button
                type="button"
                className="confirm-order-btn"
                onClick={handleConfirmOrder}
                disabled={!orderItems.length}
              >
                <CheckCircle2 size={19} />
                Confirm Order
              </button>

              <div className="secure-checkout">
                <ShieldCheck size={15} />
                Your order is secure
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Billing;
