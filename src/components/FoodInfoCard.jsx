import units from "../scripts/units";

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