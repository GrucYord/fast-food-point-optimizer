import Constraints from "./Constraints";

const Sidebar = ({
  restaurantData,
  selectedRestaurant,
  handleRestaurantSelect,
  optimizedAttribute,
  setOptimizedAttribute,
  optimizationType,
  setOptimizationType,
  constraints,
  setConstraints,
}) => {
  const restaurantTitles = restaurantData.map(
    (restaurant) => restaurant.title
  );
  const variables = Object.keys(
    selectedRestaurant?.foods?.[0]?.info ?? {}
  );

  // to add: recommended constraints (e.g))

  return (
    <aside className="sidebar">
      <header className="sidebar-header">
        <h1>Fast Food Rewards Optimizer</h1>
      </header>

      <form className="sidebar-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label htmlFor="restaurants">
            <h2>Restaurants</h2>
          </label>
          <select
            name="restaurants"
            id="restaurants"
            className="form-control"
            onChange={(e) => handleRestaurantSelect(e.target.value)}
            value={selectedRestaurant?.title ?? ""}
          >
            {restaurantTitles.map((restaurant) => (
              <option key={restaurant} value={restaurant}>
                {restaurant}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="variables">
            <h2>Optimize for</h2>
          </label>
          <select
            name="variables"
            id="variables"
            className="form-control"
            value={optimizedAttribute}
            onChange={(e) => setOptimizedAttribute(e.target.value)}
          >
            {variables.map((variable) => (
              <option key={variable} value={variable}>
                {variable}
              </option>
            ))}
          </select>

          <div className="button-group">
            <button
              type="button"
              className={`btn btn-toggle ${optimizationType === "min" ? "active" : ""}`}
              onClick={() => setOptimizationType("min")}
            >
              Minimize
            </button>
            <button
              type="button"
              className={`btn btn-toggle ${optimizationType === "max" ? "active" : ""}`}
              onClick={() => setOptimizationType("max")}
            >
              Maximize
            </button>
          </div>
        </div>

        <div className="form-group">
          <h2>Nutrition Constraints</h2>
          <Constraints
            variables={variables}
            constraints={constraints}
            setConstraints={setConstraints}
          />
        </div>
      </form>
    </aside>
  );
};

export default Sidebar;