import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Login.css"
import 'font-awesome/css/font-awesome.min.css';


function Login({ setUser }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [signupError, setSignupError] = useState("");
  const [loginError, setLoginError] = useState(false);

 useEffect(() => {
  const signUpButton = document.getElementById('signUp');
  const signInButton = document.getElementById('signIn');
  const container = document.getElementById('container');

  if (signUpButton && signInButton && container) {
    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
    });
  }

  return () => {
    if (signUpButton && signInButton && container) {
      signUpButton.removeEventListener('click', () => {
        container.classList.add("right-panel-active");
      });

      signInButton.removeEventListener('click', () => {
        container.classList.remove("right-panel-active");
      });
    }
  };
}, []);


 
  const getIndicator = (password) => {
    let strengthValue = {
      upper: false,
      lower: false,
      numbers: false,
    };

    for (let index = 0; index < password.length; index++) {
      let char = password.charCodeAt(index);
      if (!strengthValue.upper && char >= 65 && char <= 90) {
        strengthValue.upper = true;
      } else if (!strengthValue.numbers && char >= 48 && char <= 57) {
        strengthValue.numbers = true;
      } else if (!strengthValue.lower && char >= 97 && char <= 122) {
        strengthValue.lower = true;
      }
    }

    let indicator = "";
    let count = 0;
    for (let check in strengthValue) {
      if (strengthValue[check] === true) {
        count += 1;
      }
    }
    if (count === 1) {
      indicator = "weak";
    } else if (count === 2) {
      indicator = "medium";
    } else if (count === 3) {
      indicator = "strong";
    }

    return indicator;
  };

  const passwordStrength = getIndicator(password);

  function handleSubmit(e) {
    e.preventDefault();
    
    // check if any fields are missing
    const missingFields = [];
    if (!username) {
      missingFields.push("username");
    }
    if (!email) {
      missingFields.push("email");
    }
    if (!password) {
      missingFields.push("password");
    }
        
    // show error message if any fields are missing
    if (missingFields.length > 0) {
      setSignupError(`Please fill in the following fields: ${missingFields.join(", ")}`);
      return;
    }
  
    // proceed with signup if all fields are filled in
    fetch("https://calorietrack.onrender.com/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, firstname, lastname, email, password, passwordConfirmation }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user);
          navigate("/");
        });
      } else {
        setSignupError("Signup failed. Please try again.");
      }
    });
  }
 

  // useEffect(() => {
  //   const signUpButton = document.getElementById('signUp');
  //   const signInButton = document.getElementById('signIn');
  //   const container = document.getElementById('container');

  //   if (container) {
  //     signUpButton.addEventListener('click', () => {
  //       container.classList.add("right-panel-active");
  //     });

  //     signInButton.addEventListener('click', () => {
  //       container.classList.remove("right-panel-active");
  //     });
  //   }
  // }, []);

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
    <>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
                  <div class="container-fluid">
                    <a class="navbar-brand" href="#">Calorie Tracker</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                      <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                      <ul class="navbar-nav">
                        <li class="nav-item">
                          <a class="nav-link active" aria-current="page" href="#">Home</a>
                        </li>                 
                      </ul>
                    </div>
                  </div>
          </nav>
         
     
          <div class="container" id="container">
            <div class="form-container sign-up-container">
            <form onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <div class="social-container">
              <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
              <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
              <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
            </div>         
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              id="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}            
            />
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              id="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}            
            />
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />           
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <div className={`password-strength ${passwordStrength}`}>
              Password Strength: {passwordStrength}
            </div>
            <label htmlFor="password_confirmation">Password Confirmation</label>
            <input
              type="password"
              id="password_confirmation"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              autoComplete="current-password"
            />
            <button type="submit">Sign Up</button>
          </form>

            </div>
            <div class="form-container sign-in-container">
            <form class="loginform" onSubmit={handleSubmit}>
                        <h3>Login Here</h3>
                        <div class="social-container">
                        <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                        <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
                      </div>

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
                        {loginError && <p className="error">Invalid username or password</p>}
                        <button type="submit">Login</button>
                      
                    </form>
            </div>
            <div class="overlay-container">
              <div class="overlay">
                <div class="overlay-panel overlay-left">
                  <h1>Welcome Back!</h1>
                  <p>To keep connected with us please login with your personal info</p>
                  <button class="ghost" id="signIn">Sign In</button>
                </div>
                <div class="overlay-panel overlay-right">
                  <h1>Hello, Friend!</h1>
                  <p>Enter your personal details and start journey with us</p>
                  <button class="ghost" id="signUp">Sign Up</button>
                </div>
              </div>
            </div>
          </div>


              </>
    
   



  );
}

export default Login;
