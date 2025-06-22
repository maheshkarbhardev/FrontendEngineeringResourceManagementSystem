import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const role = useSelector((state) => state.auth.role);
  const userRole = role?.toLowerCase();
  const normalizedRoles = allowedRoles.map((r) => r.toLowerCase());

  return normalizedRoles.includes(userRole)
    ? children
    : <Navigate to="/dashboard" replace />;
};

export default RoleBasedRoute;