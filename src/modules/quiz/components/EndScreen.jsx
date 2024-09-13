import { Button } from "@modules/common/components";

function EndScreen({ points, totalPoints, highScore, dispatch, changeStatus }) {
  const percentage = Math.ceil((points / totalPoints) * 100);

  let emjoiBasedOnPerformance;

  switch (percentage) {
    case percentage === 100:
      emjoiBasedOnPerformance = "🥇";
      break;
    case percentage >= 80 && percentage < 100:
      emjoiBasedOnPerformance = "🥈";
      break;
    case percentage >= 50 && percentage < 80:
      emjoiBasedOnPerformance = "🥉";
      break;
    case percentage >= 30 && percentage < 50:
      emjoiBasedOnPerformance = "🙃";
      break;
    case percentage === 0:
      emjoiBasedOnPerformance = "🤦";
      break;
    default:
      emjoiBasedOnPerformance = "💪";
      break;
  }

  return (
    <section>
      <p className="result">
        {emjoiBasedOnPerformance} You scrored <strong>{points}</strong> out of
        {totalPoints} ({percentage}
        %)
      </p>
      <p className="highscore">(Highscore: {highScore} points)</p>
      <Button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "reset" });
          changeStatus("ready");
        }}
      >
        Reset
      </Button>
    </section>
  );
}

export default EndScreen;
