import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl mb-4">Dashboard</h1>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
                Chiqish
            </button>
        </div>
    );
};

export default Dashboard;
