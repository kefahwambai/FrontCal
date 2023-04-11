import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function Login({ setUser }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    fetch("https://calorietrack.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user);
          navigate("/");
        });
      } else {
        setLoginError(true);
      }
    });
  }

  return (
    
    <div className="form">
       <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
        </div>
        <form class="loginform" onSubmit={handleSubmit}>
        <h3>Login Here</h3>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>Don't have an account? <a href ="#"><Link to="/Signup">Signup</Link></a></p>
        {loginError && <p className="error">Invalid username or password</p>}
        <button type="submit">Login</button>
      
    </form>
    </div>
  );
}

export default Login;