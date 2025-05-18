// src/utils/auth.js
import api from "./api";

export const logout = async () => {
  try {
    await api.delete("/users"); // Adjust this to match your logout endpoint
    localStorage.removeItem("token");
    window.location.href = "/login";
  } catch (error) {
    console.error("Logout failed:", error);
  }
};