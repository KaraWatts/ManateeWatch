import { useState } from "react";
import { api } from "../components/utilities";

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
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <p>Enter your email address and we'll send you a link to reset your password.</p>
      
      <form onSubmit={handleForgotPassword}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Enter your email address"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      {message && (
        <div className="success-message">
          {message}
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
