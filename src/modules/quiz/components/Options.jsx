export default function Options({ question, dispatch, selectedOption }) {
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <OptionButtons
          key={index}
          dispatch={dispatch}
          index={index}
          selectedOption={selectedOption}
          question={question}
          option={option}
        />
      ))}
    </div>
  );
}

function OptionButtons({ dispatch, index, selectedOption, question, option }) {
  const { correctOption, points } = question;
  const hasAnswered = selectedOption !== null;
  return (
    <>
      <button
        onClick={() =>
          dispatch({
            type: "answer/selected",
            payload: { index, points: index === correctOption ? points : 0 },
          })
        }
        className={`btn btn-option ${
          index === selectedOption ? "answer" : ""
        } ${
          hasAnswered ? (index === correctOption ? "correct" : "wrong") : ""
        }`}
        disabled={hasAnswered}
      >
        {option}
      </button>
    </>
  );
}
