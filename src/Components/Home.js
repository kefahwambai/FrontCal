import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css"

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
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
              <a class="navbar-brand" href="#">Calorie Tracker</a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                  <li class="nav-item">
                  <Link to="/">Home</Link>
                  </li>                 
                </ul>
              </div>
            </div>
    </nav>
      {user ? (
        <>
          <p className="Time">Current Date and Time: {currentDateTime.toLocaleString()}</p>
          Hey {user.username}!
          
          {targetWeight !== null && <p>current Target Weight: {targetWeight} lbs</p>}
          <p className="Meal">Log in <a href="#">
            <Link to="/foods">Meal</Link>
          </a></p>
        </>
      ) : (
       
        <div class="Container">
        <input type="radio" name="slider" id="slide-1-trigger" class="trigger" checked />
        <label class="btn" for="slide-1-trigger"></label>
        <input type="radio" name="slider" id="slide-2-trigger" class="trigger" />
        <label class="btn" for="slide-2-trigger"></label>
        <input type="radio" name="slider" id="slide-3-trigger" class="trigger" />
        <label class="btn" for="slide-3-trigger"></label>
        <input type="radio" name="slider" id="slide-4-trigger" class="trigger" />
        <label class="btn" for="slide-4-trigger"></label>
        <div class="slide-wrapper">
          <div id="slide-role">
            <div class="slide slide-1"></div>
            <div class="slide slide-2"></div>
            <div class="slide slide-3"></div>
            <div class="slide slide-4"></div>
          </div>
        </div>
        <p className="hmelgn">Have an Account? <a href="#">
      <Link to="/login">Login</Link>
    </a> </p>      
      </div>
       
      
      )}
    </div>
  );
}

export default Home;

