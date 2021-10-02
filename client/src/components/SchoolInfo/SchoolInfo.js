import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const SchoolInfo = ({ prevStep, nextStep, handleChange, values }) => {
  const next = (e) => {
    e.preventDefault();
    nextStep();
  };

  const previous = (e) => {
    e.preventDefault();
    prevStep();
  };

  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="university">
          <Form.Label>University</Form.Label>
          <Form.Control
            onChange={handleChange("university")}
            type="text"
            placeholder="University"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="major">
          <Form.Label>Major</Form.Label>
          <Form.Control
            onChange={handleChange("major")}
            type="text"
            placeholder="Major"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="greek">
          <Form.Label>Greek Life</Form.Label>
          <Form.Control
            onChange={handleChange("greek")}
            type="text"
            placeholder="Greek Life"
          />
        </Form.Group>
      </Form>

      <Button onClick={previous}>Previous</Button>
      <Button onClick={next}>Continue</Button>
    </div>
  );
};

export default SchoolInfo;
