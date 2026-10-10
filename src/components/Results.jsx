
function Results({ recommendations = [] }) {
  if (recommendations.length === 0) {
    return (
      <section className="results">
        <h2>Recommended Meal</h2>
        <p>No foods recommended. Try adjusting your constraints.</p>
      </section>
    );
  }

  // Calculate totals across all recommended foods
  const totals = recommendations.reduce(
    (acc, food) => {
      Object.entries(food.info).forEach(([key, value]) => {
        acc[key] = (acc[key] || 0) + value * food.quantity;
      });

      return acc;
    },
    {}
  );

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

  const format = (value) =>
    Number(value.toFixed(2)).toLocaleString();

  return (
    <section className="results">
      <h2>Recommended Meal</h2>

      <div className="meal-list">
        {recommendations.map((food) => (
          <article className="food-item" key={food.id}>
            <div>
              <h3>{food.title}</h3>
              <p>Quantity: {food.quantity}</p>
            </div>

            <p>
              {format(food.info.points * food.quantity)} points
            </p>
          </article>
        ))}
      </div>

      <h3>Meal Totals</h3>

      <div className="totals">
        <p>
          <strong>Reward points:</strong>{" "}
          {format(totals.points || 0)}
        </p>

        {nutrients.map(([key, label, unit]) => (
          <p key={key}>
            <strong>{label}:</strong>{" "}
            {format(totals[key] || 0)} {unit}
          </p>
        ))}
      </div>
    </section>
  );
}

export default Results;
