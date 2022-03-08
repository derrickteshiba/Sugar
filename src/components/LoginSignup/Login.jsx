import React, { useRef, useState } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { useUserContext } from "../auth/userContext";
import { Link } from "react-router-dom";

export default function Login() {
  const refEmail = useRef();
  const refPass = useRef();

  const { login, forgotPassword } = useUserContext();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const email = refEmail.current.value;
    const password = refPass.current.value;
    try {
      setError("");
      setLoading(true);
      await login(email, password);
    } catch {
      setError("Incorrect Email/Password");
      setLoading(false);
    }
  }

  const forgotPasswordHandler = () => {
    const email = refEmail.current.value;
    if (email) {
      setError("");
      try {
        forgotPassword(email).then(() => (refEmail.current.value = ""));
        setMessage("Reset link sent to email!");
      } catch {
        setError("Couldn't send reset instructions.");
      }
    } else {
      setError("Type Email Below");
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@gmail.com"
                required
                ref={refEmail}
              ></Form.Control>
            </Form.Group>
            <Form.Group id="pass">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="************"
                required
                ref={refPass}
              ></Form.Control>
            </Form.Group>
            <Button
              disabled={loading}
              type="submit"
              className="w-100 text-center mt-2"
            >
              Log In
            </Button>
          </Form>
          <div>
            <Button
              variant="link"
              onClick={forgotPasswordHandler}
              className="w-100 text-center"
            >
              Forgot Password?
            </Button>
          </div>
        </Card.Body>
      </Card>
      <div className="text-center w-100 mt-2">
        Need an account? <Link to="/signup">Create One!</Link>
      </div>
      <div className="text-center w-100"></div>
    </>
  );
}
