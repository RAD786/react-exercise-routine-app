import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExercises } from "../features/exercisesSlice";
import { Container, Input, Button } from "reactstrap";
import ExerciseList from "../components/ExerciseList";

const Exercises = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const { exercises, status, error } = useSelector((state) => state.exercises);

  const handleSearch = () => {
    if (query.trim() !== "") {
      dispatch(fetchExercises(query));
    }
  };

  return (
    <Container className="my-4">
      <h2>Exercise Library</h2>
      <p>Search for exercises by name.</p>

      <div className="d-flex mb-3">
        <Input
          type="text"
          placeholder="Enter exercise name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button color="primary" onClick={handleSearch} className="ms-2">
          Search
        </Button>
      </div>

      <ExerciseList exercises={exercises} loading={status === "loading"} error={error} />
    </Container>
  );
};

export default Exercises;
