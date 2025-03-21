import { useState } from "react";
import { useDispatch } from "react-redux";
import { addExercise } from "../features/routinesSlice";
import { validateExercise, formatExerciseData } from "../utils/routineUtils";
import { Form, FormGroup, Input, Button, FormFeedback } from "reactstrap";

const ExerciseForm = ({ routineId }) => {
  const [exercise, setExercise] = useState({ name: "", sets: "", reps: "", weight: "" });
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateExercise(exercise);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    const formattedExercise = formatExerciseData(exercise);
    
    dispatch(addExercise({ routineId, exercise: formattedExercise }));
    setExercise({ name: "", sets: "", reps: "", weight: "" });
    setErrors({});
    setFeedback("Exercise added successfully!");
    setTimeout(() => setFeedback(""), 3000);
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-3">
      <h6>Add New Exercise</h6>
      <FormGroup>
        <Input 
          type="text" 
          placeholder="Exercise Name" 
          value={exercise.name} 
          onChange={(e) => setExercise({ ...exercise, name: e.target.value })}
          invalid={!!errors.name}
        />
        {errors.name && <FormFeedback>{errors.name}</FormFeedback>}
      </FormGroup>
      
      <div className="row">
        <div className="col-md-4">
          <FormGroup>
            <Input 
              type="number" 
              placeholder="Sets" 
              value={exercise.sets} 
              onChange={(e) => setExercise({ ...exercise, sets: e.target.value })}
              invalid={!!errors.sets}
            />
            {errors.sets && <FormFeedback>{errors.sets}</FormFeedback>}
          </FormGroup>
        </div>
        
        <div className="col-md-4">
          <FormGroup>
            <Input 
              type="number" 
              placeholder="Reps" 
              value={exercise.reps} 
              onChange={(e) => setExercise({ ...exercise, reps: e.target.value })}
              invalid={!!errors.reps}
            />
            {errors.reps && <FormFeedback>{errors.reps}</FormFeedback>}
          </FormGroup>
        </div>
        
        <div className="col-md-4">
          <FormGroup>
            <Input 
              type="number" 
              placeholder="Weight (lbs)" 
              value={exercise.weight} 
              onChange={(e) => setExercise({ ...exercise, weight: e.target.value })}
              invalid={!!errors.weight}
            />
            {errors.weight && <FormFeedback>{errors.weight}</FormFeedback>}
          </FormGroup>
        </div>
      </div>
      
      <Button type="submit" color="primary" block>
        Add Exercise
      </Button>
      
      {feedback && (
        <div className="alert alert-success mt-2 mb-0 py-1">{feedback}</div>
      )}
    </Form>
  );
};

export default ExerciseForm;
