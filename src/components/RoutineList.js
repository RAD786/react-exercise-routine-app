import { useSelector } from "react-redux";
import { Alert } from "reactstrap";
import Routine from "./Routine";

const RoutineList = () => {
  const routines = useSelector((state) => state.routines.routines);

  return (
    <div className="mt-4">
      <h3>Your Routines ({routines.length}/3)</h3>
      {routines.length === 0 ? (
        <Alert color="info">
          No routines yet. Create one above to get started!
        </Alert>
      ) : (
        routines.map((routine) => (
          <Routine key={routine.id} routine={routine} />
        ))
      )}
    </div>
  );
};

export default RoutineList;
