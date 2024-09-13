import { useEffect, useReducer } from "react";

const initialState = {
  data: [],
  // "loading", "error", "ready", "active", "finished"
  status: "loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "data/received": {
      return {
        ...state,
        data: action.payload,
        status: "ready",
      };
    }

    case "status/update":
      return { ...state, status: action.payload };

    case "data/failed":
      return { ...state, status: "error" };

    default:
      throw new Error("Unknow action");
  }
}

function useFetchData(URL) {
  const [{ data, status }, dispatch] = useReducer(reducer, initialState);

  function handleStatusChange(newStatus) {
    dispatch({ type: "status/update", payload: newStatus });
  }

  useEffect(
    function () {
      async function getData() {
        try {
          const res = await fetch(`${URL}`);

          if (!res.ok) throw new Error("HTTP REQUEST ERROR");

          const data = await res.json();
          dispatch({
            type: "data/received",
            payload: data,
          });
        } catch (err) {
          const errorMsg = err.message;
          // dispatch({ type: "data/failed", payload: errorMsg });
          // showBoundary(errorMsg);
        }
      }

      getData();
    },
    [URL]
  );

  return [data, status, handleStatusChange];
}

export { useFetchData };
