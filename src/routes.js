import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Assignments from "./pages/Assignments";
import Engineers from "./pages/Engineers";
import PrivateRoute from "./components/PrivateRoute";
import RoleBasedRoute from "./components/RoleBasedRoute";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/projects"
        element={
          <PrivateRoute>
            <RoleBasedRoute allowedRoles={["admin", "manager"]}>
              <Projects />
            </RoleBasedRoute>
          </PrivateRoute>
        }
      />
      <Route
        path="/assignments"
        element={
          <PrivateRoute>
            <RoleBasedRoute allowedRoles={["admin", "manager"]}>
              <Assignments />
            </RoleBasedRoute>
          </PrivateRoute>
        }
      />
      <Route
        path="/engineers"
        element={
          <PrivateRoute>
            <RoleBasedRoute allowedRoles={["admin", "manager"]}>
              <Engineers />
            </RoleBasedRoute>
          </PrivateRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
