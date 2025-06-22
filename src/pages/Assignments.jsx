import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAssignments,
  createAssignment,
  updateAssignment,
  deleteAssignment,
} from "../features/assignments/assignmentSlice";
import { fetchProjects } from "../features/projects/projectSlice";
import { fetchEngineers } from "../features/engineers/engineerSlice";

const Assignments = () => {
  const dispatch = useDispatch();
  const { items: assignments } = useSelector((state) => state.assignments);
  const { items: projects } = useSelector((state) => state.projects);
  const { items: engineers } = useSelector((state) => state.engineers);
  const { user, role } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    engineer_id: "",
    project_id: "",
    hours_allocated: "",
    start_date: "",
    end_date: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (role === "admin" || role === "manager") {
      dispatch(fetchAssignments());
      dispatch(fetchProjects());
      dispatch(fetchEngineers());
    }
  }, [dispatch, role]);

  // ✅ Fix: Handle loading state
  if (role === undefined || role === null) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  // ✅ Access control after role is available
  if (role !== "admin" && role !== "manager") {
    return (
      <p className="text-center mt-4">
        Access denied. Admins and Managers only.
      </p>
    );
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      dispatch(updateAssignment({ id: editingId, data: formData }));
    } else {
      dispatch(createAssignment(formData));
    }
    setFormData({
      engineer_id: "",
      project_id: "",
      hours_allocated: "",
      start_date: "",
      end_date: "",
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (assignment) => {
    setFormData({
      engineer_id: assignment.engineer_id,
      project_id: assignment.project_id,
      hours_allocated: assignment.hours_allocated || "",
      start_date: assignment.start_date?.split("T")[0] || "",
      end_date: assignment.end_date?.split("T")[0] || "",
    });
    setEditingId(assignment.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this assignment?")) {
      dispatch(deleteAssignment(id));
    }
  };

  const getEngineerName = (id) => {
    const engineer = engineers.find((e) => e.id === id);
    return engineer?.name || "Unknown";
  };

  const getProjectName = (id) => {
    const project = projects.find((p) => p.id === id);
    return project?.name || "Unknown";
  };

  return (
    <div className="container mt-4">
      <h2>Assignments</h2>
      <button
        className="btn btn-primary mb-3"
        onClick={() => setShowForm(true)}
      >
        + Assign Engineer
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-2">
            <select
              name="engineer_id"
              value={formData.engineer_id}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">Select Engineer</option>
              {engineers.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-2">
            <select
              name="project_id"
              value={formData.project_id}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">Select Project</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <input
            type="number"
            name="hours_allocated"
            value={formData.hours_allocated}
            onChange={handleChange}
            className="form-control mb-2"
            placeholder="Hours Allocated"
            required
          />

          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            className="form-control mb-2"
            required
          />

          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            className="form-control mb-2"
            required
          />

          <button type="submit" className="btn btn-success me-2">
            {editingId ? "Update" : "Assign"}
          </button>
          <button
            className="btn btn-secondary"
            onClick={(e) => {
              e.preventDefault();
              setShowForm(false);
              setEditingId(null);
              setFormData({
                engineer_id: "",
                project_id: "",
                assigned_date: "",
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
            <th>Engineer</th>
            <th>Project</th>
            <th>Hours</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th style={{ width: "120px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignments.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                No assignments found.
              </td>
            </tr>
          ) : (
            assignments.map((a) => (
              <tr key={a.id}>
                <td>{getEngineerName(a.engineer_id)}</td>
                <td>{getProjectName(a.project_id)}</td>
                <td>{a.hours_allocated}</td>
                <td>{a.start_date?.split("T")[0]}</td>
                <td>{a.end_date?.split("T")[0]}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-1"
                    onClick={() => handleEdit(a)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(a.id)}
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

export default Assignments;
