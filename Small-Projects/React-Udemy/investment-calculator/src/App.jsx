import Header from "./components/Header"
import Results from "./components/Results";
import UserInput from "./components/UserInput"
import { useState } from "react";

function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: null,
    annualInvestment: null,
    expectedReturn: null,
    duration: null
});

function handleChange(inputIdentifier ,newValue){
  setUserInput(prevUserInput => {
      return {
          ...prevUserInput,
          [inputIdentifier]: +newValue
      }
  });
}

const inputIsValid = userInput.duration > 0;

  return (
    <>
    <Header />
    <UserInput onChange={handleChange} userInput={userInput}/>
    {inputIsValid ? 
    <Results userInput={userInput} /> :
    <h2 className="center">Please enter a valid duration</h2>}
    </>
  )
}

export default App
