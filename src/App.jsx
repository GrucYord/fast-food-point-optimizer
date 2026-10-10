import { useState } from 'react'
import Sidebar from './components/Sidebar';
import solver from 'javascript-lp-solver'; 

function App() {
  const [selectedRestuarant, setSelectedRestuarant] = useState('')
  const [optimizedAttribute, setOptimizedAttribute] = useState('')
  const [optimizationType, setOptimizationType] = useState('min')
  const [constraints, setConstraints] = useState({})

  const model = {
      optimize: "capacity",
      opType: "max",
      constraints: {
          plane: { max: 44 },
          person: { max: 512 },
          cost: { max: 300000 },
      },
      variables: {
          "brit": {
            capacity: 20000,
            plane: 1,
            person: 8,
            cost: 5000 
          },
          "yank": { capacity: 30000, plane: 1, person: 16, cost: 9000 },
      },
    };

    const result = solver.Solve(model);
      // bounded: true
      // brit: 24
      // feasible: true
      // result: 1080000
      // yank: 20
      console.log(result);

  return (
    <>
      <h1>Fast Food Rewards Optimizer</h1>
      <Sidebar />
    </>
  )
}

export default App
