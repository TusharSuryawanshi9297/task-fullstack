import React, { useState } from "react";
import RatingStars from "./RatingStars";

const StoreCard = ({ store, onRate }) => {
  const [rating, setRating] = useState(store.userRating || 0);

  const handleRate = (value) => {
    setRating(value);
    onRate(store.id, value);
  };

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{store.name}</h5>
        <p className="card-text">{store.address}</p>
        <p>Average Rating: {store.avgRating || 0}</p>
        <RatingStars rating={rating} onChange={handleRate} />
      </div>
    </div>
  );
};

export default StoreCard;
