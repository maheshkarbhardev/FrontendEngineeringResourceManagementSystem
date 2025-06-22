import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
} from '../features/projects/projectSlice';

const Projects = () => {
  const dispatch = useDispatch();
  const { items: projects } = useSelector((state) => state.projects);

  const [formData, setFormData] = useState({ name: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      dispatch(updateProject({ id: editingId, data: formData }));
    } else {
      dispatch(createProject(formData));
    }
    setFormData({ name: '', description: '' });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (project) => {
    setFormData({ name: project.name, description: project.description });
    setEditingId(project.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this project?')) {
      dispatch(deleteProject(id));
    }
  };

  return (
    <div className="container mt-4">
      <h2>Projects</h2>
      <button className="btn btn-primary mb-3" onClick={() => setShowForm(true)}>
        + Add Project
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
              placeholder="Project Name"
              required
            />
          </div>
          <div className="mb-2">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-control"
              placeholder="Description"
              required
            />
          </div>
          <button className="btn btn-success me-2" type="submit">
            {editingId ? 'Update' : 'Create'}
          </button>
          <button className="btn btn-secondary" onClick={() => {
            setShowForm(false);
            setFormData({ name: '', description: '' });
            setEditingId(null);
          }}>
            Cancel
          </button>
        </form>
      )}

      <table className="table table-bordered shadow">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th style={{ width: '120px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center">No projects found.</td>
            </tr>
          )}
          {projects.map((proj) => (
            <tr key={proj.id}>
              <td>{proj.name}</td>
              <td>{proj.description}</td>
              <td>
                <button className="btn btn-sm btn-warning me-1" onClick={() => handleEdit(proj)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(proj.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Projects;