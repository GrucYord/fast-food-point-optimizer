const Constraint = ({variables}) => {
  return <>
    <div>
      <select name="variables" id="variables">
        {variables.map(variable => <option key={variable} value={variable}>{variable}</option>)}
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