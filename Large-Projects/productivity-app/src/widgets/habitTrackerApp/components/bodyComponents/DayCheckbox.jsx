import React, { useState, useEffect } from "react";

const DayCheckbox = ({ label, value, onChange, checked }) => {
  const [isChecked, setChecked] = useState(checked);

  useEffect(() => {
    // Update the local state when the parent component changes the checked prop
    setChecked(checked);
  }, [checked]);

  const handleCheckboxChange = (event) => {
    const newCheckedValue = event.target.checked;
    setChecked(newCheckedValue);

    // Notify the parent component about the change
    onChange && onChange(newCheckedValue);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <label>{label}</label>
      <input
        type="checkbox"
        value={value}
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
    </div>
  );
};

export default DayCheckbox;