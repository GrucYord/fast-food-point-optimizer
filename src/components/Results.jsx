import FoodInfoCard from "./FoodInfoCard";
import DisplayOnHover from "./DisplayOnHover";

function Results({ recommendations = [], result }) {
  if (result && !result.feasible) {
    return (
      <section className="results">
        <h2>Recommended Meal</h2>
        <div className="alert alert-warning">
          <strong>No Feasible Solution</strong>
          <p>
            No meal combination satisfies all current constraints. Try lowering a
            minimum limit or increasing a maximum allowance.
          </p>
        </div>
      </section>
    );
  }

  if (result && !result.bounded) {
    return (
      <section className="results">
        <h2>Recommended Meal</h2>
        <div className="alert alert-warning">
          <strong>Unbounded Optimization</strong>
          <p>
            The optimization function can scale infinitely. Add a limit on
            points, calories, or item quantities.
          </p>
        </div>
      </section>
    );
  }

  if (recommendations.length === 0) {
    return (
      <section className="results">
        <h2>Recommended Meal</h2>
        <div className="alert alert-info">
          <p>No positive food quantities were recommended for this configuration.</p>
        </div>
      </section>
    );
  }

  // Calculate totals across all recommended foods
  const totals = recommendations.reduce((acc, food) => {
    Object.entries(food.info).forEach(([key, value]) => {
      acc[key] = (acc[key] || 0) + value * food.quantity;
    });
    return acc;
  }, {});

  const format = (value) => Number((value || 0).toFixed(1)).toLocaleString();

  return (
    <section className="results">
      <header className="results-header">
        <h2>Recommended Meal</h2>
        <span className="badge">{recommendations.length} items</span>
      </header>

      <div className="meal-grid">
        {recommendations.map((food) => (
          <article className="food-card" key={food.id}>
            <div className="food-image-wrapper">
              <img
                src={food.imageUrl}
                alt={food.title}
                className="food-image"
              />
              <span className="quantity-badge">{food.quantity}×</span>
            </div>
            <div className="food-details">
              <h3>
                {food.title}
              </h3>
              <p className="food-points">
                {format((food.info?.points || 0) * food.quantity)} pts total
              </p>
              <DisplayOnHover 
                trigger="ⓘ"
                content={<FoodInfoCard info={food.info} />}
              />
            </div>
          </article>
        ))}
      </div>

      {/* Simple Black and White List Box */}
      <FoodInfoCard 
        header="Nutrient Summary"
        info={totals}
      />
    </section>
  );
}

export default Results;