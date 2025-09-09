import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-auto">
      <div className="container d-flex justify-content-between align-items-center">
        <span>
          © {new Date().getFullYear()} StoreRatings. All rights reserved.
        </span>
        <div>
          <a href="#!" className="text-light me-3">
            Privacy Policy
          </a>
          <a href="#!" className="text-light">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
