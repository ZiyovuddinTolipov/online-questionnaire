import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DashboardLayout = () => {
    const { logout, user } = useAuth();
    const location = useLocation();

    const getPageTitle = () => {
        if (location.pathname.includes("admin")) return "Admin Paneli";
        if (location.pathname.includes("employer")) return "Ish Beruvchi Paneli";
        return "Dashboard";
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-gray-800 text-white p-4 flex flex-col">
                <h2 className="text-xl font-bold mb-6">{getPageTitle()}</h2>
                <nav className="flex-1">
                    <ul className="space-y-2">
                        {user?.role === "admin" ? (
                            <>
                                <li><Link to="/admin" className="block p-3 bg-gray-700 rounded">Dashboard</Link></li>
                                <li><Link to="/admin/users" className="block p-3 bg-gray-700 rounded">Foydalanuvchilar</Link></li>
                                <li><Link to="/admin/statistics" className="block p-3 bg-gray-700 rounded">Statistika</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/employer" className="block p-3 bg-gray-700 rounded">Dashboard</Link></li>
                                <li><Link to="/employer/post-job" className="block p-3 bg-gray-700 rounded">Vakansiya qo‘shish</Link></li>
                                <li><Link to="/employer/applicants" className="block p-3 bg-gray-700 rounded">Nomzodlar</Link></li>
                            </>
                        )}
                    </ul>
                </nav>
                <button onClick={logout} className="w-full bg-red-500 text-white p-3 rounded mt-4">
                    Chiqish
                </button>
            </aside>

            <div className="flex-1 flex flex-col">
                <header className="bg-white shadow p-4 flex justify-between items-center">
                    <h1 className="text-xl font-semibold">{getPageTitle()}</h1>
                    <span className="text-gray-600">Xush kelibsiz, {user?.name || "Foydalanuvchi"}!</span>
                </header>
                <main className="flex-1 p-6 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
