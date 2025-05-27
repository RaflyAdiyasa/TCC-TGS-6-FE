import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";
import { logout } from "../utils/auth";

const EditNote = () => {
  const [tag, setTag] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      getNoteById();
    }
  }, [navigate, id]);

  const getNoteById = async () => {
    try {
      const response = await api.get(`/note/${id}`);
      setTag(response.data.tag);
      setTitle(response.data.title);
      setContent(response.data.content);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching note:", error);
      if (error.response && error.response.status === 401) {
        logout();
      }
      setLoading(false);
    }
  };

  const updateNote = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/note/${id}`, {
        tag,
        title,
        content,
      });
      navigate("/note");
    } catch (error) {
      console.error("Error updating note:", error);
      if (error.response && error.response.status === 401) {
        logout();
      }
    }
  };

  if (loading) {
    return <div className="form-container">Loading...</div>;
  }

  return (
    <div className="form-container">
      <h2 className="form-title">Edit Data</h2>
      <form onSubmit={updateNote} className="form-card">
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
            rows="6"
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="button is-primary">
            Perbarui
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

export default EditNote;