import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  function navigateHandler(){
    navigate('/products')
  }

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={navigateHandler}>Navigate</button>
    </div>
  );
};

export default Home;
