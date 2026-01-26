import React, { useState, useEffect } from "react";
import { auth } from "./utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import TeachersList from "./components/TeachersList";
import Login from "./components/Login";
import Register from "./components/Register";
import './App.css';

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false); // Track whether the user is registering

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app-container">
      {user ? (
        <div className="authenticated">
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
          <TeachersList />
        </div>
      ) : isRegistering ? (
        <Register
          onRegister={() => setIsRegistering(false)} // Switch to login after successful registration
          onSwitchToLogin={() => setIsRegistering(false)} // Switch back to login
        />
      ) : (
        <Login
          onLogin={() => setUser(auth.currentUser)} // Set the user after successful login
          onSwitchToRegister={() => setIsRegistering(true)} // Switch to registration
        />
      )}
    </div>
  );
};

export default App;
