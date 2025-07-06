import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // backend running at port 5000
});

// Sign up
export const signupUser = (userData) => API.post("/auth/signup", userData);

// Sign in
export const loginUser = (userData) => API.post("/auth/signin", userData);
