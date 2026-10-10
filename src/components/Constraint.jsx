const Constraint = (metric) => {
  return <>
    <div>
      <select name="cars" id="cars">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>
      <input
        type="number"
        placeholder="No min"
        value={''}
        onChange={() => {}}
      />
      <input
        type="number"
        placeholder="No max"
        value={''}
        onChange={() => {}}
      />
    </div>
  </>
}
export default Constraint