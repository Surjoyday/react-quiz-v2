function StartScreen({ totalQuestionCount, onStartQuiz }) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz</h2>
      <h3>{totalQuestionCount} questions to test your mastery</h3>
      <button onClick={onStartQuiz} className="btn btn-ui">
        Let&apos;s start
      </button>
    </div>
  );
}

export default StartScreen;
