import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home(props) {
  const user = props.user;
  const [targetWeight, setTargetWeight] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

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

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="home">
      {user ? (
        <>
          <p>Current Date and Time: {currentDateTime.toLocaleString()}</p>
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
