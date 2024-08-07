import Header from "./components/Header.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import { useState } from "react";

function App() {
  const [didSingUp, setDidSignup] = useState(false);

  return (
    <>
      <Header />
      <main>
        {didSingUp ? <Login /> : <Signup setDidSignup={setDidSignup} />}
      </main>
    </>
  );
}

export default App;
