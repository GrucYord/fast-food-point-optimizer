import Constraint from "./Constraint"

const Sidebar = ({restaurants, foods}) => {
  return <div>
    <h1>Fast Food Rewards Optimizer</h1>
    <form>
      <div>
      <h2>Restuarant</h2>
        <select name="cars" id="cars">
          <option value="McDonald's">McDonald's</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
      </div>
      
      <div>
      <h2>Primary Optimization</h2>
        <select name="cars" id="cars">
          <option value="McDonald's">McDonald's</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
        <button>
          Minimize
        </button>
        <button>
          Maximize
        </button>
      </div>
      <div>
        <h2>Constraints</h2>
        <Constraint />
      </div>
      <button>Optimize my meal!</button>
    </form>
  </div>
}
export default Sidebar