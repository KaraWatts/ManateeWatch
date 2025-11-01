import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../components/utilities";

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
      <div className="reset-password-container">
        <h2>Invalid Reset Link</h2>
        <p>This password reset link is invalid or has expired.</p>
        <button onClick={() => navigate("/forgot-password")}>
          Request New Reset Link
        </button>
      </div>
    );
  }

  return (
    <div className="reset-password-container">
      <h2>Reset Your Password</h2>
      <p>Enter your new password below.</p>
      
      <form onSubmit={handleResetPassword}>
        <div className="form-group">
          <input
            type="password"
            name="new_password"
            placeholder="New Password"
            value={passwords.new_password}
            onChange={handleInputChange}
            disabled={isLoading}
            required
            minLength="8"
          />
        </div>
        
        <div className="form-group">
          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm New Password"
            value={passwords.confirm_password}
            onChange={handleInputChange}
            disabled={isLoading}
            required
            minLength="8"
          />
        </div>
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Resetting..." : "Reset Password"}
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

export default ResetPassword;