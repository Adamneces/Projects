import { useState } from "react";

export function useInput(defaultValue, validationFn) {
  const [userData, setUserData] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  const valueIsValid = validationFn(userData);

  function handleInputChange(event) {
    setUserData(event.target.value);
    setDidEdit(false);
  }

  function handleInputBlur() {
    setDidEdit(true);
  }

  return {
    value: userData,
    handleInputChange,
    handleInputBlur,
    hasError: didEdit && !valueIsValid,
  };
}
