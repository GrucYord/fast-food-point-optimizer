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

  const nutrients = [
    ["calories", "Calories", "kcal"],
    ["protein", "Protein", "g"],
    ["carbohydrates", "Carbohydrates", "g"],
    ["fats", "Total fat", "g"],
    ["cholesterol", "Cholesterol", "mg"],
    ["fiber", "Fiber", "g"],
    ["sugars", "Total sugars", "g"],
    ["calcium", "Calcium", "mg"],
    ["iron", "Iron", "mg"],
    ["potassium", "Potassium", "mg"],
  ];

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
              <h3>{food.title}</h3>
              <p className="food-points">
                {format((food.info?.points || 0) * food.quantity)} pts total
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* Simple Black and White List Box */}
      <div className="totals-box">
        <h3 className="totals-box-title">Meal Summary</h3>
        <ul className="totals-list">
          <li className="totals-item">
            <span className="totals-label">Reward Points</span>
            <span className="totals-value">{format(totals.points || 0)}</span>
          </li>
          {nutrients.map(([key, label, unit]) => (
            <li className="totals-item" key={key}>
              <span className="totals-label">{label}</span>
              <span className="totals-value">
                {format(totals[key] || 0)} <span className="totals-unit">{unit}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Results;