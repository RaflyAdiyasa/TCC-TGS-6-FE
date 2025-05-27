import axios from "axios";
import { BASE_URL } from "./utils.js";

export const logout = async () => {
  try {
    await axios.delete(`${BASE_URL }/users`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    localStorage.removeItem("token");
    window.location.href = "/";
  } catch (error) {
    console.error("Logout failed:", error);
  }
};