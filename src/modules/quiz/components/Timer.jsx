import { useCountDown } from "@modules/common/hooks";

function Timer({ moveToNext, isTheLastQuestion, changeStatus, timeInSeconds }) {
  const { min, sec } = useCountDown(
    timeInSeconds,
    moveToNext,
    isTheLastQuestion,
    changeStatus
  );
  return (
    <div className="timer">
      <span>{min < 10 ? String(min).padStart(2, "0") : min}</span>
      <span>:</span>
      <span>{sec < 10 ? String(sec).padStart(2, "0") : sec}</span>
    </div>
  );
}

export default Timer;
