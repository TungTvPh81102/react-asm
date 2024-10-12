import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken ? <Navigate to="/admin" /> : <Outlet />;
};

export default PublicRoute;
