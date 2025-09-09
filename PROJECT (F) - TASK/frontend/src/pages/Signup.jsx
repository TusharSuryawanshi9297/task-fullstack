import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import useForm from "../hooks/useForm";
import {
  validateEmail,
  validatePassword,
  validateName,
  validateAddress,
} from "../utils/validation";

const Signup = () => {
  const { signup } = useContext(AuthContext);

  const form = useForm({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateName(form.values.name)) {
      alert("Name must be 20-60 characters");
      return;
    }
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
    if (!validateAddress(form.values.address)) {
      alert("Address max 400 characters");
      return;
    }

    try {
      await signup(form.values);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh", backgroundColor: "#f8f9fa" }}
    >
      <div
        className="card signup-card shadow-sm p-4"
        style={{
          width: "400px",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <h3 className="mb-4 text-center">Sign Up</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Full Name"
              value={form.values.name}
              onChange={form.handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={form.values.email}
              onChange={form.handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={form.values.password}
              onChange={form.handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <textarea
              name="address"
              className="form-control"
              placeholder="Address"
              value={form.values.address}
              onChange={form.handleChange}
              rows="3"
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
