const units = [
    ["points", "Points", ""],
    ["calories", "Calories", "kcal"],
    ["protein", "Protein", "g"],
    ["carbohydrates", "Carbohydrates", "g"],
    ["fats", "Total fats", "g"],
    ["cholesterol", "Cholesterol", "mg"],
    ["fiber", "Fiber", "g"],
    ["sugars", "Total sugars", "g"],
    ["calcium", "Calcium", "mg"],
    ["iron", "Iron", "mg"],
    ["potassium", "Potassium", "mg"],
  ];

function getUnitOfMeasure(unit) {
  const unitEntry = units.find(([key]) => key === unit);
  return unitEntry ? unitEntry[2] : "";
}
export { units, getUnitOfMeasure };