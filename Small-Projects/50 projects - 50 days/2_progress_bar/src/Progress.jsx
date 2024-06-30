import React, { useState } from "react";

export default function Progress() {
  const [index, setIndex] = useState(0);

  function indexIncrease() {
    setIndex((prev) => prev + 1);
  }
  function indexDecrease() {
    setIndex((prev) => prev - 1);
  }

  return (
    <div className="container">
      <div className="progress-container">
        <div style={{width: `${(index / 3) * 100}%` }} className="progress"></div>
        <div className="circle active">1</div>
        <div className={index > 0 ? "circle active" : "circle"}>2</div>
        <div className={index > 1 ? "circle active" : "circle"}>3</div>
        <div className={index > 2 ? "circle active" : "circle"}>4</div>
      </div>
      <button
        onClick={indexDecrease}
        disabled={index === 0}
        className="btn"
        id="prev"
      >
        Prev
      </button>
      <button disabled={index === 3} onClick={indexIncrease} className="btn" id="next">
        Next
      </button>
    </div>
  );
}
