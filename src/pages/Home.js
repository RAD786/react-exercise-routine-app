import { Container } from "reactstrap";
import bgImage from "../app/assets/fitness-background.png";
import Hero from "../components/Hero"; 

const Home = () => {
  return (
    <Container
      fluid
      className="home-container d-flex flex-column justify-content-center align-items-center text-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "90vh",
        width: "100%",
        color: "white",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.9)",
      }}
    >
      <Hero />
    </Container>
  );
};

export default Home;
