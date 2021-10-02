import Button from "react-bootstrap/Button";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import "./LoginPage.css";
import Image from "react-bootstrap/Image";

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
    <div className="loginPageTop">
      <img src="./images/loveUniLogo.png" alt="logo" />
      <div className="loginContainer d-flex justify-content-center align-items-center">
        <div className="card">
          <h1>Login</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mt-3" size="lg" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                className=""
                autoFocus
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mt-3" size="lg" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className=""
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              className="w-100 mt-3"
              block
              size="sm"
              type="submit"
              disabled={!validateForm()}
            >
              Login
            </Button>
          </Form>
          <p className="text-center my-2">or</p>
          <Button
            className=""
            block
            size="sm"
            onClick={() =>
              (window.location.href = "http://localhost:5000/auth/google")
            }
          >
            Log in with Google
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
