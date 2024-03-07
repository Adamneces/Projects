import ToDoApp from "./widgets/toDoApp/ToDoApp";
import "../src/index.css";
import HabitTrackerApp from "./widgets/habitTrackerApp/HabitTrackerApp";
import TimerWidget from "./widgets/timerWidget/TimerWidget";

import { TimerProvider } from "./widgets/timerWidget/store/TimerContext";
import NewsWidget from "./widgets/newsWidget/NewsWidget";
import MoodWidget from "./widgets/moodWidget/MoodWidget";

function App() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <ToDoApp />
      <HabitTrackerApp />
      <TimerProvider>
        <TimerWidget />
      </TimerProvider>
      <NewsWidget />
      <MoodWidget />
    </div>
  );
}

export default App;
