import ToDoApp from "./widgets/toDoApp/ToDoApp";
import "../src/index.css";
import HabitTrackerApp from "./widgets/habitTrackerApp/HabitTrackerApp";

function App() {
  return (
    <div style={{display: 'flex'}}>
    <ToDoApp />
    <HabitTrackerApp />
    </div>
  )
}

export default App;
