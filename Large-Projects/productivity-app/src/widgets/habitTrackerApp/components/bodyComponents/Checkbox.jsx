import React from "react";

const Checkbox = ({ day }) => {
  return (
    <div>
      {day ? (
        <input
          style={{
            width: "18px",
            height: "18px",
          }}
          type="checkbox"
          name={day}
        />
      ) : (
        <span style={{ color: "white" }}>-</span>
      )}
    </div>
  );
};

export default Checkbox;
