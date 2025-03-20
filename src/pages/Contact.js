import { useState } from "react";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { validateForm } from "../utils/validation";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({}); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    alert("Thank you for reaching out! We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
    setErrors({});
  };

  return (
    <Container className="my-5">
      <h2>Contact Us</h2>
      <p>If you have any questions, feel free to send us a message!</p>
      <Form onSubmit={handleSubmit}>
        <FormGroup className="mb-3">
          <Label>Name</Label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            invalid={!!errors.name}
          />
          {errors.name && <p className="text-danger">{errors.name}</p>}
        </FormGroup>

        <FormGroup className="mb-3">
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            invalid={!!errors.email}
          />
          {errors.email && <p className="text-danger">{errors.email}</p>}
        </FormGroup>

        <FormGroup className="mb-3">
          <Label>Message</Label>
          <Input
            type="textarea"
            rows={4}
            name="message"
            value={formData.message}
            onChange={handleChange}
            invalid={!!errors.message}
          />
          {errors.message && <p className="text-danger">{errors.message}</p>}
        </FormGroup>

        <Button color="primary" type="submit">
          Send Message
        </Button>
      </Form>
    </Container>
  );
};

export default Contact;
