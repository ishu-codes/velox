import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ redirectPath = "/login" }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}
