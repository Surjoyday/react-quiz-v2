import { useEffect, useRef, useState } from "react";

function useCountDown(timeInSeconds, actionOne, abortAction, actionTwo) {
  const [timeRemaining, setTimeRemaining] = useState(timeInSeconds);

  const countDownRef = useRef(null);

  useEffect(function () {
    countDownRef.current = setInterval(() => {
      setTimeRemaining((currTimeRemaining) => {
        if (currTimeRemaining < 1) {
          clearInterval(countDownRef.current);
          return 0;
        }

        return currTimeRemaining - 1;
      });
    }, 1000);

    return () => {
      clearInterval(countDownRef.current);
    };
  }, []);

  useEffect(
    function () {
      if (!abortAction && timeRemaining < 1) {
        actionOne?.();
      }

      if (abortAction && timeRemaining < 1) {
        actionTwo?.("finished");
      }
    },
    [timeRemaining, abortAction, actionOne, actionTwo]
  );

  return { min: Math.floor(timeRemaining / 60), sec: timeRemaining % 60 };
}

export { useCountDown };
