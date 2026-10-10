
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Results from './components/Results';
import solver from 'javascript-lp-solver';
import restaurantData from '../rewardsData.json';

function App() {
  const [selectedRestaurant, setSelectedRestaurant] =
    useState(restaurantData[0]);

  const [optimizedAttribute, setOptimizedAttribute] =
    useState('points');

  const [optimizationType, setOptimizationType] =
    useState('min');

  const [constraints, setConstraints] = useState({
    protein: { min: 30 },
    calories: { max: 800 },
  });

  const handleResturantSelect = (e) => setSelectedRestaurant(e.target.value)

  // Convert nutrient strings into numbers
  const foods = selectedRestaurant?.foods ?? [];

  // Create one solver variable for each food
  const variables = Object.fromEntries(
    foods.map((food) => [
      String(food.id),
      food.info,
    ])
  );

  // Require whole-number quantities for every food
  const ints = Object.fromEntries(
    foods.map((food) => [String(food.id), 1])
  );

  // Build the linear programming model
  const model = {
    optimize: optimizedAttribute,
    opType: optimizationType,
    constraints,
    variables,
    ints,
  };

  const result = solver.Solve(model);

  // Find the food details for each selected quantity
  const recommendations = foods
    .map((food) => ({
      ...food,
      quantity: result[String(food.id)] ?? 0,
    }))
    .filter((food) => food.quantity > 0.000001);

  console.log("Result:", result)
  console.log("recommendations:", recommendations)

  return (
    <>
      <Sidebar 
        restaurantData={restaurantData}
        selectedRestaurant={selectedRestaurant}
        handleResturantSelect={handleResturantSelect}
        handleOptimizationTypeClick={setOptimizationType}
      />
      <Results recommendations={recommendations} />
    </>
  );
}

export default App;
