import Constraints from "./Constraints"

const Sidebar = ({
  restaurantData,
  selectedRestaurant,
  handleRestaurantSelect,
  optimizedAttribute,
  setOptimizedAttribute,
  setOptimizationType,
  constraints,
  setConstraints,
}) => {
  const restaurantTitles = restaurantData.map(
    restaurant => restaurant.title
  )
  const variables = Object.keys(
    selectedRestaurant?.foods?.[0]?.info ?? {}
  );

  return <div>
    <h1>Fast Food Rewards Optimizer</h1>
    <form>
      <div>
      <h2>Restaurant</h2>
        <select
          name="restaurants"
          id="restaurants"
          onChange={(e) => handleRestaurantSelect(e.target.value)}
          value={selectedRestaurant?.title ?? ""}
        >
          {restaurantTitles.map(restaurant => <option key={restaurant} value={restaurant}>{restaurant}</option>)}
        </select>
      </div>
      
      <div>
      <h2>Primary Optimization</h2>
        <select
          name="variables"
          id="variables"
          value={optimizedAttribute}
          onChange={(e) => setOptimizedAttribute(e.target.value)}
        >
          {variables.map((variable) => (
            <option key={variable} value={variable}>
              {variable}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => setOptimizationType("min")}
        >
          Minimize
        </button>
        <button
          type="button"
          onClick={() => setOptimizationType("max")}
        >
          Maximize
        </button>
      </div>

      <div>
        <h2>Constraints</h2>
        <Constraints
          variables={variables}
          constraints={constraints}
          setConstraints={setConstraints}
        />
      </div>
    </form>
  </div>
}
export default Sidebar