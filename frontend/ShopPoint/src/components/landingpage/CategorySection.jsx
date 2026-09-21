import CategoryCard from "./CategoryCard";
import { categories } from "../data/Categories";

const CategorySection = () => {
  return (
    <section
      className="categories-section"
      id="categories"
    >

      <div className="section-container">

        <div className="section-heading">

          <div>
            <span className="section-label">
              Explore
            </span>

            <h2>
              Shop by category
            </h2>
          </div>

          <p>
            Discover local businesses across different
            categories in your city.
          </p>

        </div>

        <div className="categories-grid">

          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
            />
          ))}

        </div>

      </div>

    </section>
  );
};

export default CategorySection;