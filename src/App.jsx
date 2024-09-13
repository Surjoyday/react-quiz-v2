import {
  Main,
  Header,
  StartScreen,
  Question,
  EndScreen,
} from "@modules/quiz/components";
import { Loader, Error } from "@modules/common/components";
import { Progress } from "@modules/details/components";

import { useFetchData } from "@modules/common/hooks";
import { useEffect, useReducer } from "react";

const URL =
  "https://my-json-server.typicode.com/Surjoyday/react-quiz-v2/questions";

const initialState = {
  currentQuestionIndex: 0,
  selectedOption: null,
  points: 0,
  highScore: Number(localStorage.getItem("highScore") ?? 0),
};

function reducer(state, action) {
  switch (action.type) {
    case "question/next":
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        selectedOption: null,
      };

    case "answer/selected": {
      const { index, points } = action.payload;
      const newPoints = state.points + points;

      const newHighScore =
        newPoints > state.highScore ? newPoints : state.highScore;

      if (newHighScore > state.highScore)
        localStorage.setItem("highScore", newHighScore);

      return {
        ...state,
        selectedOption: index,
        points: newPoints,
        highScore: newHighScore,
      };
    }

    case "reset":
      return initialState;

    default:
      throw new Error("Unknown action");
  }
}

function App() {
  const [
    { currentQuestionIndex, selectedOption, points, highScore },
    dispatch,
  ] = useReducer(reducer, initialState);

  const [questions, status, changeStatus] = useFetchData(URL);

  const totalPoints = questions.reduce((acc, q) => acc + q.points, 0);

  const totalQuestionCount = questions.length;

  const isTheLastQuestion = currentQuestionIndex === totalQuestionCount - 1;

  // Nulish colesing opertor will ensure that if points is not a number (undefined or null) it will make points 0 and then add 60, else 60 will be added to the points
  const timeForEachQuestion =
    (questions?.at(currentQuestionIndex)?.points ?? 0) + 60;

  console.log(timeForEachQuestion);
  /// HANDLES DOCUMENT VISIBILTY -> IF USER MOVES TO A DIFFERENT TAB THE DOCUMENT VISIBILTY IS HIDDEN
  useEffect(
    function () {
      const handleVisibiltyChange = () => {
        if (document.hidden) {
          changeStatus("finished");
        }
      };

      document.addEventListener("visibilitychange", handleVisibiltyChange);

      return () =>
        document.removeEventListener("visibilitychange", handleVisibiltyChange);
    },
    [changeStatus]
  );

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            totalQuestionCount={totalQuestionCount}
            onStartQuiz={() => changeStatus("active")}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              totalQuestionCount={totalQuestionCount}
              currentQuestionIndex={currentQuestionIndex}
              totalPoints={totalPoints}
              points={points}
            />
            <Question
              question={questions.at(currentQuestionIndex)}
              dispatch={dispatch}
              selectedOption={selectedOption}
              isTheLastQuestion={isTheLastQuestion}
              changeStatus={changeStatus}
              timeForEachQuestion={timeForEachQuestion}
            />
          </>
        )}
        {status === "finished" && (
          <EndScreen
            points={points}
            totalPoints={totalPoints}
            highScore={highScore}
            dispatch={dispatch}
            changeStatus={changeStatus}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
