import React, { useState, useEffect } from 'react';
import Papa from 'papaparse'; // Import papaparse to handle CSV parsing
import { loadCSV } from './utils/csvLoader'; // Import your CSV loading utility
import { BrowserRouter as Router, Route, Link, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import orangeImage from './Components/Assets/orange.png';
import owl1 from './Components/Assets/owl1.png';
import bmiOwl from './Components/Assets/bmiOwl.png';
import mcOwl from './Components/Assets/mcOwl.png';
import goalOwl from './Components/Assets/goalOwl.png';
import eatingOwl from './Components/Assets/eatingOwl.png';
import adviceOwl1 from './Components/Assets/adviceOwl1.png';
import adviceOwlMuscle from './Components/Assets/adviceOwlMuscle.png';

function App() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activeness, setActiveness] = useState('');
  const [goal, setGoal] = useState('');
  const [bmi, setBmi] = useState(''); // Add state for BMI
  const [mc, setMc] = useState('');
  const [breakfast, setBreakfast] = useState('');
  const [lunch, setLunch] = useState('');
  const [dinner, setDinner] = useState('');
  const [snack, setSnack] = useState('');
  const [calorie, setCalorie] = useState('');
  const [sodium, setSodium] = useState('');
  const [sugar, setSugar] = useState('');
  
  const [isClicked, setIsClicked] = useState(false); // Track if "Start" button has been clicked

  return (
    <Router>
      <div className="App">
        <header>
          {/* Make the title into a button and navigate to the start page */}
          <button className="title-button" onClick={() => window.location.href = '/'}>
            Healthy Habits
            <img src={orangeImage} alt="Orange" /> 

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
          <Route path="/bmi" element={<BMIPage height={height} weight={weight} activeness={activeness} setBmi={setBmi} setMc={setMc} />} />
          <Route path="/goals" element={<GoalPage setGoal={setGoal} bmi={bmi}/>} />
          <Route path="/eating" element={<EatingPage setBreakfast={setBreakfast} setLunch={setLunch} setDinner={setDinner} setSnack={setSnack}/>}/>
          <Route path="/result" element={<ResultPage setCalorie={setCalorie} setSodium={setSodium} setSugar={setSugar} breakfast={breakfast} lunch={lunch} dinner={dinner} snack={snack} mc={mc} goal={goal}/>}/>
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
      <h1 style={{ color:'white'}}> Welcome to Healthy Habits</h1>
      <div className="form-container">
        <div className="owl1">      
          <img src={owl1} alt="" /> 
        </div>
        <div className="forms">
        <label style={{ color:'white'}}>Height (cm): </label>
        <input
          type="number"
          value={localHeight}
          onChange={(e) => setLocalHeight(e.target.value)}
          placeholder="Enter height (cm)"
        />

        <label style={{ color:'white'}}>Weight (kg): </label>
        <input
          type="number"
          value={localWeight}
          onChange={(e) => setLocalWeight(e.target.value)}
          placeholder="Enter weight (kg)"
        />

        <label style={{ color:'white'}}>Activeness: </label>
        <select
          value={localActiveness}
          onChange={(e) => setLocalActiveness(e.target.value)}
        >
          <option value="not_active">Not very active</option>
          <option value="slightly_active">Slightly Active</option>
          <option value="active">Active</option>
          <option value="very_active">Very Active</option>
        </select>

        </div>

      </div>
      <div className="start-page-submit-button">        <Link to="/bmi">
          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
        </Link>
        </div>
    </div>
  );
}

function BMIPage({ height, weight, activeness, setBmi, setMc}) {
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
  setBmi(bmi);
  const mc = calculateMC(height, weight, activeness);
  setMc(mc);
  return (
    <div className="bmi-page">
      <div className="bmi-page1">
      <h1 style={{ color:'white'}}>Your BMI</h1>
      {bmi ? (
        <div>
          <p style={{ color:'white'}}>Your BMI is: {bmi}</p>
          {/* Add category based on BMI value */}
          <p style={{ color:'white'}}>
            BMI Category: {bmi < 18.5 ? 'Underweight' : bmi < 24.9 ? 'Normal weight' : bmi < 29.9 ? 'Overweight' : 'Obese'}
          </p>
        </div>
      ) : (
        <p style={{ color:'white'}}>Please provide valid height and weight.</p>
      )}
      
      <p style={{ color:'white'}}>Note, BMI is not always accurate as it doesn’t account for muscle mass and fat proportions. See a doctor if you have concerns.</p>

      <h1 style={{ color:'white'}}>Your Maintance Calories</h1>
      {mc ? (
        <div>
          <p style={{ color:'white'}}>Your Maintance Calories Are: {mc}</p>
        </div>
      ) : (
        <p style={{ color:'white'}}>Please provide valid height and weight.</p>
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
      
      <div className="bmi-page-image">
      <img src={bmiOwl} alt="" className="bmiOwlImg" /> 
      <img src={mcOwl} alt="" className="mcOwlImg"/> 
      </div>

    </div>

  );
}

function GoalPage({ setGoal, bmi }) {
  const [localGoal, setLocalGoal] = useState('lose_weight');
  const navigate = useNavigate(); 

  const handleSubmit = () => {
    setGoal(localGoal);
  };

  return (
    <div className="goal-page">
      <div className="goal-page1">
      <h1 style={{ color:'white'}}>What are your goals?</h1>
        <div className="form-container">
          <div className="radio-options">
            <div className="radio-option">
              <input
                type="radio"
                name="goal"
                value="lose_weight"
                checked={localGoal === 'lose_weight'}
                onChange={(e) => setLocalGoal(e.target.value)}
              />
              <label style={{ color:'white'}}>
                Lose Weight
                {bmi > 25 && <span className="recommended"> *recommended</span>}
              </label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                name="goal"
                value="gain_muscle"
                checked={localGoal === 'gain_muscle'}
                onChange={(e) => setLocalGoal(e.target.value)}
              />
              <label style={{ color:'white'}}>
                Gain Muscle
                {bmi < 19 && <span className="recommended"> *recommended</span>}
              </label>
            </div>
          </div>
        </div>

        {/* Back button to navigate to the previous page */}
        <button className="back-button" style={{ marginRight: '50px'}} onClick={() => navigate(-1)}>
          Back
        </button>

        <Link to="/eating">
            <button className="next-button" onClick={handleSubmit}>
              Go Next
            </button>
          </Link>
      </div>

      <div className="goal-page-owl">

      <img src={goalOwl} alt="" className="goalOwlImg" /> 

      </div>
      
    </div>
  );
}

function EatingPage({ setBreakfast, setLunch, setDinner, setSnack }) {
  const [localBreakfast, setLocalBreakfast] = useState('');
  const [localLunch, setLocalLunch] = useState('');
  const [localDinner, setLocalDinner] = useState('');
  const [localSnack, setLocalSnack] = useState('');
  const [searchTermBreakfast, setSearchTermBreakfast] = useState('');
  const [searchTermLunch, setSearchTermLunch] = useState('');
  const [searchTermDinner, setSearchTermDinner] = useState('');
  const [searchTermSnack, setSearchTermSnack] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [allFoods, setAllFoods] = useState([]);
  const [selectedItemBreakfast, setSelectedItemBreakfast] = useState(null);  // Track selected item for Breakfast
  const [selectedItemLunch, setSelectedItemLunch] = useState(null);  // Track selected item for Lunch
  const [selectedItemDinner, setSelectedItemDinner] = useState(null);  // Track selected item for Dinner
  const [selectedItemSnack, setSelectedItemSnack] = useState(null);  // Track selected item for Snack
  const [hoveredItem, setHoveredItem] = useState(null);  // Track hovered item
  const [showResultsBreakfast, setShowResultsBreakfast] = useState(true); // Track visibility of results
  const [showResultsLunch, setShowResultsLunch] = useState(true);
  const [showResultsDinner, setShowResultsDinner] = useState(true);
  const [showResultsSnack, setShowResultsSnack] = useState(true);
  const navigate = useNavigate();

  // Load and parse the CSV data
  useEffect(() => {
    const fetchData = async () => {
      const data = await loadCSV();
      setAllFoods(data);
    };

    fetchData();
  }, []);

  // Filter the results based on the search term for each category
  const filterResults = (searchTerm) => {
    if (searchTerm === '') {
      return [];
    } else {
      return allFoods.filter(food =>
        food.food_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  };

  // Handle the input change for each category
  const handleInputChange = (e, category) => {
    if (category === 'Breakfast') setSearchTermBreakfast(e.target.value);
    if (category === 'Lunch') setSearchTermLunch(e.target.value);
    if (category === 'Dinner') setSearchTermDinner(e.target.value);
    if (category === 'Snack') setSearchTermSnack(e.target.value);
  };

  // Handle the click on a food item and set it to the respective category state
  const handleFoodClick = (foodName, category) => {
    if (category === 'Breakfast') {
      setLocalBreakfast(foodName);
      setSelectedItemBreakfast(foodName);
      setShowResultsBreakfast(false); // Hide results after selection
    } else if (category === 'Lunch') {
      setLocalLunch(foodName);
      setSelectedItemLunch(foodName);
      setShowResultsLunch(false); // Hide results after selection
    } else if (category === 'Dinner') {
      setLocalDinner(foodName);
      setSelectedItemDinner(foodName);
      setShowResultsDinner(false); // Hide results after selection
    } else if (category === 'Snack') {
      setLocalSnack(foodName);
      setSelectedItemSnack(foodName);
      setShowResultsSnack(false); // Hide results after selection
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    setBreakfast(localBreakfast);
    setLunch(localLunch);
    setDinner(localDinner);
    setSnack(localSnack);
  };

  return (
    <div className="eating-page">
      <h1 style={{ color:'white'}}>Food Journal</h1>
      <div className="form-container-eating">
        <label style={{ color:'white'}}>Breakfast: </label>
        <input
          type="text"
          value={searchTermBreakfast}
          onChange={(e) => handleInputChange(e, 'Breakfast')}
          placeholder="Search for Breakfast..."
        />
        {showResultsBreakfast && (
          <div className="scrollable-results">
            <ul>
              {filterResults(searchTermBreakfast).map((food, index) => (
                <li
                  key={index}
                  onClick={() => handleFoodClick(food.food_name, 'Breakfast')}
                  onMouseEnter={() => setHoveredItem(food.food_name)}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={{
                    cursor: 'pointer',
                    padding: '5px',
                    backgroundColor:
                      selectedItemBreakfast === food.food_name
                        ? '#19634c'
                        : hoveredItem === food.food_name
                        ? '#e9f6f4'
                        : '#8ab3a8',
                    color:
                      selectedItemBreakfast === food.food_name || hoveredItem === food.food_name
                        ? 'black'
                        : 'black',
                  }}
                >
                  {food.food_name}
                </li>
              ))}
            </ul>
          </div>
        )}

        <label style={{ color:'white'}}>Lunch: </label>
        <input
          type="text"
          value={searchTermLunch}
          onChange={(e) => handleInputChange(e, 'Lunch')}
          placeholder="Search for Lunch..."
        />
        {showResultsLunch && (
          <div className="scrollable-results">
            <ul>
              {filterResults(searchTermLunch).map((food, index) => (
                <li
                  key={index}
                  onClick={() => handleFoodClick(food.food_name, 'Lunch')}
                  onMouseEnter={() => setHoveredItem(food.food_name)}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={{
                    cursor: 'pointer',
                    padding: '5px',
                    backgroundColor:
                      selectedItemLunch === food.food_name
                        ? '#19634c'
                        : hoveredItem === food.food_name
                        ? '#e9f6f4'
                        : '#8ab3a8',
                    color:
                      selectedItemLunch === food.food_name || hoveredItem === food.food_name
                        ? 'black'
                        : 'black',
                  }}
                >
                  {food.food_name}
                </li>
              ))}
            </ul>
          </div>
        )}

        <label style={{ color:'white'}}>Dinner: </label>
        <input
          type="text"
          value={searchTermDinner}
          onChange={(e) => handleInputChange(e, 'Dinner')}
          placeholder="Search for Dinner..."
        />
        {showResultsDinner && (
          <div className="scrollable-results">
            <ul>
              {filterResults(searchTermDinner).map((food, index) => (
                <li
                  key={index}
                  onClick={() => handleFoodClick(food.food_name, 'Dinner')}
                  onMouseEnter={() => setHoveredItem(food.food_name)}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={{
                    cursor: 'pointer',
                    padding: '5px',
                    backgroundColor:
                      selectedItemDinner === food.food_name
                        ? '#19634c'
                        : hoveredItem === food.food_name
                        ? '#e9f6f4'
                        : '#8ab3a8',
                    color:
                      selectedItemDinner === food.food_name || hoveredItem === food.food_name
                        ? 'black'
                        : 'black',
                  }}
                >
                  {food.food_name}
                </li>
              ))}
            </ul>
          </div>
        )}

        <label style={{ color:'white'}}>Snack: </label>
        <input
          type="text"
          value={searchTermSnack}
          onChange={(e) => handleInputChange(e, 'Snack')}
          placeholder="Search for Snack..."
        />
        {showResultsSnack && (
          <div className="scrollable-results">
            <ul>
              {filterResults(searchTermSnack).map((food, index) => (
                <li
                  key={index}
                  onClick={() => handleFoodClick(food.food_name, 'Snack')}
                  onMouseEnter={() => setHoveredItem(food.food_name)}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={{
                    cursor: 'pointer',
                    padding: '5px',
                    backgroundColor:
                      selectedItemSnack === food.food_name
                        ? '#19634c'
                        : hoveredItem === food.food_name
                        ? '#e9f6f4'
                        : '#8ab3a8',
                    color:
                      selectedItemSnack === food.food_name || hoveredItem === food.food_name
                        ? 'black'
                        : 'black',
                  }}
                >
                  {food.food_name}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <div>Selected Breakfast: {localBreakfast ? localBreakfast : 'None'}</div>
          <div>Selected Lunch: {localLunch ? localLunch : 'None'}</div>
          <div>Selected Dinner: {localDinner ? localDinner : 'None'}</div>
          <div>Selected Snack: {localSnack ? localSnack : 'None'}</div>
        </div>

        <div className="buttons">
          <button
            className="back-button"
            onClick={() => navigate(-1)}
          >
            Back
          </button>

          <Link to="/result">
            <button className="submit-button" onClick={handleSubmit}>
              Submit
            </button>
          </Link>    
        </div>  
          </div>

        <div className="eating-page-owl">

        <img src={eatingOwl} alt="" className="eatingOwlImg" /> 

        </div>

    </div>
  );
}

function ResultPage({ breakfast, lunch, dinner, snack, setCalorie, setSodium, setSugar, mc, goal }) {
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalSodium, setTotalSodium] = useState(0);
  const [totalSugar, setTotalSugar] = useState(0);
  const [recommendations, setRecommendations] = useState({ breakfast: '', lunch: '', dinner: '', snack: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const calculateTotalsAndRecommendations = async () => {
      const data = await loadCSV();

      const selectedFoods = { breakfast, lunch, dinner, snack };
      let calorieSum = 0, sodiumSum = 0, sugarSum = 0;
      let newRecommendations = {};

      Object.keys(selectedFoods).forEach(meal => {
        const selectedFood = selectedFoods[meal];
        const foodData = data.find(food => food.food_name === selectedFood);

        if (foodData) {
          calorieSum += parseInt(foodData.Calories, 10);
          sodiumSum += parseInt(foodData.Sodium, 10);
          sugarSum += parseInt(foodData.Sugars, 10);

          const mealRecommendation = recommendLowSodiumOption(data, selectedFood, foodData.Category, parseInt(foodData.Sodium, 10));
          newRecommendations[meal] = mealRecommendation;
        } else {
          newRecommendations[meal] = `No data available for ${selectedFood}`;
        }
      });

      setTotalCalories(calorieSum);
      setTotalSodium(sodiumSum);
      setTotalSugar(sugarSum);
      setRecommendations(newRecommendations);
      setCalorie(calorieSum);
      setSodium(sodiumSum);
      setSugar(sugarSum);
    };

    calculateTotalsAndRecommendations();
  }, [breakfast, lunch, dinner, snack, setCalorie, setSodium, setSugar]);

  const recommendLowSodiumOption = (data, itemName, category, itemSodium) => {
    // Filter by category, excluding the selected item, and parse sodium values
    const categoryItems = data.filter(food => food.Category === category && food.food_name !== itemName);
    const sortedBySodium = categoryItems
      .map(food => ({
        ...food,
        Sodium: parseInt(food.Sodium, 10),
      }))
      .filter(food => !isNaN(food.Sodium)) // Ensure valid sodium data
      .sort((a, b) => a.Sodium - b.Sodium);

    // Debugging output for category checks
    console.log(`Category: ${category}`, sortedBySodium);

    // Check if sorted items exist and if selected item has the lowest sodium
    if (sortedBySodium.length === 0 || itemSodium <= sortedBySodium[0].Sodium) {
      return "You've chosen the best option for low sodium!";
    }

    // Recommend the lowest sodium item
    return `Consider ${sortedBySodium[0].food_name} with ${sortedBySodium[0].Sodium}mg of sodium.`;
  };

  return (
    <div className="container">
    <div className="recommendation-summary">
      <div className="summary">
        <h2 style={{ color:'white'}}>Your Daily Nutritional Summary</h2>
        <p style={{ color:'white'}}>Total Calories: {totalCalories} cal</p>
        <p style={{ color:'white'}}>Total Sodium: {totalSodium} mg</p>
        <p style={{ color:'white'}}>Total Sugar: {totalSugar} g</p>
  
        <button className="back-button" onClick={() => navigate(-1)}>Back</button>
      </div>
  
      <div className="divider"></div>
  
      <div className="recommendations">
        <h2 style={{ color:'white'}}>Recommendations</h2>
        <p style={{ color:'white'}}>Breakfast: {recommendations.breakfast}</p>
        <p style={{ color:'white'}}>Lunch: {recommendations.lunch}</p>
        <p style={{ color:'white'}}>Dinner: {recommendations.dinner}</p>
        <p style={{ color:'white'}}>Snack: {recommendations.snack}</p>
        <Link to="/eating">
          <button className="next-button">New Food Entry</button>
        </Link>
      </div>
    </div>
  
    <div className="result-page-owl">
      {goal === "lose_weight" ? (
        <img src={adviceOwl1} alt="Advice Owl for Weight Loss" className="adviceOwl1Img" />
      ) : goal === "gain_muscle" ? (
        <img src={adviceOwlMuscle} alt="Advice Owl for Muscle Gain" className="adviceOwlMuscleImg" />
      ) : null}
    </div>      
  </div>
  
  );
}

export default App;
