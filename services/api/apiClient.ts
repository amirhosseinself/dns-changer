import axios from "axios";

export const apiClient = axios.create({
  baseURL: "/api", // مسیر پایه API های سرور شما
  headers: {
    "Content-Type": "application/json",
  },
});
