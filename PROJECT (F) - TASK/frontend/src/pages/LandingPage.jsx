import React from "react";

const LandingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="d-flex flex-column justify-content-center align-items-center text-center text-light"
        style={{
          height: "100vh",
          background: `linear-gradient(to right, #0d6efd, #6610f2)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "0 20px",
        }}
      >
        <h1
          className="display-2 fw-bold mb-3"
          style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.4)" }}
        >
          StoreRatings
        </h1>
        <p
          className="lead mb-4"
          style={{ fontSize: "1.4rem", maxWidth: "600px" }}
        >
          Rate, review, and discover the best stores around you!
        </p>
        <div>
          <a
            href="#features"
            className="btn btn-light btn-lg me-3 shadow-sm"
            style={{ transition: "0.3s" }}
          >
            Explore Features
          </a>
          <a
            href="/signup"
            className="btn btn-outline-light btn-lg shadow-sm"
            style={{ transition: "0.3s" }}
          >
            Get Started
          </a>
        </div>
      </section>

      {/* About Section */}
      <section className="py-5 text-center bg-white">
        <div className="container">
          <h2 className="mb-4">About StoreRatings</h2>
          <p className="lead mx-auto" style={{ maxWidth: "700px" }}>
            StoreRatings is a platform where you can share your experiences and
            discover top-rated stores in your city. Connect with others, share
            feedback, and make smarter shopping decisions.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="mb-5">Features</h2>
          <div className="row justify-content-center g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-lg p-4 text-center hover-scale">
                <i className="bi bi-star-fill display-1 text-warning mb-3"></i>
                <h5 className="card-title mb-3">Rate Stores</h5>
                <p className="card-text">
                  Submit ratings and reviews for stores you visit and help
                  others choose wisely.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-lg p-4 text-center hover-scale">
                <i className="bi bi-geo-alt-fill display-1 text-primary mb-3"></i>
                <h5 className="card-title mb-3">Discover Stores</h5>
                <p className="card-text">
                  Find the best stores nearby based on user ratings and reviews,
                  instantly.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-lg p-4 text-center hover-scale">
                <i className="bi bi-gear-fill display-1 text-secondary mb-3"></i>
                <h5 className="card-title mb-3">Admin Dashboard</h5>
                <p className="card-text">
                  Admins can manage users, stores, and ratings efficiently from
                  a single dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-5 text-center bg-white">
        <div className="container">
          <h2 className="mb-5">What Our Users Say</h2>
          <div className="row justify-content-center g-4">
            <div className="col-md-4">
              <div className="card h-100 shadow-sm p-4">
                <p>
                  "StoreRatings helped me discover amazing stores I never knew
                  existed!"
                </p>
                <strong>- John Doe</strong>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm p-4">
                <p>
                  "I love rating stores and helping others make better choices."
                </p>
                <strong>- Jane Smith</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section
        className="py-5 text-center text-light"
        style={{
          background: "linear-gradient(90deg, #0d6efd, #6610f2)",
        }}
      >
        <h2 className="mb-4">Join Our Community</h2>
        <p className="lead mb-4">
          Sign up today and start rating stores in your area!
        </p>
        <a href="/signup" className="btn btn-light btn-lg fw-bold shadow-sm">
          Get Started
        </a>
      </section>

      {/* Contact Section */}
      <section className="py-5 bg-light text-center">
        <div className="container">
          <h2 className="mb-4">Contact Us</h2>
          <p>Email: support@storeratings.com</p>
          <p>Phone: +91 123-456-7890</p>
          <a
            href="mailto:support@storeratings.com"
            className="btn btn-primary mt-3"
          >
            Send Email
          </a>
        </div>
      </section>

      {/* Custom Hover Styles */}
      <style>{`
        .hover-scale {
          transition: transform 0.3s;
        }
        .hover-scale:hover {
          transform: translateY(-10px) scale(1.05);
        }
        section {
          scroll-margin-top: 70px;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
