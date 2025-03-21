// Validate exercise input
export const validateExercise = (exercise) => {
  const errors = {};
  if (!exercise.name.trim()) {
    errors.name = "Exercise name is required";
  }
  if (!exercise.sets || isNaN(exercise.sets) || Number(exercise.sets) <= 0) {
    errors.sets = "Sets must be a positive number";
  }
  if (!exercise.reps || isNaN(exercise.reps) || Number(exercise.reps) <= 0) {
    errors.reps = "Reps must be a positive number";
  }
  if (
    exercise.weight &&
    (isNaN(exercise.weight) || Number(exercise.weight) < 0)
  ) {
    errors.weight = "Weight must be a non-negative number";
  }
  return errors;
};

export const validateRoutine = (name) => {
  if (!name.trim()) {
    return "Routine name is required";
  }
  return "";
};

export const formatExerciseData = (exerciseData) => {
  return {
    name: exerciseData.name,
    sets: Number(exerciseData.sets),
    reps: Number(exerciseData.reps),
    weight: exerciseData.weight ? Number(exerciseData.weight) : "",
  };
};
