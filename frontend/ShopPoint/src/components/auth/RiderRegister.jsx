import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bike,
  CalendarDays,
  CarFront,
  FileCheck2,
  IdCard,
  ImagePlus,
  Lock,
  Mail,
  MapPin,
  Phone,
  Upload,
  User,
} from "lucide-react";
import "./RiderRegister.css";

const pakistaniCities = [
  "Abbottabad", "Bahawalpur", "Chiniot", "Dera Ghazi Khan", "Faisalabad", "Gilgit",
  "Gujranwala", "Gujrat", "Hyderabad", "Islamabad", "Jhang", "Karachi", "Kasur",
  "Khuzdar", "Lahore", "Larkana", "Mardan", "Mingora", "Mirpur Khas", "Multan",
  "Muzaffarabad", "Nawabshah", "Peshawar", "Quetta", "Rahim Yar Khan", "Rawalpindi",
  "Sahiwal", "Sargodha", "Sialkot", "Sukkur", "Turbat", "Wah Cantt", "Zhob",
];

const RiderRegister = () => {
  const [formData, setFormData] = useState({
    name: "", dateOfBirth: "", cnicNumber: "", email: "", phone: "",
    vehicleType: "", vehicleNumber: "", location: "", password: "", confirmPassword: "",
  });
  const [files, setFiles] = useState({ cnicFront: null, cnicBack: null, vehiclePhoto: null, drivingLicense: null });
  const [error, setError] = useState("");

  const handleChange = ({ target: { name, value } }) => {
    setFormData((current) => ({ ...current, [name]: value }));
    setError("");
  };
  const handleFileChange = ({ target: { name, files: selectedFiles } }) => setFiles((current) => ({ ...current, [name]: selectedFiles?.[0] ?? null }));
  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match. Please check them and try again.");
      return;
    }
    console.log("Rider registration draft:", { ...formData, files });
    // Submission and document storage will be connected to the backend later.
  };
  const FileUpload = ({ name, label, helper, icon: Icon }) => (
    <div className="rider-form-group">
      <label htmlFor={name}>{label} <span className="rider-required">*</span></label>
      <label htmlFor={name} className={`rider-upload-box ${files[name] ? "has-file" : ""}`}>
        <Icon size={21} />
        <span className="rider-upload-copy"><strong>{files[name]?.name ?? `Upload ${label.toLowerCase()}`}</strong><small>{files[name] ? "File selected — choose another to replace it" : helper}</small></span>
        <Upload size={18} className="rider-upload-arrow" />
      </label>
      <input className="rider-file-input" id={name} name={name} type="file" accept="image/png, image/jpeg" onChange={handleFileChange} required />
    </div>
  );

  return <div className="rider-register-page">
    <aside className="rider-register-info">
      <Link to="/" className="rider-register-logo"><span className="rider-logo-icon">SP</span><span>Shop Point</span></Link>
      <div className="rider-info-content">
        <span className="rider-label">BECOME A SHOP POINT RIDER</span>
        <h1>Deliver locally. <span>Earn on your schedule.</span></h1>
        <p>Join the Shop Point rider network and help nearby customers receive orders from their favourite local shops.</p>
        <div className="rider-benefits">
          <div className="rider-benefit"><span>01</span><div><strong>Receive delivery requests</strong><p>Get notified when customers need an order delivered.</p></div></div>
          <div className="rider-benefit"><span>02</span><div><strong>Choose orders</strong><p>Accept available delivery requests that suit you.</p></div></div>
          <div className="rider-benefit"><span>03</span><div><strong>Deliver with confidence</strong><p>Verified rider details help keep deliveries safe.</p></div></div>
        </div>
      </div>
    </aside>

    <main className="rider-register-form-side"><div className="rider-register-container">
      <Link to="/" className="rider-mobile-logo"><span className="rider-logo-icon">SP</span><span>Shop Point</span></Link>
      <div className="rider-heading"><span>RIDER REGISTRATION</span><h2>Become a rider</h2><p>All fields are required for rider verification. Your documents are used only for verification.</p></div>
      <form className="rider-form" onSubmit={handleSubmit}>
        <section className="rider-form-section">
          <div className="rider-section-title"><User size={18} /><div><h3>Personal verification</h3><p>Provide the identity details needed to verify your account.</p></div></div>
          <div className="rider-form-row"><div className="rider-form-group"><label htmlFor="name">Full name <span className="rider-required">*</span></label><div className="rider-input-wrapper"><User size={18} /><input id="name" name="name" type="text" placeholder="Enter your full name" value={formData.name} onChange={handleChange} required /></div></div><div className="rider-form-group"><label htmlFor="dateOfBirth">Date of birth <span className="rider-required">*</span></label><div className="rider-input-wrapper"><CalendarDays size={18} /><input id="dateOfBirth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} required /></div></div></div>
          <div className="rider-form-group"><label htmlFor="cnicNumber">CNIC number <span className="rider-required">*</span></label><div className="rider-input-wrapper"><IdCard size={18} /><input id="cnicNumber" name="cnicNumber" type="text" inputMode="numeric" placeholder="12345-1234567-1" value={formData.cnicNumber} onChange={handleChange} pattern="[0-9]{5}-[0-9]{7}-[0-9]" title="Use the format 12345-1234567-1" required /></div><small className="rider-field-help">Use the format 12345-1234567-1.</small></div>
          <div className="rider-form-row"><FileUpload name="cnicFront" label="CNIC front image" helper="JPG or PNG, clear and readable" icon={IdCard} /><FileUpload name="cnicBack" label="CNIC back image" helper="JPG or PNG, clear and readable" icon={IdCard} /></div>
        </section>
        <section className="rider-form-section">
          <div className="rider-section-title"><Bike size={18} /><div><h3>Vehicle & operating area</h3><p>Tell us how and where you plan to deliver.</p></div></div>
          <div className="rider-form-row"><div className="rider-form-group"><label htmlFor="vehicleType">Vehicle type <span className="rider-required">*</span></label><div className="rider-input-wrapper"><Bike size={18} /><select id="vehicleType" name="vehicleType" value={formData.vehicleType} onChange={handleChange} required><option value="">Select your vehicle</option><option value="Motorcycle">Motorcycle</option><option value="Bicycle">Bicycle</option><option value="Car">Car</option><option value="Rickshaw">Rickshaw</option><option value="Van">Van</option></select></div></div><div className="rider-form-group"><label htmlFor="vehicleNumber">Vehicle registration number <span className="rider-required">*</span></label><div className="rider-input-wrapper"><CarFront size={18} /><input id="vehicleNumber" name="vehicleNumber" type="text" placeholder="e.g. ABC-123" value={formData.vehicleNumber} onChange={handleChange} required /></div></div></div>
          <div className="rider-form-group"><label htmlFor="location">Operating city <span className="rider-required">*</span></label><div className="rider-input-wrapper"><MapPin size={18} /><select id="location" name="location" value={formData.location} onChange={handleChange} required><option value="">Select your operating city</option>{pakistaniCities.map((city) => <option key={city} value={city}>{city}</option>)}</select></div></div>
          <FileUpload name="vehiclePhoto" label="Vehicle picture" helper="JPG or PNG — show the complete vehicle and number plate" icon={ImagePlus} />
          <FileUpload name="drivingLicense" label="Driving license picture" helper="JPG or PNG — clear and readable" icon={FileCheck2} />
        </section>
        <section className="rider-form-section">
          <div className="rider-section-title"><Lock size={18} /><div><h3>Contact & account</h3><p>Use details you can access when deliveries are available.</p></div></div>
          <div className="rider-form-row"><div className="rider-form-group"><label htmlFor="email">Email address <span className="rider-required">*</span></label><div className="rider-input-wrapper"><Mail size={18} /><input id="email" name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required /></div></div><div className="rider-form-group"><label htmlFor="phone">Phone number <span className="rider-required">*</span></label><div className="rider-input-wrapper"><Phone size={18} /><input id="phone" name="phone" type="tel" placeholder="03XX-XXXXXXX" value={formData.phone} onChange={handleChange} required /></div></div></div>
          <div className="rider-form-row"><div className="rider-form-group"><label htmlFor="password">Password <span className="rider-required">*</span></label><div className="rider-input-wrapper"><Lock size={18} /><input id="password" name="password" type="password" placeholder="Create password" value={formData.password} onChange={handleChange} minLength="8" required /></div></div><div className="rider-form-group"><label htmlFor="confirmPassword">Confirm password <span className="rider-required">*</span></label><div className="rider-input-wrapper"><Lock size={18} /><input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm password" value={formData.confirmPassword} onChange={handleChange} minLength="8" required /></div></div></div>
          {error && <p className="rider-form-error" role="alert">{error}</p>}
        </section>
        <button type="submit" className="rider-submit-btn">Submit for verification <ArrowRight size={18} /></button>
        <p className="rider-form-note"><Lock size={14} /> This is a frontend form only. No information is sent or stored yet.</p>
      </form>
      <div className="rider-login-link"><span>Already have a Shop Point account?</span><Link to="/login">Sign in</Link></div>
      <div className="rider-other-option">Want to sell products instead? <Link to="/vendor/register">Register as a Vendor</Link></div>
      <Link to="/" className="rider-back-home">← Back to Shop Point</Link>
    </div></main>
  </div>;
};

export default RiderRegister;
