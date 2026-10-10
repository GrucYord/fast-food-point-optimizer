import Constraint from "./Constraint"

const Sidebar = ({restaurants, foods}) => {
  return <div>
    <form>
      <div>
      <h2>Restuarant</h2>
        <select name="cars" id="cars">
          <option value="volvo">McDonald's</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
      </div>
      
      <div>
      <h2>Primary Optimization</h2>
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