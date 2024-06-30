import { useState } from "react";
import classes from "./Counter.module.css";
import { counterActions } from "../store/counter-slice";
import { useSelector, useDispatch } from "react-redux";

const Counter = () => {
  const [increaseBy, setIncreaseBy] = useState(1);

  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter.counter);
  const showCounter = useSelector((state) => state.counter.showCounter);

  const incrementHandler = () => {
    dispatch(counterActions.increment());
  };

  const increaseHandler = (value) => {
    dispatch(counterActions.increase(value)); // {type: some_unique_identifier, payload: 'value'}
  };

  const decrementHandler = () => {
    dispatch(counterActions.decrement());
  };

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter());
  };
  const resetHandler = () => {
    dispatch(counterActions.reset());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={decrementHandler}>Decrement</button>
        <button onClick={() => increaseHandler(Number(increaseBy))}>
          Increase by {increaseBy}
        </button>
        <button onClick={incrementHandler}>Increment</button>
      </div>
      <button onClick={resetHandler}>Reset</button>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
      <input
        placeholder="5..."
        className={classes.input}
        type="number"
        onChange={(e) => setIncreaseBy(e.target.value)}
      />
    </main>
  );
};

export default Counter;
