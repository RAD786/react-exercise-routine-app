import { ListGroup, ListGroupItem, Spinner } from "reactstrap";

const ExerciseList = ({ exercises, loading, error }) => {
  if (loading) return <Spinner color="primary" />;
  if (error) return <p className="text-danger">{error}</p>;
  if (exercises.length === 0) return <p>No exercises found. Try searching.</p>;

  return (
    <ListGroup>
      {exercises.map((exercise, index) => (
        <ListGroupItem key={index} className="text-start">
          <strong>{exercise.name}</strong> - {exercise.muscle} - {exercise.type}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

export default ExerciseList;
