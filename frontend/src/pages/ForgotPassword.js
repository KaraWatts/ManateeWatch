import { useState } from "react";
import { api } from "../components/utilities";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

const ForgotPassword = () => {
  const [emailInput, setEmailInput] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!emailInput) {
      setError("Please enter your email address");
      return;
    }

    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      await api.post('user/forgot-password/', {
        email: emailInput
      });

      setMessage("If an account with that email exists, a password reset link has been sent to your email.");
      setEmailInput("");
    } catch (err) {
      console.error("Error sending password reset email:", err);
      setError(err.response?.data?.error || "Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Forgot Password</h2>
      <Form onSubmit={handleForgotPassword} style={{ padding: "10px" }}>
        <p style={{ textAlign: "center", marginBottom: "20px" }}>
          Enter your email address and we'll send you a link to reset your password.
        </p>
        
        {message && (
          <Alert variant="success">
            {message}
          </Alert>
        )}

        {error && (
          <Alert variant="danger">
            {error}
          </Alert>
        )}

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email address"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            disabled={isLoading}
            required
          />
        </Form.Group>
        
        <Form.Group className="d-flex justify-content-center">
          <Button 
            className="btn btn-primary" 
            variant="primary" 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default ForgotPassword;
