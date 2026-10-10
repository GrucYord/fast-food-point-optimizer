import Constraint from "./Constraint"

const Sidebar = ({
  restaurantData,
  selectedRestaurant,
  handleResturantSelect,
  handleOptimizationTypeClick
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
          name="restuarants"
          id="restuarants"
          onChange={(e) =>
            handleResturantSelect(e.target.value)
          }
          value={selectedRestaurant}
        >
          {restaurantTitles.map(restaurant => <option key={restaurant} value={restaurant}>{restaurant}</option>)}
        </select>
      </div>
      
      <div>
      <h2>Primary Optimization</h2>
        <select name="variables" id="variables">
          {variables.map((variable) => (
            <option key={variable} value={variable}>
              {variable}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => handleOptimizationTypeClick("min")}
        >
          Minimize
        </button>
        <button
          type="button"
          onClick={() => handleOptimizationTypeClick("max")}
        >
          Maximize
        </button>
      </div>

      <div>
        <h2>Constraints</h2>
        <Constraint variables={variables}/>
      </div>
      <button>Optimize my meal!</button>
    </form>
  </div>
}
export default Sidebar