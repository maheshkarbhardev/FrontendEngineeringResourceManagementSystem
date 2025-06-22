import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEngineers,
  createEngineer,
  updateEngineer,
  deleteEngineer,
} from "../features/engineers/engineerSlice";

const Engineers = () => {
  const dispatch = useDispatch();
  const engineers = useSelector((state) => state.engineers.items);
  const role = useSelector((state) => state.auth.role);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "engineer",
    skills: "",
    capacity_hr: 0,
  });

  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (role === "admin" || role === "manager") {
      dispatch(fetchEngineers());
    }
  }, [dispatch, role]);

  if (!role) return <p className="text-center mt-4">Loading role...</p>;

  if (role !== "admin") {
    return <p className="text-center mt-4">Access denied. Admins only.</p>;
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      dispatch(updateEngineer({ id: editingId, data: formData }));
    } else {
      dispatch(createEngineer(formData));
    }
    setFormData({
      name: "",
      email: "",
      role: "engineer",
      skills: "",
      capacity_hr: 0,
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (engineer) => {
    setFormData({
      name: engineer.name,
      email: engineer.email,
      role: engineer.role,
      skills: engineer.skills || "",
      capacity_hr: engineer.capacity_hr || 0,
    });
    setEditingId(engineer.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this engineer?")) {
      dispatch(deleteEngineer(id));
    }
  };

  return (
    <div className="container mt-4">
      <h2>Engineers</h2>
      <button
        className="btn btn-primary mb-3"
        onClick={() => setShowForm(true)}
      >
        + Add Engineer
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-2">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              placeholder="Engineer Name"
              required
            />
          </div>
          <div className="mb-2">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-2">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="form-control"
            >
              <option value="engineer">Engineer</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="mb-2">
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="form-control"
              placeholder="Skills (comma-separated)"
            />
          </div>
          <div className="mb-2">
            <input
              type="number"
              name="capacity_hr"
              value={formData.capacity_hr}
              onChange={handleChange}
              className="form-control"
              placeholder="Capacity (hours)"
            />
          </div>
          <button className="btn btn-success me-2" type="submit">
            {editingId ? "Update" : "Create"}
          </button>
          <button
            className="btn btn-secondary"
            onClick={(e) => {
              e.preventDefault();
              setShowForm(false);
              setEditingId(null);
              setFormData({
                name: "",
                email: "",
                role: "engineer",
                skills: "",
                capacity_hr: 0,
              });
            }}
          >
            Cancel
          </button>
        </form>
      )}

      <table className="table table-bordered shadow">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Skills</th>
            <th>Capacity (hr)</th>
            <th style={{ width: "120px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {engineers.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                No engineers found.
              </td>
            </tr>
          ) : (
            engineers.map((eng) => (
              <tr key={eng.id}>
                <td>{eng.name}</td>
                <td>{eng.email}</td>
                <td>{eng.role}</td>
                <td>{eng.skills}</td>
                <td>{eng.capacity_hr}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-1"
                    onClick={() => handleEdit(eng)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(eng.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Engineers;
