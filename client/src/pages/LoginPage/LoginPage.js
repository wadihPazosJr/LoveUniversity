import Button from "react-bootstrap/Button";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import "./LoginPage.css";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="container">
      <h1>LOGIN PAGE</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="my-1" size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            className="w-50"
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="my-1" size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            className="w-50"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button
          className="my-1"
          block
          size="lg"
          type="submit"
          disabled={!validateForm()}
        >
          Login
        </Button>
      </Form>
      <button
        className="my-1"
        block
        size="lg"
        onClick={(window.location.href = "http://localhost:5000/auth/google")}
      >
        Login with Google
      </button>
    </div>
  );
}

export default LoginPage;
