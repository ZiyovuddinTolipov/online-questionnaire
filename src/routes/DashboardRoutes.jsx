import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import EmployerRoute from "./EmployerRoute";
import DashboardLayout from "../layouts/DashboardLayout";

// Admin sahifalari
import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageUsers from "../pages/admin/ManageUsers";
import Statistics from "../pages/admin/Statistics";
import AdminJobs from "../pages/admin/AdminJobs";

// Ish beruvchi sahifalari
import EmployerDashboard from "../pages/employer/EmployerDashboard";
import PostJob from "../pages/employer/PostJob";
import ManageApplicants from "../pages/employer/ManageApplicants";

const DashboardRoutes = () => {
    return (
        <Routes>
            {/* Admin Paneli */}
            <Route path="/admin" element={<AdminRoute><DashboardLayout /></AdminRoute>}>
                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<ManageUsers />} />
                <Route path="statistics" element={<Statistics />} />
                <Route path="jobs" element={<AdminJobs />} />
            </Route>

            {/* Ish beruvchi Paneli */}
            <Route path="/employer" element={<EmployerRoute><DashboardLayout /></EmployerRoute>}>
                <Route index element={<EmployerDashboard />} />
                <Route path="post-job" element={<PostJob />} />
                <Route path="applicants" element={<ManageApplicants />} />
            </Route>
        </Routes>
    );
};

export default DashboardRoutes;
