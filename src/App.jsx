
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Results from './components/Results';
import solver from 'javascript-lp-solver';
import restaurantData from '../rewardsData.json';
import './App.css';

function App() {
  const [selectedRestaurant, setSelectedRestaurant] =
    useState(restaurantData[0]);

  const [optimizedAttribute, setOptimizedAttribute] =
    useState('points');

  const [optimizationType, setOptimizationType] =
    useState('min');

  const [constraints, setConstraints] = useState({
    protein: { min: 40 },
    calories: { max: 800 },
  });
  
  console.log(selectedRestaurant, optimizationType)

  const handleRestaurantSelect = (restaurantTitle) => {
    const newSelectedRestaurant = restaurantData.find(
      (restaurant) => restaurant.title === restaurantTitle
    );

    if (newSelectedRestaurant) {
      setSelectedRestaurant(newSelectedRestaurant);
    }
  };
  // Convert nutrient strings into numbers
  const foods = selectedRestaurant?.foods ?? [];

  
  // Create one solver variable for each food
  const variables = Object.fromEntries(
    foods.map((food, index) => [
      String(index),
      food.info,
    ])
  );

  // Require whole-number quantities for every food
  const ints = Object.fromEntries(
    foods.map((food, index) => [String(index), 1])
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
    .map((food, index) => ({
      ...food,
      quantity: result[String(index)] ?? 0,
    }))
    .filter((food) => food.quantity > 0.000001);


  console.log("Model:", model);
  console.log("Solver result:", result);

  if (!result.feasible) {
    console.log("No feasible combination exists.");
  } else if (!result.bounded) {
    console.log("The optimization is unbounded.");
  }
  return (
  <div className="app-container">
    <Sidebar
      restaurantData={restaurantData}
      selectedRestaurant={selectedRestaurant}
      handleRestaurantSelect={handleRestaurantSelect}
      optimizedAttribute={optimizedAttribute}
      setOptimizedAttribute={setOptimizedAttribute}
      optimizationType={optimizationType}
      setOptimizationType={setOptimizationType}
      constraints={constraints}
      setConstraints={setConstraints}
    />
    <main className="main-content">
      <Results
        recommendations={recommendations}
        result={result}
      />
    </main>
  </div>
);
}

export default App;
