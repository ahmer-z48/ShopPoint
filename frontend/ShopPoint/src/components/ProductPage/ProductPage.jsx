import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Minus,
  Package,
  Plus,
  ShoppingBag,
  Store,
  Tag,
} from "lucide-react";

import products from "../../components/data/product";
import shops from "../../components/data/Shops";
import "./ProductPage.css";

const formatPrice = (price) =>
  `Rs. ${Number(price).toLocaleString("en-PK")}`;

const getPurchaseType = (product, shop) => {
  if (product.purchaseType) return product.purchaseType;

  const text =
    `${product.category || ""} ${shop?.category || ""}`.toLowerCase();

  return /automobile|motorcycle|car showroom|real estate|property/.test(text)
    ? "appointment"
    : "cart";
};

const ProductPage = () => {
  const { id } = useParams();

  // Navigation hook must be inside the component
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);

  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [appointmentBooked, setAppointmentBooked] = useState(false);

  const product = useMemo(
    () => products.find((item) => item.id === id),
    [id]
  );

  const shop = useMemo(
    () => shops.find((item) => item.id === product?.shopId),
    [product]
  );

  // Product not found
  if (!product) {
    return (
      <main className="product-not-found">
        <Package size={42} />

        <h1>Product not found</h1>

        <p>This product may no longer be available.</p>

        <Link to="/all-shops">
          Browse all shops
        </Link>
      </main>
    );
  }

  const purchaseType = getPurchaseType(product, shop);

  const description =
    product.description ??
    `${product.name} is available from ${
      shop?.name ?? "a local Shop Point shop"
    }. Check the product details below and choose the right option for you.`;

  // Add product to cart and go to Billing page
  const handleAddToCart = () => {
    const cart = JSON.parse(
      localStorage.getItem("shopPointCart") || "[]"
    );

    const existing = cart.find(
      (item) => item.productId === product.id
    );

    const nextCart = existing
      ? cart.map((item) =>
          item.productId === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        )
      : [
          ...cart,
          {
            productId: product.id,
            quantity,
          },
        ];

    localStorage.setItem(
      "shopPointCart",
      JSON.stringify(nextCart)
    );

    // Go to Billing page
    navigate("/billing");
  };

  // Appointment booking
  const handleAppointment = (event) => {
    event.preventDefault();

    const appointments = JSON.parse(
      localStorage.getItem("shopPointAppointments") || "[]"
    );

    localStorage.setItem(
      "shopPointAppointments",
      JSON.stringify([
        ...appointments,
        {
          productId: product.id,
          shopId: product.shopId,
          date: appointmentDate,
          time: appointmentTime,
        },
      ])
    );

    setAppointmentBooked(true);
  };

  return (
    <main className="product-page">
      <div className="product-page-container">

        {/* Back to shop */}
        <Link
          to={shop ? `/shop/${shop.id}` : "/all-shops"}
          className="product-back-link"
        >
          <ArrowLeft size={17} />
          Back to shop
        </Link>

        <div className="product-layout">

          {/* Product Image */}
          <section className="product-image-panel">
            <div className="product-image-wrap">
              <img
                src={product.image}
                alt={product.name}
              />

              <span>{product.category}</span>
            </div>
          </section>

          {/* Product Information */}
          <section className="product-summary">

            {/* Shop */}
            {shop && (
              <Link
                to={`/shop/${shop.id}`}
                className="product-shop-link"
              >
                <Store size={16} />
                {shop.name}
              </Link>
            )}

            {/* Product Name */}
            <h1>{product.name}</h1>

            {/* Price */}
            {product.price && (
              <p className="product-price">
                {formatPrice(product.price)}
                <small>/{product.unit}</small>
              </p>
            )}

            {/* Description */}
            <p className="product-description">
              {description}
            </p>

            {/* Appointment Product */}
            {purchaseType === "appointment" ? (
              <form
                className="product-appointment-form"
                onSubmit={handleAppointment}
              >
                <div className="appointment-heading">
                  <CalendarDays size={19} />

                  <div>
                    <strong>
                      See this item in person
                    </strong>

                    <small>
                      Choose a preferred time with{" "}
                      {shop?.name ?? "the showroom"}.
                    </small>
                  </div>
                </div>

                <div className="appointment-fields">

                  <label>
                    Preferred date

                    <input
                      type="date"
                      value={appointmentDate}
                      onChange={(event) =>
                        setAppointmentDate(event.target.value)
                      }
                      min={new Date()
                        .toISOString()
                        .slice(0, 10)}
                      required
                    />
                  </label>

                  <label>
                    Preferred time

                    <input
                      type="time"
                      value={appointmentTime}
                      onChange={(event) =>
                        setAppointmentTime(event.target.value)
                      }
                      required
                    />
                  </label>

                </div>

                <button
                  type="submit"
                  className={`product-add-button ${
                    appointmentBooked ? "is-added" : ""
                  }`}
                >
                  {appointmentBooked ? (
                    <>
                      <Check size={19} />
                      Appointment requested
                    </>
                  ) : (
                    <>
                      <CalendarDays size={19} />
                      Book an appointment
                    </>
                  )}
                </button>

                {appointmentBooked && (
                  <p className="product-added-message">
                    Your request has been saved. The showroom
                    will confirm it later.
                  </p>
                )}
              </form>
            ) : (

              /* Normal Cart Product */
              <>
                <div className="product-quantity-row">

                  <span>Quantity</span>

                  <div className="product-quantity-control">

                    <button
                      type="button"
                      onClick={() =>
                        setQuantity((value) =>
                          Math.max(1, value - 1)
                        )
                      }
                      disabled={quantity === 1}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={17} />
                    </button>

                    <output aria-live="polite">
                      {quantity}
                    </output>

                    <button
                      type="button"
                      onClick={() =>
                        setQuantity((value) => value + 1)
                      }
                      aria-label="Increase quantity"
                    >
                      <Plus size={17} />
                    </button>

                  </div>
                </div>

                {/* Add to Cart */}
                <button
                  type="button"
                  className="product-add-button"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag size={19} />

                  Add {quantity} to cart ·{" "}
                  {formatPrice(product.price * quantity)}
                </button>
              </>
            )}

          </section>
        </div>

        {/* Product Details */}
        <section className="product-details-section">

          {/* Category */}
          <div>
            <span className="product-detail-icon">
              <Tag size={18} />
            </span>

            <div>
              <small>Category</small>

              <strong>
                {product.category}
              </strong>
            </div>
          </div>

          {/* Unit / Purchase Type */}
          <div>
            <span className="product-detail-icon">
              <Package size={18} />
            </span>

            <div>
              <small>
                {purchaseType === "appointment"
                  ? "Purchase option"
                  : "Sold as"}
              </small>

              <strong>
                {purchaseType === "appointment"
                  ? "Appointment required"
                  : product.unit ?? "Single item"}
              </strong>
            </div>
          </div>

          {/* Shop */}
          <div>
            <span className="product-detail-icon">
              <Store size={18} />
            </span>

            <div>
              <small>Sold by</small>

              <strong>
                {shop?.name ?? "Shop Point vendor"}
              </strong>
            </div>
          </div>

        </section>

        {/* Product Information */}
        <section className="product-information">

          <h2>Product details</h2>

          <p>{description}</p>

          <p>
            Images, availability, and final pricing will be
            confirmed by the shop when your order is placed.
          </p>

        </section>

      </div>
    </main>
  );
};

export default ProductPage;