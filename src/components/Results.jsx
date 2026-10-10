const Results = ({ result }) => {
  if (!result) {
    return <p>No results to display.</p>;
  }

  const { feasible, result: objectiveValue, bounded, brit, yank } = result;

  return (
    <div className="results">
      <h2>Optimization Results</h2>

      <p>
        <strong>Status:</strong>{" "}
        {feasible ? "Feasible solution found" : "No feasible solution"}
      </p>

      <p>
        <strong>Objective Value:</strong>{" "}
        {objectiveValue.toLocaleString()}
      </p>

      <p>
        <strong>Bounded:</strong> {bounded ? "Yes" : "No"}
      </p>

      <h3>Optimal Quantities</h3>
      <ul>
        <li>Brit: {brit}</li>
        <li>Yank: {yank}</li>
      </ul>
    </div>
  );
}


export default Results