
export const constraintPresets = [
  {
    id: "high-protein",
    label: "High Protein",
    description: "At least 40 g protein, at most 800 calories",
    constraints: {
      protein: { min: 40 },
      calories: { max: 800 }
    },
  },
  {
    id: "low-calorie",
    label: "Low Calorie",
    description: "At most 500 calories, at least 20 g protein",
    constraints: {
      calories: { max: 500 },
      protein: { min: 20 }
    },
  },
  {
    id: "fiber-focus",
    label: "Fiber Focus",
    description: "At least 8 g fiber and 20 g protein",
    constraints: {
      fiber: { min: 8 },
      protein: { min: 20 },
      calories: { max: 800 },
    },
  }
];

