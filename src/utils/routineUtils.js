export const validateRoutine = (name, existingRoutines) => {
    const errors = {};
    if (!name.trim()) {
      errors.routineName = "Routine name is required.";
    }
    if (existingRoutines.length >= 3) {
      errors.maxRoutines = "You can only save up to 3 routines.";
    }
    return errors;
  };
  
  export const validateExercise = (exercise) => {
    const errors = {};
    if (!exercise.name.trim()) errors.name = "Exercise name is required.";
    if (!exercise.sets || exercise.sets < 1) errors.sets = "At least 1 set is required.";
    if (!exercise.reps || exercise.reps < 1) errors.reps = "At least 1 rep is required.";
    return errors;
  };
  