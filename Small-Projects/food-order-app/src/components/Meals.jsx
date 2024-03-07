import Meal from "./Meal";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {};

const Meals = () => {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  if (isLoading) {
    return <p className="center">Loading meals...</p>;
  }

  if (error){
    return <Error title="Failed to load meals" message={error} />
  }

  return (
    <ul id="meals">
      {loadedMeals.map((item) => (
        <Meal key={item.id} meal={item} />
      ))}
    </ul>
  );
};

export default Meals;