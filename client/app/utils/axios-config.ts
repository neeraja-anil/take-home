import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

const userString: string | null = localStorage.getItem("user");
const user = userString ? JSON.parse(userString) : null;

export const headerConfig = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${user?.token}`,
  },
};

export default api;
