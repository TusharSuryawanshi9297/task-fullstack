import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../contexts/AuthContext";
import api from "../services/api";

const OwnerDashboard = () => {
  const { user, token, logout } = useContext(AuthContext);

  const [store, setStore] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const fetchOwnerDashboard = async () => {
      setLoading(true);
      try {
        const res = await api.get("/owner/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStore(res.data.store);
        setRatings(res.data.raters || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerDashboard();
  }, [token]);

  const handleUpdateRating = async (ratingId, newValue) => {
    if (newValue < 1 || newValue > 5) {
      alert("Rating must be between 1 and 5");
      return;
    }
    try {
      await api.put(
        `/store/${store.id}/ratings/${ratingId}`,
        { rating: newValue },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRatings((prev) =>
        prev.map((r) => (r.id === ratingId ? { ...r, rating: newValue } : r))
      );
      alert("Rating updated successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update rating");
    }
  };

  if (loading) return <p>Loading Owner Dashboard...</p>;

  if (!store) return <p>No store assigned to you.</p>;

  return (
    <>
      <div className="container mt-4">
        <h2>Owner Dashboard</h2>
        <button className="btn btn-danger mb-3" onClick={logout}>
          Logout
        </button>

        <div className="card mb-4 shadow-sm p-3">
          <h5>My Store</h5>
          <p>
            <strong>Name:</strong> {store.name}
          </p>
          <p>
            <strong>Address:</strong> {store.address}
          </p>
          <p>
            <strong>Average Rating:</strong> {store.averageRating || "0"}
          </p>
        </div>

        <div className="card mb-4 shadow-sm p-3">
          <h5>User Ratings</h5>
          {ratings.length === 0 ? (
            <p>No ratings yet.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {ratings.map((r) => (
                    <tr key={r.id}>
                      <td>{r.name}</td>
                      <td>{r.email}</td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          max="5"
                          className="form-control"
                          value={r.rating}
                          onChange={(e) =>
                            handleUpdateRating(r.id, Number(e.target.value))
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OwnerDashboard;
