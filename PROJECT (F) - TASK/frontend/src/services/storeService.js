import api from "./api";

export const getStores = (token) =>
  api.get("/admin/stores", { headers: { Authorization: `Bearer ${token}` } });

export const addStore = (data, token) =>
  api.post("/admin/stores", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateStore = (storeId, data, token) =>
  api.put(`/admin/stores/${storeId}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteStore = (storeId, token) =>
  api.delete(`/admin/stores/${storeId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
