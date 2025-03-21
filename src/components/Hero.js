import { Container, Button } from "reactstrap";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <Container className="text-center d-flex flex-column justify-content-center align-items-center">
      <h1>Exercise Routine App</h1>
      <p>Select an option to get started:</p>
      <Button color="primary" tag={Link} to="/create" className="m-2">
        Create a Workout
      </Button>
      <Button color="success" tag={Link} to="/exercises" className="m-2">
        Exercise Library
      </Button>
    </Container>
  );
};

export default Hero;