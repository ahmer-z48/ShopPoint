import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  FileCheck2,
  IdCard,
  ImagePlus,
  Lock,
  Mail,
  MapPin,
  Phone,
  Store,
  Upload,
  User,
} from "lucide-react";
import "./VendorRegister.css";

const categoryGroups = {
  "Food & everyday essentials": [
    "Grocery & Supermarket",
    "General Store",
    "Bakery & Sweets",
    "Restaurant & Café",
    "Fast Food",
    "Catering & Home Food",
    "Fruits & Vegetables",
    "Meat & Poultry",
    "Dairy Products",
    "Beverages",
    "Organic & Specialty Foods",
  ],
  "Health, beauty & care": [
    "Pharmacy & Medical Store",
    "Medical Equipment & Supplies",
    "Cosmetics & Beauty",
    "Salon & Personal Care",
    "Optical & Eyewear",
    "Wellness & Fitness",
  ],
  "Fashion & lifestyle": [
    "Clothing & Fashion",
    "Shoes & Footwear",
    "Jewelry & Accessories",
    "Bags & Luggage",
    "Watches",
    "Tailoring & Fabric",
    "Gifts, Flowers & Party Supplies",
  ],
  "Technology & home": [
    "Electronics",
    "Mobile Phones & Accessories",
    "Computers & IT",
    "Home Appliances",
    "Furniture",
    "Home & Kitchen",
    "Home Decor & Lighting",
    "Photography, Printing & Signage",
  ],
  "Vehicles, trade & industry": [
    "Hardware & Tools",
    "Electrical Supplies",
    "Building Materials",
    "Paint & Sanitary",
    "Auto Parts",
    "Automobiles & Motorcycles",
    "Tyres & Batteries",
    "Agriculture & Farming",
  ],
  "Family, hobbies & services": [
    "Books & Stationery",
    "Sports & Fitness",
    "Toys & Games",
    "Baby Products",
    "Pet Supplies",
    "Travel & Tourism",
    "Professional & Local Services",
    "Other",
  ],
};

const initialForm = {
  ownerName: "",
  dateOfBirth: "",
  cnicNumber: "",
  shopName: "",
  category: "",
  email: "",
  phone: "",
  location: "",
  licenseRequired: "no",
};

const VendorRegister = () => {
  const [formData, setFormData] = useState(initialForm);
  const [files, setFiles] = useState({
    cnicFront: null,
    cnicBack: null,
    shopImage: null,
    license: null,
  });

  const handleChange = ({ target: { name, value } }) => {
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleFileChange = ({ target: { name, files: selectedFiles } }) => {
    setFiles((current) => ({ ...current, [name]: selectedFiles?.[0] ?? null }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Vendor registration draft:", { ...formData, files });
    // Submission and document storage will be connected to the backend later.
  };

  const FileUpload = ({
    name,
    label,
    helper,
    icon: Icon,
    required = false,
    accept = "image/png, image/jpeg, application/pdf",
  }) => (
    <div className="vendor-form-group">
      <label htmlFor={name}>
        {label}{" "}
        {required && (
          <span className="vendor-required" aria-label="required">
            *
          </span>
        )}
      </label>
      <label
        htmlFor={name}
        className={`vendor-upload-box ${files[name] ? "has-file" : ""}`}
      >
        <Icon size={21} />
        <span className="vendor-upload-copy">
          <strong>
            {files[name]?.name ?? `Upload ${label.toLowerCase()}`}
          </strong>
          <small>
            {files[name]
              ? "File selected — choose another to replace it"
              : helper}
          </small>
        </span>
        <Upload size={18} className="vendor-upload-arrow" />
      </label>
      <input
        className="vendor-file-input"
        id={name}
        name={name}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        required={required}
      />
    </div>
  );

  return (
    <div className="vendor-register-page">
      <aside className="vendor-register-info">
        <Link to="/" className="vendor-register-logo">
          <span className="vendor-logo-icon">SP</span>
          <span>Shop Point</span>
        </Link>
        <div className="vendor-info-content">
          <span className="vendor-label">GROW YOUR LOCAL BUSINESS</span>
          <h1>
            Bring your shop <span>online with Shop Point.</span>
          </h1>
          <p>
            Build a trusted local presence, showcase your products, and connect
            with customers nearby.
          </p>
          <div className="vendor-benefits">
            <div className="vendor-benefit">
              <span>01</span>
              <div>
                <strong>Showcase your shop</strong>
                <p>Give your local business an online identity.</p>
              </div>
            </div>
            <div className="vendor-benefit">
              <span>02</span>
              <div>
                <strong>Reach nearby customers</strong>
                <p>Help customers discover your products.</p>
              </div>
            </div>
            <div className="vendor-benefit">
              <span>03</span>
              <div>
                <strong>Verification first</strong>
                <p>Keep the marketplace safe and trustworthy.</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <main className="vendor-register-form-side">
        <div className="vendor-register-container">
          <Link to="/" className="vendor-mobile-logo">
            <span className="vendor-logo-icon">SP</span>
            <span>Shop Point</span>
          </Link>
          <div className="vendor-heading">
            <span>VENDOR REGISTRATION</span>
            <h2>Register your shop</h2>
            <p>
              Fields marked <b>*</b> are required. Your documents are used for
              verification only.
            </p>
          </div>

          <form className="vendor-form" onSubmit={handleSubmit}>
            <section className="vendor-form-section">
              <div className="vendor-section-title">
                <User size={18} />
                <div>
                  <h3>Owner verification</h3>
                  <p>Tell us who will manage this shop.</p>
                </div>
              </div>
              <div className="vendor-form-row">
                <div className="vendor-form-group">
                  <label htmlFor="ownerName">
                    Full name <span className="vendor-required">*</span>
                  </label>
                  <div className="vendor-input-wrapper">
                    <User size={18} />
                    <input
                      id="ownerName"
                      name="ownerName"
                      type="text"
                      placeholder="Your full name"
                      value={formData.ownerName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="vendor-form-group">
                  <label htmlFor="dateOfBirth">
                    Date of birth <span className="vendor-required">*</span>
                  </label>
                  <div className="vendor-input-wrapper">
                    <CalendarDays size={18} />
                    <input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="vendor-form-group">
                <label htmlFor="cnicNumber">
                  CNIC number <span className="vendor-required">*</span>
                </label>
                <div className="vendor-input-wrapper">
                  <IdCard size={18} />
                  <input
                    id="cnicNumber"
                    name="cnicNumber"
                    type="text"
                    inputMode="numeric"
                    placeholder="12345-1234567-1"
                    value={formData.cnicNumber}
                    onChange={handleChange}
                    pattern="[0-9]{5}-[0-9]{7}-[0-9]"
                    title="Use the format 12345-1234567-1"
                    required
                  />
                </div>
                <small className="vendor-field-help">
                  Use the format 12345-1234567-1.
                </small>
              </div>
              <div className="vendor-form-row">
                <FileUpload
                  name="cnicFront"
                  label="CNIC front image"
                  helper="JPG or PNG, clear and readable"
                  icon={IdCard}
                  required
                  accept="image/png, image/jpeg"
                />
                <FileUpload
                  name="cnicBack"
                  label="CNIC back image"
                  helper="JPG or PNG, clear and readable"
                  icon={IdCard}
                  required
                  accept="image/png, image/jpeg"
                />
              </div>
            </section>

            <section className="vendor-form-section">
              <div className="vendor-section-title">
                <Store size={18} />
                <div>
                  <h3>Shop details</h3>
                  <p>Help customers find the right local business.</p>
                </div>
              </div>
              <div className="vendor-form-row">
                <div className="vendor-form-group">
                  <label htmlFor="shopName">
                    Business / shop name{" "}
                    <span className="vendor-required">*</span>
                  </label>
                  <div className="vendor-input-wrapper">
                    <Store size={18} />
                    <input
                      id="shopName"
                      name="shopName"
                      type="text"
                      placeholder="Your business name"
                      value={formData.shopName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="vendor-form-group">
                  <label htmlFor="category">
                    Shop category <span className="vendor-required">*</span>
                  </label>
                  <div className="vendor-input-wrapper">
                    <Store size={18} />
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a category</option>
                      {Object.entries(categoryGroups).map(
                        ([group, categories]) => (
                          <optgroup key={group} label={group}>
                            {categories.map((category) => (
                              <option key={category} value={category}>
                                {category}
                              </option>
                            ))}
                          </optgroup>
                        ),
                      )}
                    </select>
                  </div>
                </div>
              </div>
              <div className="vendor-form-row">
                <div className="vendor-form-group">
                  <label htmlFor="email">
                    Email address <span className="vendor-required">*</span>
                  </label>
                  <div className="vendor-input-wrapper">
                    <Mail size={18} />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="vendor-form-group">
                  <label htmlFor="phone">
                    Phone number <span className="vendor-required">*</span>
                  </label>
                  <div className="vendor-input-wrapper">
                    <Phone size={18} />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="03XX-XXXXXXX"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="vendor-form-group">
                <label htmlFor="location">
                  Shop location <span className="vendor-required">*</span>
                </label>
                <div className="vendor-input-wrapper">
                  <MapPin size={18} />
                  <input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="e.g. Jinnah Road, Quetta"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <FileUpload
                name="shopImage"
                label="Shop photo"
                helper="JPG or PNG — show the shop front or interior"
                icon={ImagePlus}
                required
                accept="image/png, image/jpeg"
              />
            </section>

            <section className="vendor-form-section">
              <div className="vendor-section-title">
                <FileCheck2 size={18} />
                <div>
                  <h3>License information</h3>
                  <p>
                    Only needed for a business that legally requires a license.
                  </p>
                </div>
              </div>
              <fieldset className="vendor-license-choice">
                <legend>
                  Does your business require a license?{" "}
                  <span className="vendor-required">*</span>
                </legend>
                <label>
                  <input
                    type="radio"
                    name="licenseRequired"
                    value="no"
                    checked={formData.licenseRequired === "no"}
                    onChange={handleChange}
                  />{" "}
                  No, a license is not required
                </label>
                <label>
                  <input
                    type="radio"
                    name="licenseRequired"
                    value="yes"
                    checked={formData.licenseRequired === "yes"}
                    onChange={handleChange}
                  />{" "}
                  Yes, I will provide a license
                </label>
              </fieldset>
              {formData.licenseRequired === "yes" && (
                <FileUpload
                  name="license"
                  label="Business license"
                  helper="PDF, JPG or PNG"
                  icon={FileCheck2}
                  required
                />
              )}
              {formData.licenseRequired === "no" && (
                <p className="vendor-optional-note">
                  License upload is optional and is not required for this
                  registration.
                </p>
              )}
            </section>

            <button type="submit" className="vendor-submit-btn">
              Submit for verification <ArrowRight size={18} />
            </button>
          </form>
          <div className="vendor-login-link">
            <span>Already have a Shop Point account?</span>
            <Link to="/login">Sign in</Link>
          </div>
          <div className="vendor-other-option">
            Want to deliver orders instead?{" "}
            <Link to="/rider/register">Register as a Rider</Link>
          </div>
          <Link to="/" className="vendor-back-home">
            ← Back to Shop Point
          </Link>
        </div>
      </main>
    </div>
  );
};

export default VendorRegister;
