/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
    const { user } = useAuth();
    return user?.role == "admin" ? children : <Navigate to="/" replace />;
};

export default AdminRoute;
