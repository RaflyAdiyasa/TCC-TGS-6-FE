import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditNote = () => {
  const [tag, setTag] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();



  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/users/${id}`, {
        tag,
        title,
        content,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  

  const getUserById = async () => {
    const response = await axios.get(`http://localhost:5000/${id}`);
    setTag(response.data.tag);
    setTitle(response.data.title);
    setContent(response.data.content);
  };

  useEffect(() => {
    getUserById();
  }, []);
  
  return (
    <div className="form-container">
      <h2 className="form-title">Edit Data</h2>
      <form onSubmit={updateUser} className="form-card">
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

        <div className="form-group">
          <label className="label">Title</label>
          <input
            type="text"
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Masukkan Title"
          />
        </div>

        
        <div className="form-group">
          <label className="label">Content</label>
          <textarea
            className="input content-textarea "
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Masukkan Konten"
            rows="6"
            
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="button is-primary">
            Perbarui
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditNote;
