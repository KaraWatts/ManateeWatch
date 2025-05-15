import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { api } from "../components/utilities";

const SignUp = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [displayName, setDisplayName] = useState("")
  // @ts-expect-error TS(2339): Property 'setUser' does not exist on type 'unknown... Remove this comment to see the full error message
  const { setUser } = useOutletContext();


  const signupUser = async (e: any) => {
    e.preventDefault();
    const response = await api.post("user/signup/", { email: emailInput, password: passwordInput, display_name: displayName})
    if (response.status === 201) {
        console.log('successfuly signed up, user info', response.data);
        const { token, user } = response.data;
        // save auth token so it can be used
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        api.defaults.headers.common["Authorization"] = `Token ${token}`
        // set user info for the app
        setUser(user)
    }
  };

  return (
    <>
      <h2 style={{textAlign:"center"}}>Sign Up</h2>
      <Form onSubmit={signupUser} style={{ padding: "10px" }}>
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
        <Form.Group className="d-flex justify-content-center">
          <Button className="btn btn-primary" variant="primary" type="submit">
            Submit
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default SignUp;