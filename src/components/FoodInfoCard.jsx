const FoodInfoCard = ({
  header = "Nutrition Facts",
  info,
  compact = false,
}) => {
  const format = (value) => {
    if (value === null || value === undefined || value === "") {
      return "—";
    }

    const number = Number(value);

    if (!Number.isFinite(number)) return "—";

    return number.toLocaleString(undefined, {
      maximumFractionDigits: 1,
    });
  };
  const units = [
    ["points", "Points", ""],
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

  return <div className="totals-box">
    <h3 className="totals-box-title">{header}</h3>
    <ul className="totals-list">
      {units
        .filter(([key]) => info?.[key] !== undefined && info?.[key] !== null)
        .map(([key, label, unit]) => (
          <li className={`totals-item ${compact ? 'compact' : ''}`} key={key}>
            <span className="totals-label">{label}</span>
            <span className="totals-value">
              {format(info?.[key])} <span className="totals-unit">{unit}</span>
            </span>
          </li>
      ))}
    </ul>
  </div>
}
export default FoodInfoCard