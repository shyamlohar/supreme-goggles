import { useReducer } from "react";

export const useToggle = (initialState = false) => {
  const [toggleStatus, toggle] = useReducer((flag) => !flag, initialState);
  return [toggleStatus, toggle] as const;
};
