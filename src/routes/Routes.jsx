import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import EmployerRoute from "./EmployerRoute";

// Asosiy sahifalar
import Home from "@/pages/Home";
import Login from "@/pages/login";
import Register from "@/pages/Register";
import JobList from "@/pages/JobList";
import JobDetails from "@/pages/JobDetails";
import Resume from "@/pages/Resume";

// Admin sahifalari
import AdminDashboard from "@/pages/admin/AdminDashboard";
import ManageUsers from "@/pages/admin/ManageUsers";
import Statistics from "@/pages/admin/Statistics";

// Ish beruvchi sahifalari
import EmployerDashboard from "@/pages/employer/EmployerDashboard";
import PostJob from "@/pages/employer/PostJob";
import ManageApplicants from "@/pages/employer/ManageApplicants";
import AdminJobs from "@/pages/admin/AdminJobs";
import JobsById from "@/pages/admin/JobsById";
import NotFound from "@/pages/NotFound";
import NewJob from "@/components/common/NewJob";
import Jobs from "@/pages/JobList";

const AppRoutes = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Umumiy sahifalar */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/jobs" element={<JobList />} />
                    <Route path="/jobs/:id" element={<JobDetails />} />
                    <Route path="/resume" element={<ProtectedRoute><Resume /></ProtectedRoute>} />

                    <Route path="/employer" element={<EmployerRoute><EmployerDashboard /></EmployerRoute>}>
                        <Route index element={<Jobs />} />
                        <Route path="applicants" element={<ManageApplicants />} />
                        <Route path="jobs">
                            <Route index element={<Jobs />} />
                            <Route path="new" element={<NewJob />} />
                            <Route path=":id" element={<JobsById />} />
                        </Route>
                    </Route>

                    {/* Admin yo‘nalishlari */}
                    <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>}>
                        <Route index element={<Statistics />} />
                        <Route path="users" element={<ManageUsers />} />
                        <Route path="statistics" element={<Statistics />} />
                        <Route path="jobs">
                            <Route index element={<AdminJobs />} />
                            <Route path="new" element={<NewJob />} />
                            <Route path=":id" element={<JobsById />} />
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default AppRoutes;
