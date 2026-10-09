import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setLoggedIn }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (
      user &&
      user.email === email &&
      user.password === password
    ) {
      localStorage.setItem("loggedIn", "true");
      setLoggedIn(true);
      alert("Login successful!");
      navigate("/home");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-box" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="main-btn" type="submit">
          Login
        </button>

        <p>
          New user? <Link to="/register">Create Account</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;