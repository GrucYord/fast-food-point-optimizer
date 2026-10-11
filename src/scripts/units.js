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
    ["totalFat", "Total fats", "g"],
    ["saturatedFat", "Saturated fats", "g"],
    ["transFat", "Trans fats", "g"],
    ["cholestoral", "Cholesterol", "mg"],
    ["sodium", "Sodium", "mg"],
    ["sugar", "Sugar", "g"],
  ];
function getUnitOfMeasure(unit) {
  const unitEntry = units.find(([key]) => key === unit);
  return unitEntry ? unitEntry[2] : "";
}
export { units, getUnitOfMeasure };