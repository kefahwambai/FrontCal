import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home(props) {
  const user = props.user;
  const [targetWeight, setTargetWeight] = useState(null);
  const currentDateTime = new Date().toLocaleString();

  useEffect(() => {
    if (user) {
      fetch(`https://calorietrack.onrender.com/goals?user_id=${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setTargetWeight(data.target_weight);
        });
    }
  }, [user]);

  return (
    <div className="home">
      {user ? (
        <>
          <p>Current Date and Time: {currentDateTime}</p>
          Hey {user.username}!
          
          {targetWeight !== null && <p>current Target Weight: {targetWeight} lbs</p>}
          <p>Log in <a href="#">
            <Link to="/foods">Meal</Link>
          </a></p>
        </>
      ) : (
        <>
          Please login to continue!
          <a href="#">
            <Link to="/login">Login</Link>
          </a>
        </>
      )}
    </div>
  );
}

export default Home;



// import React, { useState } from "react";
// import MealsList from "../../components/meals/MealsList";
// import "./home.css";

// function Home({ user }) {
//   const [dailyCalorieGoal, setDailyCalorieGoal] = useState("");
//   const [inputValue, setInputValue] = useState("");

//   const handleInputValueChange = (event) => {
//     setInputValue(event.target.value);
//   };

//   const handleFormSubmit = (event) => {
//     event.preventDefault();
//     setDailyCalorieGoal(inputValue);
//     setInputValue("");
//   };

//   return (
//     <>
//       <div className="home">
//         <div className="goal-container">
//           <form onSubmit={handleFormSubmit}>
//             <label className="goal-label" htmlFor="dailyCalorieGoalInput">
//               Set Daily Calorie Goal:
//             </label>
//             <input
//               className="goal-input"
//               type="number"
//               id="dailyCalorieGoalInput"
//               name="dailyCalorieGoalInput"
//               value={inputValue}
//               onChange={handleInputValueChange}
//             />
//             <button className="submit-button" type="submit">
//               Set
//             </button>
//           </form>
//         </div>
//         <p className="daily-goal">
//           Daily Calorie Goal:{" "}
//           <span className="calorie-count">{dailyCalorieGoal}</span>
//         </p>
//         <MealsList
//           className="meals-list"
//           user={user}
//           dailyCalorieGoal={dailyCalorieGoal}
//         />
        
//       </div>
//     </>
//   );
// }

// export default Home;