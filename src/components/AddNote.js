import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { logout } from "../utils/auth";

const AddNote = () => {
  const [tag, setTag] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const saveNote = async (e) => {
    e.preventDefault();
    try {
      await api.post("/note", {
        tag,
        title,
        content,
      });
      navigate("/note");
    } catch (error) {
      console.error("Error creating note:", error);
      if (error.response && error.response.status === 401) {
        logout();
      }
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Tambah Data</h2>
      <form onSubmit={saveNote} className="form-card">
        <div className="form-group">
          <label className="label">Tag</label>
          <input
            type="text"
            className="input"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="Masukkan Tag"
            required
          />
        </div>

        <div className="form-group">
          <label className="label">Title</label>
          <input
            type="text"
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Masukkan Title"
            required
          />
        </div>

        <div className="form-group">
          <label className="label">Content</label>
          <textarea
            className="input content-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Masukkan Konten"
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="button is-primary">
            Simpan
          </button>
          <button
            type="button"
            className="button is-danger"
            onClick={() => navigate("/")}
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNote;