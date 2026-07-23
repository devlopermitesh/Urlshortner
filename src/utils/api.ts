import axios from "axios";

const BaseUrl = import.meta.env.VITE_API_URL;

if (!BaseUrl) {
  throw new Error("API URL is missing");
}

export const api = axios.create({
  baseURL: `${BaseUrl}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Agar cookies (accessToken) use kar rahe ho
});
