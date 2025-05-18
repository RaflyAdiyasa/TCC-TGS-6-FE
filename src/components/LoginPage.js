// src/pages/LoginPage.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css"; 
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="auth-container">
      <form className="auth-card">
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

        <button className="auth-button">Masuk</button>

        <p className="auth-footer">
          Belum punya akun? <Link to="/register">Daftar</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
