import Player from "./components/Player.jsx";
import TimerChallenge from "./components/TimerChallenge.jsx";

function App() {
  return (
    <>
      <Player />
      <div id="challenges">
        <TimerChallenge title="Easy" targetTime={1} />
        <TimerChallenge title="Not So Easy" targetTime={5} />
        <TimerChallenge title="Getting rough" targetTime={10} />
        <TimerChallenge title="Legends only" targetTime={15} />
      </div>
    </>
  );
}

export default App;
