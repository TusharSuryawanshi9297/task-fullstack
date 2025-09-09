import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="container mt-5 text-center">
    <h1>404 - Page Not Found</h1>
    <Link to="/" className="btn btn-primary mt-3">
      Go Home
    </Link>
  </div>
);

export default NotFound;
