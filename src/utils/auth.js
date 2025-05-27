import axios from "axios";

export const logout = async () => {
  try {
    await axios.delete("http://localhost:5000/users", {
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