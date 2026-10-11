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
            The optimization function can scale infinitely. Add a ceiling constraint
            on points, calories, or item quantities.
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

  const totals = recommendations.reduce((acc, food) => {
    Object.entries(food.info).forEach(([key, value]) => {
      acc[key] = (acc[key] || 0) + value * food.quantity;
    });
    return acc;
  }, {});

  const nutrients = [
    ["calories", "Calories", "kcal"],
    ["protein", "Protein", "g"],
    ["carbohydrates", "Carbohydrates", "g"],
    ["fats", "Total fat", "g"],
    ["cholesterol", "Cholesterol", "mg"],
    ["dietary_fiber", "Dietary fiber", "g"],
    ["sugars", "Total sugars", "g"],
    ["calcium", "Calcium", "mg"],
    ["iron", "Iron", "mg"],
    ["potassium", "Potassium", "mg"],
  ];

  const format = (value) => Number(value.toFixed(2)).toLocaleString();

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
                src={food.imageUrl || "https://via.placeholder.com/120"}
                alt={food.title}
                className="food-image"
              />
              <span className="quantity-badge">{food.quantity}×</span>
            </div>
            <div className="food-details">
              <h3>{food.title}</h3>
              <p className="food-points">
                {format((food.info?.points || 0) * food.quantity)} pts total
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="totals-section">
        <h3>Meal Summary Totals</h3>
        <div className="totals-grid">
          <div className="total-card primary">
            <span className="total-label">Reward Points</span>
            <span className="total-value">{format(totals.points || 0)}</span>
          </div>

          {nutrients.map(([key, label, unit]) => (
            <div className="total-card" key={key}>
              <span className="total-label">{label}</span>
              <span className="total-value">
                {format(totals[key] || 0)} <small>{unit}</small>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Results;