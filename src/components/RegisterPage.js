// src/pages/RegisterPage.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import "../style.css";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    
    // Validasi sederhana
    if (!name || !email || !password || !gender) {
      setError("Semua field harus diisi");
      return;
    }

    try {
      setLoading(true);
      await api.post('/users', {
        name,
        email,
        gender,
        password
      });
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      setError(error.response?.data?.message || "Registrasi gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleRegister}>
        <h2 className="auth-title">Register</h2>

        {error && <p className="auth-error">{error}</p>}

        <div className="auth-group">
          <label className="auth-label">Nama Lengkap</label>
          <input
            className="auth-input"
            type="text"
            value={name}
            placeholder="Masukkan nama"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="auth-group">
          <label className="auth-label">Gender</label>
          <select
            className="auth-input"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Pilih Gender</option>
            <option value="male">Laki-laki</option>
            <option value="female">Perempuan</option>
          </select>
        </div>

        <div className="auth-group">
          <label className="auth-label">Email</label>
          <input
            className="auth-input"
            type="email"
            value={email}
            placeholder="Masukkan email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="auth-group">
          <label className="auth-label">Password</label>
          <input
            className="auth-input"
            type="password"
            value={password}
            placeholder="Masukkan password (min 6 karakter)"
            onChange={(e) => setPassword(e.target.value)}
            minLength="6"
            required
          />
        </div>

        <button 
          type="submit" 
          className="auth-button"
          disabled={loading}
        >
          {loading ? "Memproses..." : "Daftar"}
        </button>

        <p className="auth-footer">
          Sudah punya akun? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;