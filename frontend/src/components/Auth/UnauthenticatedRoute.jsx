import { Navigate, Outlet } from "react-router-dom";

const UnauthenticatedRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return !user ? <Outlet /> : <Navigate to="/" />;
};
export default UnauthenticatedRoute;
