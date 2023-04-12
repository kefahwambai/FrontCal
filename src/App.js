import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from "react";
import Home from "./Components/Home";
import Login from "./Components/Login"
import Foods from "./Components/Foods"
import Footer from './Components/Footer';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("https://calorietrack.onrender.com/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user);
          console.log(user); // log the updated value of user
        });
      }
    });
  }, []);
  
  return (
   <>
   <Routes>
   <Route path="/" element={<Home user={user}/>} />
   <Route path="/login" element={<Login setUser={setUser} />} />
   <Route path="/foods" element={<Foods />} />

   </Routes>
   {/* <Footer/> */}
   </>
  
  );
}

export default App;
