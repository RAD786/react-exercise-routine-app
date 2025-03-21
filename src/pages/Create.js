import { Container } from "reactstrap";
import RoutineForm from "../components/RoutineForm";
import RoutineList from "../components/RoutineList";

const Create = () => (
  <Container className="my-4">
    <h2>Create Your Own Routine</h2>
    <p>"Examples: Monday, Leg, Chest/Back, etc"</p>
    <RoutineForm />
    <RoutineList />
  </Container>
);

export default Create;
