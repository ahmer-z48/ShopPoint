const CategoryCard = ({ category }) => {
  const Icon = category.icon;

  return (
    <div className="category-card">

      <div className="category-icon">
        <Icon size={24} />
      </div>

      <h3>{category.name}</h3>

      <span>
        Explore shops
      </span>

    </div>
  );
};

export default CategoryCard;