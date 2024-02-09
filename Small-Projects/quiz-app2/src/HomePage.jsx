import React, { useState } from "react";
import QUIZES from "./Quizes.js";

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    "geography",
    "history",
    "science",
    "sports",
    "technology",
    "art",
  ];

  return (
    <div>
      <div>home page</div>
      <div className="categories-container">
        {categories.map((category) => (
          <button
            onClick={(e) => setSelectedCategory(e.target.value)}
            className="category-button"
            key={category}
            value={category}
          >
            {category}
          </button>
        ))}
      </div>

      {selectedCategory && (
        <div className="quizes-container">
          {QUIZES[selectedCategory].map((quiz) => {
            console.log(quiz.quiz)
            return (
              <button key={quiz.name} className="quiz-button">
                <h3>{quiz.name}</h3>
                <span>questions: {quiz.quiz.length} </span>
                <br />
                <span>difficulty: {quiz.difficulty} </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HomePage;
