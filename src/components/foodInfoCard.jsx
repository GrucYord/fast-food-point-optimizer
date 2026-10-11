const FoodInfoCard = ({
  header = "Nutrition Facts",
  info,
}) => {
  const format = (value) => Number((value || 0).toFixed(1)).toLocaleString();
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
      {units.map(([key, label, unit]) => (
        <li className="totals-item" key={key}>
          <span className="totals-label">{label}</span>
          <span className="totals-value">
            {format(info[key] || 0)} <span className="totals-unit">{unit}</span>
          </span>
        </li>
      ))}
    </ul>
  </div>
}
export default FoodInfoCard