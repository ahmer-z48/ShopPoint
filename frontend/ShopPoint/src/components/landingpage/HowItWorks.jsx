import './HowItWorks.css';
import {
  Search,
  ShoppingBag,
  HeartHandshake,
} from "lucide-react";

const HowItWorks = () => {

  const steps = [
    {
      id: 1,
      icon: Search,
      title: "Search locally",
      description:
        "Search for a product and discover local shops that have what you need.",
    },
    {
      id: 2,
      icon: ShoppingBag,
      title: "Choose your shop",
      description:
        "View shop details, available products and prices, then choose the shop you prefer.",
    },
    {
      id: 3,
      icon: HeartHandshake,
      title: "Shop your way",
      description:
        "Place your order and choose convenient pickup or optional delivery.",
    },
  ];

  return (
    <section
      className="how-section"
      id="how-it-works"
    >

      <div className="section-container">

        <div className="how-heading">

          <span className="section-label">
            Simple process
          </span>

          <h2>
            Local shopping made easier
          </h2>

          <p>
            Shop Point connects customers with nearby
            businesses in just a few simple steps.
          </p>

        </div>

        <div className="steps-grid">

          {steps.map((step) => {

            const Icon = step.icon;

            return (
              <div
                className="step-card"
                key={step.id}
              >

                <div className="step-number">
                  0{step.id}
                </div>

                <div className="step-icon">
                  <Icon size={25} />
                </div>

                <h3>
                  {step.title}
                </h3>

                <p>
                  {step.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
};

export default HowItWorks;