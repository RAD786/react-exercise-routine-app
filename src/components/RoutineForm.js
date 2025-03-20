import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRoutine } from "../features/routinesSlice";
import { validateRoutine } from "../utils/routineUtils";
import { Form, Input, Button } from "reactstrap";

const RoutineForm = () => {
  const [routineName, setRoutineName] = useState("");
  const [errors, setErrors] = useState({});
  const routines = useSelector((state) => state.routines);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateRoutine(routineName, routines);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    dispatch(addRoutine(routineName));
    setRoutineName("");
    setErrors({});
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-3">
      <Input
        type="text"
        value={routineName}
        onChange={(e) => setRoutineName(e.target.value)}
        placeholder="Enter Routine Name"
      />
      {errors.routineName && <p className="text-danger mt-1">{errors.routineName}</p>}
      <Button color="primary" className="mt-2" type="submit">
        Save Routine
      </Button>
    </Form>
  );
};

export default RoutineForm;
