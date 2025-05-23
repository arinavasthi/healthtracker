import axios from "axios";
import { logout } from "../redux/reducers/userSlice";
import { store } from "../redux/store";

const API = axios.create({
  baseURL: "http://localhost:5000/api/",
});

// Request interceptor
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("fittrack-app-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      // Handle 403 errors
      store.dispatch(logout());
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export const UserSignUp = async (data) => API.post("/user/signup", data);
export const UserSignIn = async (data) => API.post("/user/signin", data);

export const getDashboardDetails = async () => API.get("/user/dashboard");

export const getWorkouts = async (date) => 
  API.get(`/user/workout${date ? `?date=${date}` : ""}`);

export const addWorkout = async (data) => API.post(`/user/workout`, data);
