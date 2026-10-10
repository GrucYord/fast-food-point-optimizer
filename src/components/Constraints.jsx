const Constraints = ({ variables, constraints, setConstraints }) => {
  const addConstraint = () => {
    // Find an attribute that isn't already constrained
    const available = variables.find(
      (variable) => !(variable in constraints)
    );

    if (!available) return;

    setConstraints((prev) => ({
      ...prev,
      [available]: { min: 0 },
    }));
  };

  const updateAttribute = (oldKey, newKey) => {
    if (newKey === oldKey || newKey in constraints) return;

    setConstraints((prev) => {
      const next = { ...prev };
      next[newKey] = next[oldKey];
      delete next[oldKey];
      return next;
    });
  };

  const updateBound = (key, bound, value) => {
    setConstraints((prev) => {
      const updated = { ...prev[key] };

      if (value === "") {
        delete updated[bound];
      } else {
        updated[bound] = Number(value);
      }

      const next = { ...prev };

      if (Object.keys(updated).length === 0) {
        delete next[key];
      } else {
        next[key] = updated;
      }

      return next;
    });
  };

  const removeConstraint = (key) => {
    setConstraints((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const formatLabel = (variable) =>
    variable.replaceAll("_", " ");
  return (
    <div>
      {Object.entries(constraints).map(([key, bounds]) => (
        <div key={key} className="constraint-row">
          <select
            value={key}
            onChange={(e) =>
              updateAttribute(key, e.target.value)
            }
          >
            {variables.map((variable) => (
              <option
                key={variable}
                value={variable}
                disabled={
                  variable !== key && variable in constraints
                }
              >
                {formatLabel(variable)}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Min"
            value={bounds.min ?? ""}
            onChange={(e) =>
              updateBound(key, "min", e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Max"
            value={bounds.max ?? ""}
            onChange={(e) =>
              updateBound(key, "max", e.target.value)
            }
          />

          <button
            type="button"
            onClick={() => removeConstraint(key)}
            aria-label={`Remove ${formatLabel(key)} constraint`}
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addConstraint}
        disabled={variables.every(
          (variable) => variable in constraints
        )}
      >
        + Add constraint
      </button>
    </div>
  );
};

export default Constraints;
