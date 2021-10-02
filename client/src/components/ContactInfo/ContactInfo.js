import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const ContactInfo = ({ nextStep, handleChange, values }) => {
  const next = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={handleChange("name")}
            type="text"
            placeholder="Name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            onChange={handleChange("email")}
            type="email"
            placeholder="email@example.com"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="phoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            onChange={handleChange("phone")}
            type="text"
            placeholder="111-111-1111"
          />
        </Form.Group>
      </Form>

      <Button onClick={next}>Continue</Button>
    </div>
  );
};

export default ContactInfo;
