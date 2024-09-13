import { Button } from "@modules/common/components";
import { Options, Timer } from "@modules/quiz/components";

export default function Question({
  question,
  dispatch,
  selectedOption,
  isTheLastQuestion,
  changeStatus,
  timeForEachQuestion,
}) {
  const showNextButton = !isTheLastQuestion && selectedOption !== null;

  const showFinishButton = isTheLastQuestion && selectedOption !== null;

  return (
    <div>
      <h4>{question.question}</h4>

      <Options
        question={question}
        dispatch={dispatch}
        selectedOption={selectedOption}
      />

      <Timer
        key={question.question}
        moveToNext={() => dispatch({ type: "question/next" })}
        isTheLastQuestion={isTheLastQuestion}
        changeStatus={changeStatus}
        timeInSeconds={timeForEachQuestion}
      />

      {showNextButton && (
        <Button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "question/next" })}
        >
          Next
        </Button>
      )}

      {showFinishButton && (
        <Button className="btn btn-ui" onClick={() => changeStatus("finished")}>
          Finish
        </Button>
      )}
    </div>
  );
}
