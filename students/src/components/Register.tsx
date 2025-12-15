import React, { useState } from "react";
import { auth, db } from "../utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

const Register: React.FC<{ onRegister: () => void; onSwitchToLogin: () => void }> = ({ onRegister, onSwitchToLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user data to Firestore
      const usersCollection = collection(db, "users");
      await addDoc(usersCollection, {
        uid: user.uid,
        email: user.email,
        createdAt: new Date(),
      });

      alert("Registration successful! You can now log in.");
      onRegister(); // Notify parent component to switch to login
    } catch (err: any) {
      setError(err.message || "Failed to create an account. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Create an Account</h1>
        <p>Sign up to get started</p>
        <form className="login-form" onSubmit={handleRegister}>
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
            Register
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <button className="link-button" onClick={onSwitchToLogin}>
            Log In
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
