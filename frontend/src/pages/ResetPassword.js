import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../components/utilities";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  
  const [passwords, setPasswords] = useState({
    new_password: "",
    confirm_password: ""
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValidToken, setIsValidToken] = useState(true);

  useEffect(() => {
    // Validate token format
    if (!token || token.length !== 36) {
      setIsValidToken(false);
      setError("Invalid reset link. Please request a new password reset.");
    }
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (!passwords.new_password || !passwords.confirm_password) {
      setError("Please fill in both password fields");
      return;
    }

    if (passwords.new_password !== passwords.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    if (passwords.new_password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      await api.post(`user/reset-password-confirm/${token}/`, {
        new_password: passwords.new_password,
        confirm_password: passwords.confirm_password
      });

      setMessage("Password reset successfully! Redirecting to login...");
      
      // Redirect to login page after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      
    } catch (err) {
      console.error("Error resetting password:", err);
      setError(err.response?.data?.error || "Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isValidToken) {
    return (
      <>
        <h2 style={{ textAlign: "center" }}>Invalid Reset Link</h2>
        <div style={{ padding: "10px", textAlign: "center" }}>
          <Alert variant="danger">
            This password reset link is invalid or has expired.
          </Alert>
          <Button 
            variant="primary" 
            onClick={() => navigate("/forgot-password")}
          >
            Request New Reset Link
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Reset Your Password</h2>
      <Form onSubmit={handleResetPassword} style={{ padding: "10px" }}>
        <p style={{ textAlign: "center", marginBottom: "20px" }}>
          Enter your new password below.
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

        <Form.Group className="mb-3" controlId="formNewPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            name="new_password"
            placeholder="New Password"
            value={passwords.new_password}
            onChange={handleInputChange}
            disabled={isLoading}
            required
            minLength="8"
          />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            name="confirm_password"
            placeholder="Confirm New Password"
            value={passwords.confirm_password}
            onChange={handleInputChange}
            disabled={isLoading}
            required
            minLength="8"
          />
        </Form.Group>
        
        <Form.Group className="d-flex justify-content-center">
          <Button 
            className="btn btn-primary" 
            variant="primary" 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default ResetPassword;