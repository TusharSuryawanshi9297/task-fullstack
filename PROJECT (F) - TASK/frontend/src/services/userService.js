import api from "./api";

export const getUsers = (token) =>
  api.get("/admin/users", { headers: { Authorization: `Bearer ${token}` } });

export const addUser = (data, token) =>
  api.post("/admin/users", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateUser = (userId, data, token) =>
  api.put(`/admin/users/${userId}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteUser = (userId, token) =>
  api.delete(`/admin/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
