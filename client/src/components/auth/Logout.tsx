import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function Logout() {
  const { logout } = useAuth();
  useEffect(() => {
    logout();
  }, []);
  return (
    <div>
      Logging out!
      <Navigate to={"/"} replace />
    </div>
  );
}
