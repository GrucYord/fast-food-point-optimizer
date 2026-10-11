import { useState } from "react";

const Constraints = ({ variables, constraints, setConstraints }) => {
  const [selectedAttribute, setSelectedAttribute] = useState("");

  const availableAttributes = variables.filter(
    (variable) => !(variable in constraints)
  );

  const addConstraint = () => {
    if (!selectedAttribute || selectedAttribute in constraints) return;

    setConstraints((prev) => ({
      ...prev,
      [selectedAttribute]: { min: 0 },
    }));

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
    <div className="constraints-container">
      <div className="constraints-list">
        {Object.entries(constraints).map(([key, bounds]) => (
          <div key={key} className="constraint-card">
            <div className="constraint-header">
              <span className="constraint-label">{formatLabel(key)}</span>
              <button
                type="button"
                className="btn-link-danger"
                onClick={() => removeConstraint(key)}
                aria-label={`Remove ${formatLabel(key)} constraint`}
              >
                ✕ Remove
              </button>
            </div>

            <div className="constraint-inputs">
              <div className="input-field">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Min"
                  aria-label={`${formatLabel(key)} minimum`}
                  value={bounds.min ?? ""}
                  onChange={(e) => updateBound(key, "min", e.target.value)}
                />
              </div>
              <div className="input-field">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Max"
                  aria-label={`${formatLabel(key)} maximum`}
                  value={bounds.max ?? ""}
                  onChange={(e) => updateBound(key, "max", e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="add-constraint">
        <select
          className="form-control"
          aria-label="Select attribute to constrain"
          value={selectedAttribute}
          onChange={(e) => setSelectedAttribute(e.target.value)}
          disabled={availableAttributes.length === 0}
        >
          <option value="">+ Select attribute...</option>
          {availableAttributes.map((variable) => (
            <option key={variable} value={variable}>
              {formatLabel(variable)}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={addConstraint}
          disabled={!selectedAttribute}
        >
          Add Constraint
        </button>
      </div>
    </div>
  );
};

export default Constraints;