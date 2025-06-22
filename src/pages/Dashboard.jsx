import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardSummary } from "../features/dashboard/dashboardSlice";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access Redux state
  const {
    totalEngineers,
    totalProjects,
    totalAssignments,
    engineerUtilization,
    loading,
    error,
  } = useSelector((state) => state.dashboard);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // Fetch summary when component mounts
  useEffect(() => {
    dispatch(fetchDashboardSummary());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>

      <button className="btn btn-danger" onClick={handleLogout}>
        Logout
      </button>

      <div className="my-4 d-flex justify-content-center gap-3">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/engineers")}
        >
          View Engineers
        </button>
        <button
          className="btn btn-success"
          onClick={() => navigate("/projects")}
        >
          View Projects
        </button>
        <button
          className="btn btn-warning"
          onClick={() => navigate("/assignments")}
        >
          View Assignments
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">Error: {error}</p>
      ) : (
        <>
          <div className="row text-center my-4">
            <div className="col-md-4">
              <div className="card bg-light p-3 shadow rounded">
                <h5>Total Engineers</h5>
                <h2>{totalEngineers}</h2>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card bg-light p-3 shadow rounded">
                <h5>Total Projects</h5>
                <h2>{totalProjects}</h2>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card bg-light p-3 shadow rounded">
                <h5>Total Assignments</h5>
                <h2>{totalAssignments}</h2>
              </div>
            </div>
          </div>

          <div className="row justify-content-center mt-5">
            <h4 className="text-center mb-3">Engineer Allocation</h4>

            <PieChart width={400} height={300}>
              <Pie
                data={engineerUtilization}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {engineerUtilization.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
