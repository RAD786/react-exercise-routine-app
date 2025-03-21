import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addRoutine } from "../features/routinesSlice";
import { validateRoutine } from "../utils/routineUtils";
import { Form, FormGroup, Input, Button, Alert, FormFeedback } from "reactstrap";

const RoutineForm = () => {
  const dispatch = useDispatch();
  const routines = useSelector((state) => state.routines.routines);
  const [routineName, setRoutineName] = useState("");
  const [error, setError] = useState("");
  const [showMaxRoutinesAlert, setShowMaxRoutinesAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationError = validateRoutine(routineName);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    if (routines.length >= 3) {
      setShowMaxRoutinesAlert(true);
      setTimeout(() => setShowMaxRoutinesAlert(false), 3000);
      return;
    }
    
    dispatch(addRoutine(routineName));
    setRoutineName("");
    setError("");
  };

  return (
    <div className="mb-4">
      {showMaxRoutinesAlert && (
        <Alert color="warning" className="mb-3">
          You can only create a maximum of 3 routines.
        </Alert>
      )}
      
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            type="text"
            placeholder="Enter routine name"
            value={routineName}
            onChange={(e) => setRoutineName(e.target.value)}
            invalid={!!error}
          />
          {error && <FormFeedback>{error}</FormFeedback>}
        </FormGroup>
        <Button color="primary" type="submit">
          Save Routine
        </Button>
      </Form>
    </div>
  );
};

export default RoutineForm;
