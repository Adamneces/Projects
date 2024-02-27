import React, { useState, useEffect } from "react";
import Meal from "./Meal";

const Meals = () => {
  const [loadedMeals, setLoadedMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      const response = await fetch("http://localhost:3000/meals");

      if (!response.ok) {
      }
      const meals = await response.json();
      setLoadedMeals(meals);
    }
    fetchMeals();
  }, []);

  return (
    <ul id="meals">
      {loadedMeals.map((item) => (
        <Meal key={item.id} meal={item} />
      ))}
    </ul>
  );
};

export default Meals;
