function Progress({
  totalQuestionCount,
  currentQuestionIndex,
  totalPoints,
  points,
}) {
  return (
    <section className="progress">
      <progress
        min={1}
        max={totalQuestionCount - 1}
        value={currentQuestionIndex}
      />
      <p>
        Question <strong>{currentQuestionIndex + 1}</strong> /
        {totalQuestionCount}
      </p>
      <p>
        <strong>{points}</strong>/ {totalPoints}
      </p>
    </section>
  );
}

export default Progress;
