import { useReducer } from "react";

const initialState = {
  count: 0,
  step: 1,
};

function reducer(state, action) {
  switch (action.type) {
    case "inc/count":
      return { ...state, count: state.count + state.step };

    case "dec/count":
      return { ...state, count: state.count - state.step };

    case "define/count":
      return { ...state, count: +action.payload };

    case "define/step":
      return { ...state, step: +action.payload };

    case "reset":
      return initialState;

    default:
      throw new Error("Unknown action");
  }
}

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "dec/count" });
  };

  const inc = function () {
    dispatch({ type: "inc/count" });
  };

  const defineCount = function (e) {
    const value = e.target.value;
    dispatch({ type: "define/count", payload: value });
  };

  const defineStep = function (e) {
    const value = e.target.value;
    dispatch({ type: "define/step", payload: value });
  };

  const reset = function () {
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
