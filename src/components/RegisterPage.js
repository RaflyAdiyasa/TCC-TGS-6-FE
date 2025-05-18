// src/pages/RegisterPage.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

const RegisterPage = () => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="auth-container">
      <form className="auth-card">
        <h2 className="auth-title">Register</h2>

        <div className="auth-group">
          <label className="auth-label">Nama Lengkap</label>
          <input
            className="auth-input"
            type="text"
            value={nama}
            placeholder="Masukkan nama"
            onChange={(e) => setNama(e.target.value)}
          />
        </div>

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

        <button className="auth-button">Daftar</button>

        <p className="auth-footer">
          Sudah punya akun? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
