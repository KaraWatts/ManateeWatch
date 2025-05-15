import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import {Button, Alert, Form} from "react-bootstrap";
import { userLogin } from "../components/utilities";
import "./stylesheets/login.css"

const LogIn = () => {
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  // @ts-expect-error TS(2339): Property 'setUser' does not exist on type 'unknown... Remove this comment to see the full error message
  const { setUser } = useOutletContext();
  const [validPass, setValidPass] = useState(null)
  const [show, setShow] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const user = await userLogin(emailInput, passwordInput);
    if (user && user !== 401) {
      setUser(user);
      console.log(user);
    } else if (user === 401){
      // @ts-expect-error TS(2345): Argument of type 'false' is not assignable to para... Remove this comment to see the full error message
      setValidPass(false)
    } else{
      setShow(true)
    }
  };

  const handleSignUp = (e: any) => {
    e.preventDefault();
    navigate("/signup/");
  };

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Login</h2>
      <Form onSubmit={handleLogin} style={{ padding: "10px" }}>
      <Alert show={show} variant="info">
        <Alert.Heading>User Not Found</Alert.Heading>
        <p>
          User data was not found - Create a new account or try again.
        </p>
        <hr />
        <div className="button-container">
        <Button onClick={handleSignUp} variant="outline-success" className="mr-10">
            Sign Up
          </Button>
          <Button onClick={() => setShow(false)} variant="outline-success" className="ml-10">
            Try Again
          </Button>
        </div>
      </Alert>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmailInput(e.target.value)}
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label >Password</Form.Label>
          <Form.Control
            onChange={(e) => setPasswordInput(e.target.value)}
            type="password"
            placeholder="Password"
            isInvalid={validPass === false}
          />
         {validPass === false && <Alert className="mt-2" variant="danger">
          Password is invalid
        </Alert>}
        </Form.Group>
        <Form.Group className="d-flex justify-content-center">
          <Button className="btn btn-primary" variant="primary" type="submit">
            Submit
          </Button>
        </Form.Group>
        <Form.Group style={{ textAlign: "center" }}>
          <Form.Text>
            Don't have an acount yet? Click here to join our community of
            manatee observers!
          </Form.Text>
        </Form.Group>
        <Form.Group style={{ textAlign: "center" }}>
          <Button onClick={handleSignUp} variant="link">Sign Up</Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default LogIn;
