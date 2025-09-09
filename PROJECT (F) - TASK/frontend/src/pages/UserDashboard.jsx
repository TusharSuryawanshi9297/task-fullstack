import React, { useEffect, useContext, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useFetch from "../hooks/useFetch";
import { AuthContext } from "../contexts/AuthContext";
import { submitRating } from "../services/ratingService";
import gsap from "gsap";

const UserDashboard = () => {
  const { user, token, logout } = useContext(AuthContext);
  const { data: storesData, setData: setStoresData } = useFetch(
    "/stores",
    token
  );
  const [ratings, setRatings] = useState({});

  const storeItems = storesData?.items || [];
  // const storeItems = storesData || [];

  useEffect(() => {
    if (storeItems.length > 0) {
      gsap.fromTo(
        ".store-card",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out" }
      );
    }
  }, [storeItems]);

  const handleInputChange = (storeId, value) => {
    setRatings((prev) => ({ ...prev, [storeId]: value }));
  };

  const handleRatingSubmit = async (storeId) => {
    const ratingValue = Number(ratings[storeId]);
    if (!ratingValue || ratingValue < 1 || ratingValue > 5) {
      alert("Please enter a rating between 1 and 5");
      return;
    }

    try {
      await submitRating(storeId, { rating: ratingValue }, token);
      setStoresData((prev) => ({
        ...prev,
        items: prev.items.map((s) =>
          s.id === storeId ? { ...s, userRating: ratingValue } : s
        ),
      }));
      // setStoresData((prev) =>
      //   prev.map((s) =>
      //     s.id === storeId ? { ...s, userRating: ratingValue } : s
      //   )
      // );

      alert("Rating submitted successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit rating");
    }
  };

  return (
    <>
      <div className="container mt-4">
        <h2>Welcome, {user?.name}</h2>
        <button className="btn btn-danger mb-4" onClick={logout}>
          Logout
        </button>

        <div className="row">
          {storeItems.map((store) => (
            <div key={store.id} className="col-md-4 mb-3">
              <div className="card p-3 shadow-sm store-card">
                <h5>{store.name}</h5>
                <p>{store.address}</p>
                <p>Overall Rating: {store.overallRating || "No ratings yet"}</p>

                <div className="mb-2">
                  <label>Your Rating:</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    className="form-control"
                    value={ratings[store.id] ?? store.userRating ?? ""}
                    onChange={(e) =>
                      handleInputChange(store.id, e.target.value)
                    }
                  />
                </div>

                <button
                  className="btn btn-primary w-100"
                  onClick={() => handleRatingSubmit(store.id)}
                >
                  {store.userRating ? "Update" : "Submit"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
