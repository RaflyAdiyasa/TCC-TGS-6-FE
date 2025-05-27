// src/pages/LoginPage.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/utils.js";
import "../style.css"; 
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post(`${BASE_URL }/login`, {
          email,
          password,
        }, {
          withCredentials: true
        });
    
        // Simpan token ke localStorage
        localStorage.setItem("token", res.data.accessToken);
        navigate("/note"); // Arahkan ke halaman utama
      } catch (err) {
        setError("Login gagal. Cek email atau password.");
      }
  };


  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleLogin} >
        <h2 className="auth-title">Login</h2>

        <div className="auth-group">
          <label className="auth-label">Email</label>
          <input
            className="auth-input"
            type="email"
            value={email}
            placeholder="Masukkan email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="auth-group">
          <label className="auth-label">Password</label>
          <input
            className="auth-input"
            type="password"
            value={password}
            placeholder="Masukkan password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

       
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="form-actions">
          <button type="submit" className="button is-primary">Login</button>
        </div>

        <p className="auth-footer">
          Belum punya akun? <Link to="/register">Daftar</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
