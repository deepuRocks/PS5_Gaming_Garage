import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminUsers.css";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    role: "user",
    first_name: "",
    last_name: "",
    password: ""
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:5000/api/admin/users", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setUsers(res.data));
  }, []);

  // ✅ Open form for new user
  const openCreateForm = () => {
    setEditingUser(null);
    setFormData({ email: "", role: "user", first_name: "", last_name: "", password: "" });
    setShowForm(true);
  };

  // ✅ Open form for editing
  const openEditForm = (user) => {
    setEditingUser(user.id);
    setFormData({
      email: user.email,
      role: user.role,
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      password: "" // leave blank unless updating
    });
    setShowForm(true);
  };

  // ✅ Submit form (create or update)
  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    try {
      if (editingUser) {
        const res = await axios.put(`http://localhost:5000/api/admin/users/${editingUser}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(users.map(u => u.id === editingUser ? res.data : u));
      } else {
        const res = await axios.post("http://localhost:5000/api/admin/users", formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers([...users, res.data]);
      }
      setShowForm(false);
    } catch (err) {
      console.error("Error saving user:", err);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div className="admin-users">
      <h2>Manage Users</h2>
      <button className="action-btn" onClick={openCreateForm}>+ New User</button>

      <table>
        <thead>
          <tr>
            <th>ID</th><th>First Name</th><th>Last Name</th><th>Email</th><th>Role</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.first_name || "-"}</td>
              <td>{u.last_name || "-"}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button className="action-btn admin-btn-edit" onClick={() => openEditForm(u)}>Edit</button>
                <button className="action-btn admin-btn-delete" onClick={() => handleDelete(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Simple inline form */}
      {showForm && (
        <div className="form-box">
          <h3>{editingUser ? "Edit User" : "Create User"}</h3>
          <input placeholder="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}/>
          <input placeholder="First Name" value={formData.first_name} onChange={e => setFormData({ ...formData, first_name: e.target.value })}/>
          <input placeholder="Last Name" value={formData.last_name} onChange={e => setFormData({ ...formData, last_name: e.target.value })}/>
          <input type="password" placeholder="Password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })}/>
          <select value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <div style={{ marginTop: "10px" }}>
            <button className="action-btn save" onClick={handleSubmit}>Save</button>
            <button className="action-btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
