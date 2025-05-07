import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // Update with your actual backend URL
  withCredentials: true, // If you're using cookies for auth
});

export default api;
