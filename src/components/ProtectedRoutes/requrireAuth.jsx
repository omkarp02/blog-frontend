import React from "react";
import useAuthStore from "../../services/store/authStore";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequrireAuth = ({ requireRoles }) => {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();

  return user?.role && requireRoles.includes(user.role) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequrireAuth;
