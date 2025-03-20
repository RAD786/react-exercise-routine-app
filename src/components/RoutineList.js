import { useDispatch, useSelector } from "react-redux";
import { deleteRoutine, deleteExercise } from "../features/routinesSlice";
import { Card, Button, ListGroup, ListGroupItem } from "reactstrap";
import { XCircle } from "react-bootstrap-icons";

const RoutineList = () => {
  const routines = useSelector((state) => state.routines);
  const dispatch = useDispatch();

  return (
    <>
      {routines.map((routine) => (
        <Card className="mb-3" key={routine.id}>
          <Card.Body>
            <h5>{routine.name} <XCircle className="text-danger" role="button" onClick={() => dispatch(deleteRoutine(routine.id))} /></h5>
            <ListGroup>
              {routine.exercises.map((ex) => (
                <ListGroupItem key={ex.id}>
                  {ex.name} - {ex.sets} Sets x {ex.reps} Reps
                  <XCircle className="text-danger ms-3" role="button" onClick={() => dispatch(deleteExercise({ routineId: routine.id, exerciseId: ex.id }))} />
                </ListGroupItem>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};

export default RoutineList;
