import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./style.css";


const UserList = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUser(response.data);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      
      <div className="mb-4">
        <Link to={`add`} className="button is-primary">
          + Tambah Baru
        </Link>
      </div>

     
      <div className="card-container">
        {users.map((user) => (
          <div key={user.id} className="card">
            <div className="card-header">
            <div className="date-label">
                  <span>Last Edit :</span>
                  <span>{new Date(user.updatedAt).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })}</span>
            </div>

              <span className="tag">{user.tag}</span>
              <h3 className="title">{user.title}</h3>
            </div>
            <div className="card-content">{user.content}</div>
            <div className="card-actions">
              <Link to={`edit/${user.id}`} className="button is-small is-info">
                Edit
              </Link>
              <button
                onClick={() => deleteUser(user.id)}
                className="button is-small is-danger"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
