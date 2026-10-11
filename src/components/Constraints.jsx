import { useState } from "react";
const Constraints = ({ variables, constraints, setConstraints }) => {
  const [selectedAttribute, setSelectedAttribute] = useState("");

  // Attributes that haven't already been added as constraints.
  const availableAttributes = variables.filter(
    (variable) => !(variable in constraints)
  );

  const addConstraint = () => {
    if (
      !selectedAttribute ||
      selectedAttribute in constraints
    ) {
      return;
    }

    setConstraints((prev) => ({
      ...prev,
      [selectedAttribute]: { min: 0 },
    }));

    // Reset the dropdown to the next available attribute.
    setSelectedAttribute("");
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
    variable
      .replaceAll("_", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <div>
      <div className="constraints-list">
        {Object.entries(constraints).map(([key, bounds]) => (
          <div key={key} className="constraint-row">
            <span className="constraint-label">
              {formatLabel(key)}
            </span>

            <input
              type="number"
              placeholder="Min"
              aria-label={`${formatLabel(key)} minimum`}
              value={bounds.min ?? ""}
              onChange={(e) =>
                updateBound(key, "min", e.target.value)
              }
            />

            <input
              type="number"
              placeholder="Max"
              aria-label={`${formatLabel(key)} maximum`}
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
      </div>

      <div className="add-constraint">
        <select
          aria-label="Select attribute to constrain"
          value={selectedAttribute}
          onChange={(e) => setSelectedAttribute(e.target.value)}
          disabled={availableAttributes.length === 0}
        >
          <option value="">Select attribute...</option>

          {availableAttributes.map((variable) => (
            <option key={variable} value={variable}>
              {formatLabel(variable)}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={addConstraint}
          disabled={!selectedAttribute}
        >
          + Add constraint
        </button>
      </div>
    </div>
  );
};

export default Constraints;