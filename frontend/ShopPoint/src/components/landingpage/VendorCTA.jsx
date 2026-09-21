import './VendorCTA.css';
import {
  Store,
  ArrowRight,
} from "lucide-react";

const VendorCTA = () => {
  return (
    <section className="vendor-section">

      <div className="vendor-container">

        <div className="vendor-icon">
          <Store size={30} />
        </div>

        <div className="vendor-content">

          <span>
            For local businesses
          </span>

          <h2>
            Run a local shop?
            <br />
            Get discovered by shoppers nearby.
          </h2>

          <p>
            Bring your shop online, showcase your products,
            manage orders and reach more customers in your area.
          </p>

        </div>

        <button className="vendor-cta-btn">

          Register your shop

          <ArrowRight size={18} />

        </button>

      </div>

    </section>
  );
};

export default VendorCTA;