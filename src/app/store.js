import { configureStore } from "@reduxjs/toolkit";
import routinesReducer from "../features/routinesSlice";
import exercisesReducer from "../features/exercisesSlice";

export const store = configureStore({
  reducer: {
    routines: routinesReducer,
    exercises: exercisesReducer,
  },
});

console.log("Redux store is being initialized:", store);

export default store;
