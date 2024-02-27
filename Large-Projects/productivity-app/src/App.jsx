import ToDoApp from "./widgets/toDoApp/ToDoApp";
import "../src/index.css";
import HabitTrackerApp from "./widgets/habitTrackerApp/HabitTrackerApp";
import TimerWidget from "./widgets/timerWidget/TimerWidget";

function App() {
  return (
    <div style={{display: 'flex', flexWrap: 'wrap'}}>
    <ToDoApp />
    <HabitTrackerApp />
    <TimerWidget />
    </div>
  )
}

export default App;
