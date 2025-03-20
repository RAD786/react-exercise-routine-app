import { useState } from "react";
import { useDispatch } from "react-redux";
import { addExercise } from "../features/routinesSlice";
import { validateExercise } from "../utils/routineUtils";
import { Form, Input, Button } from "reactstrap";

const ExerciseForm = ({ routineId }) => {
  const [exercise, setExercise] = useState({ name: "", sets: "", reps: "", weight: "" });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateExercise(exercise);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    dispatch(addExercise({ routineId, exercise }));
    setExercise({ name: "", sets: "", reps: "", weight: "" });
    setErrors({});
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input type="text" placeholder="Exercise Name" value={exercise.name} onChange={(e) => setExercise({ ...exercise, name: e.target.value })} />
      <Input type="number" placeholder="Sets" value={exercise.sets} onChange={(e) => setExercise({ ...exercise, sets: e.target.value })} />
      <Input type="number" placeholder="Reps" value={exercise.reps} onChange={(e) => setExercise({ ...exercise, reps: e.target.value })} />
      <Input type="number" placeholder="Weight (lbs)" value={exercise.weight} onChange={(e) => setExercise({ ...exercise, weight: e.target.value })} />
      <Button type="submit" color="primary" className="mt-2">
        Add Exercise
      </Button>
    </Form>
  );
};

export default ExerciseForm;
