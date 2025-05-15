import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddNote = () => {
  const [tag, setTag] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", {
        tag,
        title,
        content,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Tambah Data</h2>
      <form onSubmit={saveUser} className="form-card">
        {/* Input Tag */}
        <div className="form-group">
          <label className="label">Tag</label>
          <input
            type="text"
            className="input"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="Masukkan Tag"
          />
        </div>

        {/* Input Title */}
        <div className="form-group">
          <label className="label">Title</label>
          <input
            type="text"
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Masukkan Title"
            rows="6"
          />
        </div>

        {/* Input Content (Textarea) */}
        <div className="form-group">
          <label className="label">Content</label>
          <textarea
            className="input content-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Masukkan Konten"
          />
        </div>

        {/* Tombol Aksi */}
        <div className="form-actions">
          <button type="submit" className="button is-primary">
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNote;
