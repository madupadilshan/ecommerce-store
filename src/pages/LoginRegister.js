import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../styles.css";

function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and register
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false); // For terms and conditions
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Login logic
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login Successful!");
      } else {
        // Register logic
        if (!agree) {
          alert("You must agree to the terms and conditions.");
          return;
        }
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Registration Successful!");
      }
      navigate("/"); // Redirect after successful login/register
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="form-title">{isLogin ? "Login" : "Register"}</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
        />
        {!isLogin && (
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="terms"
              checked={agree}
              onChange={() => setAgree(!agree)}
            />
            <label htmlFor="terms">I agree to the terms and conditions</label>
          </div>
        )}
        <button type="submit" className="form-button">
          {isLogin ? "Login" : "Register"}
        </button>
        <p className="toggle-form">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="toggle-link"
            onClick={() => setIsLogin(!isLogin)}
            style={{ color: "blue", cursor: "pointer" }}
          >
            {isLogin ? "Register here" : "Login here"}
          </span>
        </p>
      </form>
    </div>
  );
}

export default LoginRegister;
