import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  routines: [],
};

export const routinesSlice = createSlice({
  name: "routines",
  initialState,
  reducers: {
    addRoutine: (state, action) => {
      state.routines.push({
        id: Date.now().toString(),
        name: action.payload,
        exercises: [],
      });
    },
    deleteRoutine: (state, action) => {
      state.routines = state.routines.filter(
        (routine) => routine.id !== action.payload
      );
    },
    updateRoutine: (state, action) => {
      const { id, name } = action.payload;
      const routine = state.routines.find(routine => routine.id === id);
      if (routine) {
        routine.name = name;
      }
    },
    addExercise: (state, action) => {
      const { routineId, exercise } = action.payload;
      const routine = state.routines.find(
        (routine) => routine.id === routineId
      );
      if (routine) {
        routine.exercises.push({
          id: Date.now().toString(),
          ...exercise,
        });
      }
    },
    deleteExercise: (state, action) => {
      const { routineId, exerciseId } = action.payload;
      const routine = state.routines.find(
        (routine) => routine.id === routineId
      );
      if (routine) {
        routine.exercises = routine.exercises.filter(
          (exercise) => exercise.id !== exerciseId
        );
      }
    },
    updateExercise: (state, action) => {
      const { routineId, exerciseId, exercise } = action.payload;
      const routine = state.routines.find(
        (routine) => routine.id === routineId
      );
      if (routine) {
        const exerciseIndex = routine.exercises.findIndex(
          (ex) => ex.id === exerciseId
        );
        if (exerciseIndex !== -1) {
          routine.exercises[exerciseIndex] = {
            ...routine.exercises[exerciseIndex],
            ...exercise,
          };
        }
      }
    },
  },
});

export const { 
  addRoutine, 
  deleteRoutine, 
  updateRoutine,
  addExercise, 
  deleteExercise,
  updateExercise 
} = routinesSlice.actions;

export default routinesSlice.reducer;
