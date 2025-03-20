import { createSlice } from "@reduxjs/toolkit";

const MAX_ROUTINES = 3;

const routinesSlice = createSlice({
  name: "routines",
  initialState: [],
  reducers: {
    addRoutine: (state, action) => {
      if (state.length < MAX_ROUTINES) {
        return [...state, { id: Date.now(), name: action.payload, exercises: [] }];
      } else {
        alert("Max 3 routines allowed.");
        return state;
      }
    },
    deleteRoutine: (state, action) => {
      return state.filter((routine) => routine.id !== action.payload);
    },
    addExercise: (state, action) => {
      const { routineId, exercise } = action.payload;
      return state.map((routine) =>
        routine.id === routineId
          ? { ...routine, exercises: [...routine.exercises, { id: Date.now(), ...exercise }] }
          : routine
      );
    },
    editExercise: (state, action) => {
      const { routineId, exerciseId, updatedExercise } = action.payload;
      return state.map((routine) =>
        routine.id === routineId
          ? {
              ...routine,
              exercises: routine.exercises.map((ex) =>
                ex.id === exerciseId ? { ...ex, ...updatedExercise } : ex
              ),
            }
          : routine
      );
    },
    deleteExercise: (state, action) => {
      const { routineId, exerciseId } = action.payload;
      return state.map((routine) =>
        routine.id === routineId
          ? { ...routine, exercises: routine.exercises.filter((ex) => ex.id !== exerciseId) }
          : routine
      );
    },
  },
});

export const { addRoutine, deleteRoutine, addExercise, editExercise, deleteExercise } =
  routinesSlice.actions;
export default routinesSlice.reducer;
