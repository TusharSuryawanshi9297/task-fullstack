import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          StoreRatings
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {user && (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {user.role === "admin" && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin/dashboard">
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin/users">
                      Users
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin/stores">
                      Stores
                    </Link>
                  </li>
                </>
              )}
              {user.role === "owner" && (
                <li className="nav-item">
                  <Link className="nav-link" to="/owner/dashboard">
                    Dashboard
                  </Link>
                </li>
              )}
              {user.role === "user" && (
                <li className="nav-item">
                  <Link className="nav-link" to="/user/dashboard">
                    Stores
                  </Link>
                </li>
              )}
            </ul>
          )}

          {user ? (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <span className="navbar-text me-3">
                  Hello, {user.name.split(" ")[0]}
                </span>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-outline-light btn-sm"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">
                  Signup
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
