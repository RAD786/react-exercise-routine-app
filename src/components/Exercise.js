import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteExercise, updateExercise } from "../features/routinesSlice";
import { validateExercise, formatExerciseData } from "../utils/routineUtils";
import { ListGroupItem, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, FormFeedback } from "reactstrap";

const Exercise = ({ routineId, exercise }) => {
  const dispatch = useDispatch();
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    sets: "",
    reps: "",
    weight: ""
  });
  const [errors, setErrors] = useState({});

  const openEditModal = () => {
    setEditData({
      name: exercise.name,
      sets: exercise.sets.toString(),
      reps: exercise.reps.toString(),
      weight: exercise.weight ? exercise.weight.toString() : ""
    });
    setEditModal(true);
  };

  const handleUpdate = () => {
    const validationErrors = validateExercise(editData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formattedExercise = formatExerciseData(editData);
    
    dispatch(updateExercise({
      routineId,
      exerciseId: exercise.id,
      exercise: formattedExercise
    }));
    
    setEditModal(false);
    setErrors({});
  };

  return (
    <>
      <ListGroupItem>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <strong>{exercise.name}</strong> - {exercise.sets} sets x{" "}
            {exercise.reps} reps
            {exercise.weight && ` @ ${exercise.weight} lbs`}
          </div>
          <div>
            <Button 
              color="link" 
              className="p-0 me-2 text-primary" 
              onClick={openEditModal}
              style={{ fontSize: '0.9rem' }}
            >
              Edit
            </Button>
            <Button 
              color="link" 
              className="p-0 text-danger" 
              onClick={() => dispatch(deleteExercise({ routineId, exerciseId: exercise.id }))}
              style={{ fontSize: '0.9rem' }}
            >
              Delete
            </Button>
          </div>
        </div>
      </ListGroupItem>

      {/* Edit Exercise Modal */}
      <Modal isOpen={editModal} toggle={() => setEditModal(!editModal)}>
        <ModalHeader toggle={() => setEditModal(!editModal)}>
          Edit Exercise
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Input
                type="text"
                placeholder="Exercise Name"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
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
                    value={editData.sets}
                    onChange={(e) => setEditData({ ...editData, sets: e.target.value })}
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
                    value={editData.reps}
                    onChange={(e) => setEditData({ ...editData, reps: e.target.value })}
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
                    value={editData.weight}
                    onChange={(e) => setEditData({ ...editData, weight: e.target.value })}
                    invalid={!!errors.weight}
                  />
                  {errors.weight && <FormFeedback>{errors.weight}</FormFeedback>}
                </FormGroup>
              </div>
            </div>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setEditModal(false)}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleUpdate}>
            Update
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Exercise;
