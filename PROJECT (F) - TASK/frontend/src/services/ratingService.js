import api from "./api";

export const getStoreRatings = (storeId, token) =>
  api.get(`/ratings/store/${storeId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const submitRating = (storeId, data, token) =>
  api.post(
    `/stores/rate`,
    { storeId, ...data },
    { headers: { Authorization: `Bearer ${token}` } }
  );

export const updateRating = (storeId, data, token) =>
  api.put(
    `/stores/rate`,
    { storeId, ...data },
    { headers: { Authorization: `Bearer ${token}` } }
  );

export const deleteRating = (storeId, token) =>
  api.delete(`/stores/rate/${storeId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
