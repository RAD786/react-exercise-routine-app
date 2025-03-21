import React, { useState } from "react";
import { 
  Container, 
  Row, 
  Col, 
  Form, 
  FormGroup, 
  Label, 
  Input, 
  Button, 
  Card, 
  CardBody, 
  CardTitle, 
  CardText,
  Alert
} from "reactstrap";
import { fetchExercises } from "../api/exerciseApi";
import Loading from "../components/Loading";

const Exercises = () => {
  const [searchParams, setSearchParams] = useState({
    name: "",
    muscle: "",
    type: "",
    difficulty: ""
  });
  
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const muscleOptions = [
    "", "abdominals", "abductors", "adductors", "biceps", "calves", 
    "chest", "forearms", "glutes", "hamstrings", "lats", "lower_back", 
    "middle_back", "neck", "quadriceps", "traps", "triceps"
  ];
  
  const typeOptions = [
    "", "cardio", "olympic_weightlifting", "plyometrics", 
    "powerlifting", "strength", "stretching", "strongman"
  ];
  
  const difficultyOptions = ["", "beginner", "intermediate", "expert"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const hasSearchParam = Object.values(searchParams).some(param => param.trim() !== "");
    if (!hasSearchParam) {
      setError("Please enter at least one search parameter");
      return;
    }
    
    setLoading(true);
    setError(null);
    setSearched(true);
    
    try {
      const results = await fetchExercises(searchParams);
      setExercises(results);
      if (results.length === 0) {
        setError("No exercises found matching your criteria");
      }
    } catch (err) {
      setError("Failed to fetch exercises. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-4">
      <h2 className="mb-4">Exercise Library</h2>
      
      <Card className="mb-4">
        <CardBody>
          <CardTitle tag="h4">Search Exercises</CardTitle>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="name">Exercise Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="e.g. push up, bench press"
                    value={searchParams.name}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
              
              <Col md={6}>
                <FormGroup>
                  <Label for="muscle">Muscle Group</Label>
                  <Input
                    type="select"
                    name="muscle"
                    id="muscle"
                    value={searchParams.muscle}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Muscle Group</option>
                    {muscleOptions.filter(option => option !== "").map(muscle => (
                      <option key={muscle} value={muscle}>
                        {muscle.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="type">Exercise Type</Label>
                  <Input
                    type="select"
                    name="type"
                    id="type"
                    value={searchParams.type}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Exercise Type</option>
                    {typeOptions.filter(option => option !== "").map(type => (
                      <option key={type} value={type}>
                        {type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
              
              <Col md={6}>
                <FormGroup>
                  <Label for="difficulty">Difficulty Level</Label>
                  <Input
                    type="select"
                    name="difficulty"
                    id="difficulty"
                    value={searchParams.difficulty}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Difficulty</option>
                    {difficultyOptions.filter(option => option !== "").map(difficulty => (
                      <option key={difficulty} value={difficulty}>
                        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            
            <Button color="primary" type="submit" className="mt-2">
              Search Exercises
            </Button>
          </Form>
        </CardBody>
      </Card>
      
      {error && <Alert color="danger">{error}</Alert>}
      
      {loading ? (
        <Loading />
      ) : (
        <>
          {searched && exercises.length > 0 && (
            <>
              <h3 className="mb-3">Search Results ({exercises.length})</h3>
              <Row>
                {exercises.map((exercise, index) => (
                  <Col md={4} className="mb-4" key={index}>
                    <Card className="h-100">
                      <CardBody>
                        <CardTitle tag="h5">{exercise.name}</CardTitle>
                        <CardText>
                          <strong>Muscle:</strong> {exercise.muscle.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </CardText>
                        <CardText>
                          <strong>Type:</strong> {exercise.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </CardText>
                        <CardText>
                          <strong>Difficulty:</strong> {exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}
                        </CardText>
                        <CardText>
                          <strong>Equipment:</strong> {exercise.equipment || "None"}
                        </CardText>
                        <CardText>
                          <strong>Instructions:</strong>
                          <p className="mt-2">{exercise.instructions}</p>
                        </CardText>
                        <Button 
                          color="success" 
                          block
                          onClick={() => {
                            console.log("Add to routine:", exercise);
                          }}
                        >
                          Add to Routine
                        </Button>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default Exercises;
