import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import "../style.css";
import { logout } from "../utils/auth";

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getNotes = async () => {
    try {
      const response = await api.get("/note");
      setNotes(response.data);
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        logout();
      }
      console.error("Error fetching notes:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      getNotes();
    }
  }, [navigate]);

  const deleteNote = async (id) => {
    try {
      await api.delete(`/note/${id}`);
      getNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
      if (error.response && error.response.status === 401) {
        logout();
      }
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return <div className="container mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="header-section">
        <div className="mb-4">
          <Link to="add" className="button is-primary">
            + Tambah Baru
          </Link>
        </div>
        <button onClick={handleLogout} className="button is-danger">
          Logout
        </button>
      </div>

      <div className="card-container">
        {notes.length > 0 ? (
          notes.map((note) => (
            <div key={note.id} className="card">
              <div className="card-header">
                <div className="date-label">
                  <span>Last Edit :</span>
                  <span>
                    {new Date(note.updatedAt).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <span className="tag">{note.tag}</span>
                <h3 className="title">{note.title}</h3>
              </div>
              <div className="card-content">{note.content}</div>
              <div className="card-actions">
                <Link to={`edit/${note.id}`} className="button is-small is-info">
                  Edit
                </Link>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="button is-small is-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No notes found. Create your first note!</p>
        )}
      </div>
    </div>
  );
};

export default NoteList;