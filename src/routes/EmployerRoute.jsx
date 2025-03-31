/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const EmployerRoute = ({ children }) => {
  const { user } = useAuth();
  console.log(user)
  return user?.role == "employer" ? children : <Navigate to="/" replace />;
};

export default EmployerRoute;
