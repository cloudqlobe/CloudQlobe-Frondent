// AuthRoutes.jsx
import { Navigate } from "react-router-dom";
import useAuth from "../modules/admin/v2/auth/page";

export const CustomerRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth('user');

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/signin" replace />;
};

export const AdminRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth('admin');

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/member/signin" replace />;
};
