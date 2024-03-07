import Counter from "./components/Counter";
import Header from "./components/Header.js";
import Auth from "./components/Auth.js";
import UserProfile from "./components/UserProfile.js";

import { useSelector } from "react-redux";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      <Header />
      {isAuthenticated ? <UserProfile /> : <Auth />}
      <Counter />
    </>
  );
}

export default App;
