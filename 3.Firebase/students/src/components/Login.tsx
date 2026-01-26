import React, { useState } from "react";
import { auth, googleProvider } from "../utils/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const Login: React.FC<{ onLogin: () => void; onSwitchToRegister: () => void }> = ({ onLogin, onSwitchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin();
    } catch (err: any) {
      setError(err.message || "Invalid email or password.");
      console.error(err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      onLogin();
    } catch (err: any) {
      setError(err.message || "Failed to sign in with Google.");
      console.error(err);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Welcome Back</h1>
        <p>Please log in to continue</p>
        <form className="login-form" onSubmit={handleEmailLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button className="login-button" type="submit">
            Log In
          </button>
        </form>
        <div className="divider">OR</div>
        <button className="google-login-button" onClick={handleGoogleLogin}>
          Log In with Google
        </button>
        <p>
          Don't have an account?{" "}
          <button className="link-button" onClick={onSwitchToRegister}>
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
