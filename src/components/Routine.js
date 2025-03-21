import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteRoutine, updateRoutine } from "../features/routinesSlice";
import { Card, CardBody, ListGroup, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input } from "reactstrap";
import Exercise from "./Exercise";
import ExerciseForm from "./ExerciseForm";

const Routine = ({ routine }) => {
  const dispatch = useDispatch();
  const [editModal, setEditModal] = useState(false);
  const [editName, setEditName] = useState("");

  const openEditModal = () => {
    setEditName(routine.name);
    setEditModal(true);
  };

  const handleUpdate = () => {
    if (!editName.trim()) return;
    
    dispatch(updateRoutine({
      id: routine.id,
      name: editName
    }));
    
    setEditModal(false);
  };

  return (
    <>
      <Card className="mb-4">
        <CardBody>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>{routine.name}</h4>
            <div>
              <Button 
                color="link" 
                className="p-0 me-2 text-primary" 
                onClick={openEditModal}
              >
                Edit
              </Button>
              <Button 
                color="link" 
                className="p-0 text-danger" 
                onClick={() => dispatch(deleteRoutine(routine.id))}
              >
                Delete
              </Button>
            </div>
          </div>
          
          <h5>Exercises</h5>
          {routine.exercises.length === 0 ? (
            <p className="text-muted">No exercises added yet.</p>
          ) : (
            <ListGroup className="mb-3">
              {routine.exercises.map((exercise) => (
                <Exercise 
                  key={exercise.id} 
                  exercise={exercise} 
                  routineId={routine.id} 
                />
              ))}
            </ListGroup>
          )}
          
          <ExerciseForm routineId={routine.id} />
        </CardBody>
      </Card>

      {/* Edit Routine Modal */}
      <Modal isOpen={editModal} toggle={() => setEditModal(!editModal)}>
        <ModalHeader toggle={() => setEditModal(!editModal)}>
          Edit Routine
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Input
                type="text"
                placeholder="Routine Name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </FormGroup>
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

export default Routine;
