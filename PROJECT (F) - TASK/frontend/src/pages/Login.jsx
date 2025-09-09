import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { validateEmail, validatePassword } from "../utils/validation";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const form = useForm({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(form.values.email)) {
      alert("Invalid email");
      return;
    }
    if (!validatePassword(form.values.password)) {
      alert(
        "Password must be 8-16 chars, include 1 uppercase and 1 special char"
      );
      return;
    }

    try {
      await login(form.values.email, form.values.password);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div
        className="login-card"
        style={{
          width: "400px",
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.values.email}
              onChange={form.handleChange}
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "6px",
                border: "1px solid #ced4da",
              }}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.values.password}
              onChange={form.handleChange}
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "6px",
                border: "1px solid #ced4da",
              }}
              required
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#0d6efd",
              color: "#fff",
            }}
          >
            Login
          </button>
        </form>
        <p className="mt-3 text-center">
          Don't have an account?{" "}
          <span
            style={{ color: "#0d6efd", cursor: "pointer" }}
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
