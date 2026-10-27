
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
  Trash2,
  Truck,
  User,
  WalletCards,
  Navigation,
  AlertCircle,
} from "lucide-react";

import products from "../../components/data/product";
import shops from "../../components/data/Shops";
import "./Billing.css";

const DELIVERY_FEE = 150;
const PICKUP_FEE_PER_SHOP = 0;

const formatPrice = (price) =>
  `Rs. ${Number(price || 0).toLocaleString("en-PK")}`;

const readStorage = (key, fallback) => {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "null");
    return value ?? fallback;
  } catch {
    return fallback;
  }
};

const Billing = () => {
  const [deliveryMethod, setDeliveryMethod] = useState("pickup");
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [riderAccepted, setRiderAccepted] = useState(false);
  const [orderStatus, setOrderStatus] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [placedOrder, setPlacedOrder] = useState(null);

  const [cart, setCart] = useState(() => {
    const savedCart = readStorage("shopPointCart", []);
    return Array.isArray(savedCart) ? savedCart : [];
  });

  const dummyRider = {
    name: "Bilal Ahmed",
    vehicle: "Honda CD 70",
    vehicleNumber: "QTA-4587",
    phone: "0300-1234567",
  };

  // Match cart product IDs with the central product data.
  const orderItems = useMemo(() => {
    return cart
      .map((cartItem) => {
        const product = products.find(
          (item) => String(item.id) === String(cartItem.productId)
        );

        if (!product) return null;

        const quantity = Math.max(1, Number(cartItem.quantity) || 1);
        const shop = shops.find(
          (item) => String(item.id) === String(product.shopId)
        );

        return {
          ...product,
          quantity,
          shop: shop || null,
          itemTotal: Number(product.price || 0) * quantity,
        };
      })
      .filter(Boolean);
  }, [cart]);

  // Group products so customers can review each shop separately.
  const shopGroups = useMemo(() => {
    const groups = new Map();

    orderItems.forEach((item) => {
      const key = String(item.shop?.id ?? item.shopId ?? "local-shop");

      if (!groups.has(key)) {
        groups.set(key, {
          shop: item.shop,
          items: [],
          subtotal: 0,
        });
      }

      const group = groups.get(key);
      group.items.push(item);
      group.subtotal += item.itemTotal;
    });

    return Array.from(groups.values());
  }, [orderItems]);

  const shopCount = shopGroups.length;
  const itemCount = orderItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.itemTotal,
    0
  );
  const pickupFee =
    deliveryMethod === "pickup" ? shopCount * PICKUP_FEE_PER_SHOP : 0;
  const deliveryFee = deliveryMethod === "delivery" ? DELIVERY_FEE : 0;
  const total = subtotal + pickupFee + deliveryFee;

  // Keep the active order and order history in sync.
  const saveOrderUpdate = (updatedOrder) => {
    try {
      localStorage.setItem(
        "shopPointCurrentOrder",
        JSON.stringify(updatedOrder)
      );

      const savedOrders = readStorage("shopPointOrders", []);
      const safeOrders = Array.isArray(savedOrders) ? savedOrders : [];
      const exists = safeOrders.some(
        (order) => order.id === updatedOrder.id
      );

      const updatedOrders = exists
        ? safeOrders.map((order) =>
            order.id === updatedOrder.id ? updatedOrder : order
          )
        : [updatedOrder, ...safeOrders];

      localStorage.setItem(
        "shopPointOrders",
        JSON.stringify(updatedOrders)
      );

      setPlacedOrder(updatedOrder);
    } catch (error) {
      console.error("Could not update Shop Point order:", error);
    }
  };

  const handleDeleteItem = (productId) => {
    const updatedCart = cart.filter(
      (item) => String(item.productId) !== String(productId)
    );

    setCart(updatedCart);
    setErrorMessage("");

    try {
      localStorage.setItem("shopPointCart", JSON.stringify(updatedCart));
    } catch (error) {
      console.error("Could not update cart:", error);
      setErrorMessage("We couldn't update your cart. Please try again.");
    }
  };

  // Validate, save, and only then show the confirmation screen.
  const handleConfirmOrder = () => {
    if (isSubmitting) return;

    setErrorMessage("");

    if (cart.length === 0 || orderItems.length === 0) {
      setErrorMessage(
        "Your cart has no valid products. Please return to the shops and add products again."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const order = {
        id: `SP-${Date.now().toString().slice(-6)}`,
        items: orderItems,
        shops: shopGroups.map((group) => ({
          shopId: group.shop?.id,
          shopName: group.shop?.name || "Local Shop",
          location: group.shop?.location || "Quetta, Balochistan",
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

      // Save the history first. If storage fails, don't show false success.
const savedOrders = readStorage("shopPointOrders", []);
const safeOrders = Array.isArray(savedOrders) ? savedOrders : [];

const updatedOrders = [
  order,
  ...safeOrders.filter((existing) => existing.id !== order.id),
];

localStorage.setItem(
  "shopPointOrders",
  JSON.stringify(updatedOrders)
);

localStorage.setItem(
  "shopPointCurrentOrder",
  JSON.stringify(order)
);

setPlacedOrder(order);
setOrderConfirmed(true);
localStorage.removeItem("shopPointCart");} catch (error) {
      console.error("Could not place Shop Point order:", error);
      setErrorMessage(
        "Your order couldn't be saved. Please try again. Your cart has not been cleared."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Demo delivery progression. Each stage is saved to order history too.
  useEffect(() => {
    if (!orderConfirmed || deliveryMethod !== "delivery" || !placedOrder) {
      return undefined;
    }

    const updateStatus = (status, index, accepted = riderAccepted) => {
      setOrderStatus(index);
      setRiderAccepted(accepted);

      saveOrderUpdate({
        ...placedOrder,
        status,
      });
    };

    const riderTimer = setTimeout(() => {
      setRiderAccepted(true);
    }, 3000);

    const preparedTimer = setTimeout(() => {
      updateStatus("Order Prepared", 1, true);
    }, 6000);

    const onWayTimer = setTimeout(() => {
      updateStatus("Rider Took Your Order", 2, true);
    }, 10000);

    const deliveredTimer = setTimeout(() => {
      updateStatus("Delivered", 3, true);
    }, 16000);

    return () => {
      clearTimeout(riderTimer);
      clearTimeout(preparedTimer);
      clearTimeout(onWayTimer);
      clearTimeout(deliveredTimer);
    };
    // The order is set once per checkout; timers progress from that order.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderConfirmed, deliveryMethod, placedOrder?.id]);

  const trackingSteps = [
    {
      title: "Order Confirmed",
      description: "Your order has been received",
      icon: Check,
    },
    {
      title: "Preparing Order",
      description: "The shops are preparing your products",
      icon: Package,
    },
    {
      title: "On the Way",
      description: "Your rider is delivering your order",
      icon: Bike,
    },
    {
      title: "Delivered",
      description: "Your order has been delivered",
      icon: CheckCircle2,
    },
  ];

  // Empty cart screen.
  if (!orderItems.length && !orderConfirmed) {
    return (
      <main className="billing-page">
        <div className="billing-empty">
          <div className="billing-empty-icon">
            <ShoppingBag size={38} />
          </div>
          <span className="billing-eyebrow">SHOP POINT CHECKOUT</span>
          <h1>Your cart is empty</h1>
          <p>
            Find products from local shops and add them to your cart before
            checking out.
          </p>
          <Link to="/all-shops" className="billing-primary-btn">
            Explore Local Shops
          </Link>
        </div>
      </main>
    );
  }

  // Order confirmation screen.
  if (orderConfirmed) {
    const currentStatus =
      placedOrder?.status || "Order Confirmed";

    return (
      <main className="billing-page">
        <div className="billing-container billing-confirmation">
          <section className="success-banner">
            <div className="success-banner-icon">
              <CheckCircle2 size={32} />
            </div>
            <div className="success-banner-copy">
              <span className="success-label">ORDER SUCCESSFULLY PLACED</span>
              <h1>Thank you for your order!</h1>
              <p>
                Your order <strong>{placedOrder?.id}</strong> has been
                recorded. We've sent it to {shopCount}{" "}
                {shopCount === 1 ? "local shop" : "local shops"}.
              </p>
            </div>
            <span className="success-check">
              <Check size={20} />
            </span>
          </section>

          <div className="confirmation-grid">
            <div className="billing-main">
              <section className="billing-card">
                <div className="billing-card-header">
                  <div className="billing-card-title">
                    <Package size={21} />
                    <div>
                      <h2>Order Summary</h2>
                      <span>
                        Order {placedOrder?.id} · {itemCount}{" "}
                        {itemCount === 1 ? "item" : "items"}
                      </span>
                    </div>
                  </div>
                  <span className="confirmed-badge">
                    <Check size={14} /> Confirmed
                  </span>
                </div>

                <div className="confirmed-shops">
                  {shopGroups.map((group, index) => (
                    <div className="confirmed-shop" key={index}>
                      <div className="confirmed-shop-icon">
                        <Store size={19} />
                      </div>
                      <div className="confirmed-shop-info">
                        <strong>{group.shop?.name || "Local Shop"}</strong>
                        <span>
                          <MapPin size={13} />
                          {group.shop?.location || "Quetta, Balochistan"}
                        </span>
                      </div>
                      <strong className="confirmed-shop-total">
                        {formatPrice(group.subtotal)}
                      </strong>
                    </div>
                  ))}
                </div>

                <div className="billing-items confirmed-items">
                  {orderItems.map((item) => (
                    <div className="billing-item" key={item.id}>
                      <div className="billing-item-image">
                        {item.image ? (
                          <img src={item.image} alt={item.name} />
                        ) : (
                          <Package size={24} />
                        )}
                      </div>
                      <div className="billing-item-details">
                        <h3>{item.name}</h3>
                        <span>{item.shop?.name || "Local Shop"}</span>
                        <p>Quantity: {item.quantity}</p>
                      </div>
                      <div className="billing-item-price">
                        <span>{formatPrice(item.price)}</span>
                        <strong>{formatPrice(item.itemTotal)}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

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
                          ? "Delivery Details"
                          : "Pickup Details"}
                      </h2>
                      <span>
                        {deliveryMethod === "delivery"
                          ? "Your order is on its way through our demo flow"
                          : "Collect your products from the listed shops"}
                      </span>
                    </div>
                  </div>
                </div>

                {deliveryMethod === "pickup" ? (
                  <div className="pickup-shops">
                    {shopGroups.map((group, index) => (
                      <div className="pickup-shop-card" key={index}>
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
                            {group.items.length === 1 ? "product" : "products"}{" "}
                            · Pickup fee {formatPrice(0)}
                          </p>
                        </div>
                        <span className="pickup-shop-status">
                          <CheckCircle2 size={16} /> Pickup selected
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="delivery-info-grid">
                    <div className="delivery-info-box">
                      <MapPin size={19} />
                      <div>
                        <span>Delivery Area</span>
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

              {deliveryMethod === "delivery" && (
                <section className="billing-card rider-tracking-card">
                  <div className="billing-card-header">
                    <div className="billing-card-title">
                      <Bike size={21} />
                      <div>
                        <h2>Delivery Tracking</h2>
                        <span>Demo order status</span>
                      </div>
                    </div>
                    <span
                      className={
                        riderAccepted ? "tracking-live" : "tracking-waiting"
                      }
                    >
                      <span className="live-dot" />
                      {riderAccepted ? "Rider assigned" : "Finding rider"}
                    </span>
                  </div>

                  {!riderAccepted ? (
                    <div className="rider-searching">
                      <div className="rider-loader">
                        <Bike size={26} />
                      </div>
                      <h3>Finding a rider...</h3>
                      <p>
                        Nearby riders have been notified about your delivery.
                      </p>
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
                          <Phone size={16} /> Call Rider
                        </a>
                      </div>

                      <div className="tracking-timeline">
                        {trackingSteps.map((step, index) => {
                          const StepIcon = step.icon;
                          const active = index <= orderStatus;

                          return (
                            <div
                              className={`tracking-step ${active ? "active" : ""}`}
                              key={step.title}
                            >
                              <div className="tracking-step-icon">
                                <StepIcon size={16} />
                              </div>
                              <div>
                                <strong>{step.title}</strong>
                                <span>{step.description}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <p className="tracking-current-status">
                        Current status: <strong>{currentStatus}</strong>
                      </p>
                    </>
                  )}
                </section>
              )}
            </div>

            <aside className="billing-summary">
              <div className="summary-card">
                <div className="summary-header">
                  <div>
                    <span>ORDER CONFIRMATION</span>
                    <h2>Payment Summary</h2>
                  </div>
                  <div className="summary-bag">
                    <WalletCards size={20} />
                  </div>
                </div>

                <div className="summary-breakdown">
                  <div className="summary-row">
                    <span>Products ({itemCount})</span>
                    <strong>{formatPrice(subtotal)}</strong>
                  </div>
                  <div className="summary-row">
                    <span>
                      {deliveryMethod === "pickup" ? "Pickup" : "Delivery"}
                    </span>
                    <strong>
                      {formatPrice(deliveryMethod === "pickup" ? 0 : DELIVERY_FEE)}
                    </strong>
                  </div>
                </div>

                <div className="summary-total">
                  <div>
                    <span>Total paid</span>
                    <small>Order {placedOrder?.id}</small>
                  </div>
                  <strong>{formatPrice(placedOrder?.total ?? total)}</strong>
                </div>

                <div className="secure-checkout">
                  <ShieldCheck size={16} />
                  Order saved successfully
                </div>
                <Link to="/account/orders" className="confirm-order-btn">
                  <Package size={18} /> View My Orders
                </Link>
                <Link to="/all-shops" className="continue-shopping">
                  <ArrowLeft size={16} /> Continue Shopping
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>
    );
  }

  // Main checkout screen.
  return (
    <main className="billing-page">
      <div className="billing-container">
        <header className="billing-header">
          <Link to="/all-shops" className="billing-back-link">
            <ArrowLeft size={17} /> Continue Shopping
          </Link>

          <div className="billing-heading">
            <div className="billing-heading-icon">
              <WalletCards size={25} />
            </div>
            <div>
              <span className="billing-eyebrow">SHOP POINT CHECKOUT</span>
              <h1>Review your order</h1>
              <p>
                You have {itemCount} {itemCount === 1 ? "item" : "items"} from{" "}
                {shopCount} {shopCount === 1 ? "local shop" : "local shops"}.
              </p>
            </div>
          </div>

          <div className="checkout-steps">
            <div className="checkout-step completed">
              <span><Check size={14} /></span> Cart
            </div>
            <div className="checkout-step-line" />
            <div className="checkout-step current">
              <span>2</span> Checkout
            </div>
            <div className="checkout-step-line" />
            <div className="checkout-step">
              <span>3</span> Confirmation
            </div>
          </div>
        </header>

        {errorMessage && (
          <div className="billing-error" role="alert">
            <AlertCircle size={19} />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="billing-layout">
          <div className="billing-main">
            <section className="billing-card">
              <div className="billing-card-header">
                <div className="billing-card-title">
                  <Store size={21} />
                  <div>
                    <h2>Products from local shops</h2>
                    <span>
                      Review the items and quantities before confirming.
                    </span>
                  </div>
                </div>
                <span className="shop-count-pill">{shopCount}</span>
              </div>

              <div className="shop-groups">
                {shopGroups.map((group, index) => (
                  <div className="shop-order-group" key={index}>
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
                        <span>Shop subtotal</span>
                        <strong>{formatPrice(group.subtotal)}</strong>
                      </div>
                    </div>

                    <div className="billing-items">
                      {group.items.map((item) => (
                        <div className="billing-item" key={item.id}>
                          <Link
                            to={`/product/${item.id}`}
                            className="billing-item-image"
                          >
                            {item.image ? (
                              <img src={item.image} alt={item.name} />
                            ) : (
                              <Package size={24} />
                            )}
                          </Link>

                          <div className="billing-item-details">
                            <Link
                              to={`/product/${item.id}`}
                              className="billing-product-link"
                            >
                              <h3>{item.name}</h3>
                            </Link>
                            <span>{item.unit || "Local product"}</span>
                            <p>
                              Qty: <strong>{item.quantity}</strong>
                            </p>
                          </div>

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

            <section className="billing-card">
              <div className="billing-card-header">
                <div className="billing-card-title">
                  <Truck size={21} />
                  <div>
                    <h2>How would you like to receive your order?</h2>
                    <span>Choose one delivery method.</span>
                  </div>
                </div>
              </div>

              <div className="delivery-method-options">
                <button
                  type="button"
                  className={`delivery-method-option ${deliveryMethod === "pickup" ? "selected" : ""}`}
                  onClick={() => setDeliveryMethod("pickup")}
                  aria-pressed={deliveryMethod === "pickup"}
                >
                  <div className="delivery-method-icon">
                    <Store size={22} />
                  </div>
                  <div className="delivery-method-content">
                    <strong>Pickup from shops</strong>
                    <span>Visit each shop and collect your products.</span>
                    <small>Free pickup</small>
                  </div>
                  <div className="delivery-method-price">{formatPrice(0)}</div>
                  <div className="delivery-method-radio">
                    {deliveryMethod === "pickup" && <Check size={15} />}
                  </div>
                </button>

                <button
                  type="button"
                  className={`delivery-method-option ${deliveryMethod === "delivery" ? "selected" : ""}`}
                  onClick={() => setDeliveryMethod("delivery")}
                  aria-pressed={deliveryMethod === "delivery"}
                >
                  <div className="delivery-method-icon">
                    <Bike size={22} />
                  </div>
                  <div className="delivery-method-content">
                    <strong>Home delivery</strong>
                    <span>Receive your products at your location.</span>
                    <small>Flat delivery fee</small>
                  </div>
                  <div className="delivery-method-price">
                    {formatPrice(DELIVERY_FEE)}
                  </div>
                  <div className="delivery-method-radio">
                    {deliveryMethod === "delivery" && <Check size={15} />}
                  </div>
                </button>
              </div>

              {deliveryMethod === "pickup" ? (
                <div className="delivery-address-box pickup-fee-info">
                  <Store size={19} />
                  <div>
                    <strong>Pickup is free</strong>
                    <p>
                      You'll collect your products from {shopCount}{" "}
                      {shopCount === 1 ? "shop" : "shops"}. No pickup fee will
                      be added.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="delivery-address-box">
                  <div className="address-icon">
                    <Navigation size={19} />
                  </div>
                  <div>
                    <strong>Delivery area</strong>
                    <p>
                      Quetta, Balochistan · Estimated delivery: 30–45 minutes.
                      This is a frontend demo address.
                    </p>
                  </div>
                </div>
              )}
            </section>

            <section className="billing-security-card">
              <div className="security-icon">
                <ShieldCheck size={23} />
              </div>
              <div>
                <h3>Review before confirming</h3>
                <p>
                  Check your products, quantities and delivery method. This
                  demo checkout saves your order in your browser.
                </p>
              </div>
              <span className="security-badge">Demo checkout</span>
            </section>
          </div>

          <aside className="billing-summary">
            <div className="summary-card">
              <div className="summary-header">
                <div>
                  <span>YOUR CART</span>
                  <h2>Order summary</h2>
                </div>
                <div className="summary-bag">
                  <ShoppingBag size={20} />
                </div>
              </div>

              <div className="summary-item-count">
                <ShoppingBag size={16} />
                <span>{itemCount} items from {shopCount} shops</span>
              </div>

              <div className="summary-shop-list">
                {shopGroups.map((group, index) => (
                  <div className="summary-shop" key={index}>
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

              <div className="summary-breakdown">
                <div className="summary-row">
                  <span>Products subtotal</span>
                  <strong>{formatPrice(subtotal)}</strong>
                </div>
                <div className="summary-row">
                  <span>{deliveryMethod === "pickup" ? "Pickup fee" : "Delivery fee"}</span>
                  <strong>
                    {formatPrice(deliveryMethod === "pickup" ? pickupFee : deliveryFee)}
                  </strong>
                </div>
              </div>

              <div className="summary-total">
                <div>
                  <span>Total</span>
                  <small>
                    {deliveryMethod === "pickup" ? "Pickup from shops" : "Home delivery"}
                  </small>
                </div>
                <strong>{formatPrice(total)}</strong>
              </div>

              <button
                type="button"
                className="confirm-order-btn"
                onClick={handleConfirmOrder}
                disabled={isSubmitting || !orderItems.length}
              >
                {isSubmitting ? (
                  <>
                    <span className="billing-button-spinner" />
                    Saving your order...
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={19} />
                    Confirm Order · {formatPrice(total)}
                  </>
                )}
              </button>

              <div className="secure-checkout">
                <ShieldCheck size={16} />
                Your order is saved locally for this demo.
              </div>

              <Link to="/all-shops" className="summary-back-link">
                <ArrowLeft size={15} /> Continue shopping
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Billing;
