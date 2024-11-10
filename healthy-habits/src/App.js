import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activeness, setActiveness] = useState('');
  const [goal, setGoal] = useState('');
  const [isClicked, setIsClicked] = useState(false); // Track if "Start" button has been clicked

  return (
    <Router>
      <div className="App">
        <header>
          {/* Make the title into a button and navigate to the start page */}
          <button className="title-button" onClick={() => window.location.href = '/'}>
            Healthy Habits
          </button>
          <button className="auth-button">Login/Signup</button>
        </header>
        
        <main>
          {!isClicked && (
            <Link to="/start">
              <button className="start-button" onClick={() => setIsClicked(true)}>
                Start
              </button>
            </Link>
          )}
        </main>

        <Routes>
          <Route path="/start" element={<StartPage setHeight={setHeight} setWeight={setWeight} setActiveness={setActiveness} />} />
          <Route path="/bmi" element={<BMIPage height={height} weight={weight} activeness={activeness}/>} />
          <Route path="/goals" element={<GoalPage setGoal={setGoal}/>} />
        </Routes>
      </div>
    </Router>
  );
}

function StartPage({ setHeight, setWeight, setActiveness }) {
  const [localHeight, setLocalHeight] = useState('');
  const [localWeight, setLocalWeight] = useState('');
  const [localActiveness, setLocalActiveness] = useState('not_active');
  const navigate = useNavigate(); // Hook to navigate to previous page

  const handleSubmit = () => {
    setHeight(localHeight);
    setWeight(localWeight);
    setActiveness(localActiveness);
  };

  return (
    <div className="start-page">
      <h1>Start Your Journey</h1>
      <div className="form-container">
        <label>Height (cm): </label>
        <input
          type="number"
          value={localHeight}
          onChange={(e) => setLocalHeight(e.target.value)}
          placeholder="Enter height (cm)"
        />

        <label>Weight (kg): </label>
        <input
          type="number"
          value={localWeight}
          onChange={(e) => setLocalWeight(e.target.value)}
          placeholder="Enter weight (kg)"
        />

        <label>Activeness: </label>
        <select
          value={localActiveness}
          onChange={(e) => setLocalActiveness(e.target.value)}
        >
          <option value="not_active">Not very active</option>
          <option value="slightly_active">Slightly Active</option>
          <option value="active">Active</option>
          <option value="very_active">Very Active</option>
        </select>

        <Link to="/bmi">
          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
        </Link>
      </div>
    </div>
  );
}

function BMIPage({ height, weight, activeness}) {
  const navigate = useNavigate(); // Hook to navigate to previous page

  const calculateBMI = (height, weight) => {
    if (height > 0 && weight > 0) {
      // Convert height to meters
      const heightInMeters = height / 100;
      return (weight / (heightInMeters * heightInMeters)).toFixed(2);
    }
    return null;
  };

  const calculateMC = (height, weight, activeness) => {
    if (height > 0 && weight > 0) {
      // Convert height to meters
      const heightInMeters = height / 100;

      if (activeness==="not_active")
        return (10*weight+6.25*height).toFixed(2);
      
      else if (activeness==="slightly_active")
        return (10*weight+6.25*height+100).toFixed(2);

      else if (activeness==="active")
        return (10*weight+6.25*height+250).toFixed(2);

      else if (activeness==="very_active")
        return (10*weight+6.25*height+400).toFixed(2);

      else
        return null;
    }
    return null;
  };
  
  const bmi = calculateBMI(height, weight);
  const mc = calculateMC(height, weight, activeness);

  return (
    <div className="bmi-page">
      <h1>Your BMI</h1>
      {bmi ? (
        <div>
          <p>Your BMI is: {bmi}</p>
          {/* Add category based on BMI value */}
          <p>
            BMI Category: {bmi < 18.5 ? 'Underweight' : bmi < 24.9 ? 'Normal weight' : bmi < 29.9 ? 'Overweight' : 'Obese'}
          </p>
        </div>
      ) : (
        <p>Please provide valid height and weight.</p>
      )}
      
      <p>Note, BMI is not always accurate as it doesn’t account for muscle mass and fat proportions. See a doctor if you have concerns.</p>

      <h1>Your Maintance Calories</h1>
      {mc ? (
        <div>
          <p>Your Maintance Calories Are: {mc}</p>
        </div>
      ) : (
        <p>Please provide valid height and weight.</p>
      )}

      {/* Back button to navigate to the previous page */}
      <button className="back-button" style={{ marginRight: '50px'}} onClick={() => navigate(-1)}>
        Back
      </button>

      <Link to="/goals">
          <button className="next-button" onClick={() => navigate(1)}>
            Go Next
          </button>
        </Link>
      
    </div>
  );
}

function GoalPage({ setGoal }) {
  const [localGoal, setLocalGoal] = useState('lose_weight');
  const navigate = useNavigate(); // Hook to navigate to previous page

  const handleSubmit = () => {
    setGoal(localGoal);
  };

  return (
    <div className="goal-page">
      <h1>What are your goals?</h1>
      <div className="form-container">
        <label>Goals: </label>
        <select
          value={localGoal}
          onChange={(e) => setLocalGoal(e.target.value)}
        >
          <option value="lose_weight">Lose Weight</option>
          <option value="gain_muscle">Gain muscle</option>
        </select>
      </div>
      <button className="back-button" onClick={() => navigate(-1)}>
        Back
      </button>

    </div>
  );
}

export default App;
