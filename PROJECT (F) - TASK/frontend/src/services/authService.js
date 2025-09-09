import api from "./api";

export const login = (data) => api.post("/auth/login", data);
export const signup = (data) => api.post("/auth/signup", data);
export const getMe = () => api.get("/auth/me");
