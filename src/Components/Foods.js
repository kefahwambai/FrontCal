import React, { useState, useEffect } from "react";

const Foods = ({ user }) => {
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);

  useEffect(() => {
    fetch("https://calorietrack.onrender.com/foods")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (Array.isArray(data)) {
          setFoods(data);
        } else {
          console.error("Returned data is not an array:", data);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const handleEdit = (updatedData) => {
    // Send a PUT request to update the selected food data on the server
    fetch(`https://calorietrack.onrender.com/foods/${updatedData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the local foods state with the updated data
        const updatedFoods = foods.map((food) =>
          food.id === data.id ? data : food
        );
        setFoods(updatedFoods);
        setSelectedFood(null);
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = (foodId) => {
    // Send a DELETE request to delete the selected food data from the server
    fetch(`https://calorietrack.onrender.com/foods/${foodId}`, {
      method: "DELETE",
    })
      .then(() => {
        // Update the local foods state by removing the selected food data
        const updatedFoods = foods.filter((food) => food.id !== foodId);
        setFoods(updatedFoods);
      })
      .catch((error) => console.error(error));
  };

  const handleAdd = (newFood) => {
    // Send a POST request to add the new food data to the server
    fetch("https://calorietrack.onrender.com/foods", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFood),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the local foods state with the new data
        setFoods([...foods, data]);
      })
      .catch((error) => console.error(error));
  };


  return (
    <>
      {/* <p className="total">
        Total Calories:
        <span> {foods.reduce((total, food) => total + food.kcal_per_g, 0)}</span>
      </p> */}

      <div className="Foods">
    <h2>Food List</h2>
    <ul>
      {foods.map((food) => (
        <li key={food.id}>
          <div className="food-item">
            <div>
              <strong>{food.name}</strong>
              <br/>
              <span>{food.kcal_per_g} calories</span>
            </div>
            <div>
              {/* <button onClick={() => setSelectedFood(food)}>Edit</button>
              <button onClick={() => handleDelete(food.id)}>Delete</button> */}
            </div>
          </div>
        </li>
      ))}
    </ul>
    {/* {selectedFood && (
      <EditFood
        food={selectedFood}
        handleEdit={handleEdit}
        handleCancel={() => setSelectedFood(null)}
      />
    )}
    <button onClick={() => setSelectedFood({})}>Add Food</button>
    {selectedFood && (
      <AddFood
        user={user}
        handleAdd={handleAdd}
        handleCancel={() => setSelectedFood(null)}
      />
    )} */}
  </div>
  </>
);
};

export default Foods