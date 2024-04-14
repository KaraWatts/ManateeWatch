import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { api } from "../components/utilities";

const SignUp = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [displayName, setDisplayName] = useState("")
  const { setUser } = useOutletContext();

  // TODO: Refactor into utilities.js
  const signupUser = async(e) => {
    e.preventDefault();
    const response = await api.post("user/signup/", { email: emailInput, password: passwordInput, display_name: displayName})
    if (response.status === 201) {
        console.log('successfuly signed up, user info', response.data);
        const { token, user } = response.data;
        // save auth token so it can be used
        localStorage.setItem("token", token)
        api.defaults.headers.common["Authorization"] = `Token ${token}`
        // set user info for the app
        setUser({ email: emailInput, user })
    }
  };

  return (
    <>
      <h2>Signup</h2>
      <Form onSubmit={signupUser}>
      <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control 
            onChange={(e) => setDisplayName(e.target.value)}
          type="text" placeholder="Full Name" />
        </Form.Group>
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
          <Form.Label>Password</Form.Label>
          <Form.Control 
            onChange={(e) => setPasswordInput(e.target.value)}
          type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignUp;