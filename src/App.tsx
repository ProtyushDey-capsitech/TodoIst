import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import AnonymusRoute from "./routes/AnonymusRoute.tsx";
import { RolesAuthRoute } from "./routes/RolesRoute.tsx";
import { Spin } from "antd";

const LoginPage = lazy(() => import("./Pages/LoginPage.tsx"));
const OtpPage = lazy(() => import("./Pages/OtpPage.tsx"));
const SignupPage = lazy(() => import("./Pages/SignupPage.tsx"));
const DashBoardPages = lazy(() => import("./routes/DashBoardPages.tsx"));
const RoleDashboard = lazy(() => import("./routes/RoleDashboard.tsx"));
const Employee = lazy(() => import("./Pages/Employee.tsx"));
const ProjectPage = lazy(() => import("./Pages/ProjectPage.tsx"));
const Projectdata = lazy(() => import("./Pages/Projectdata.tsx"));
const TaskPage = lazy(() => import("./Pages/TaskPage.tsx"));
const Unauthorized = lazy(() => import("./Pages/Unauthorized.tsx"));

function App() {
  return (
    <Suspense fallback={<div className="w-100vw min-h-200  flex items-center justify-center"><Spin  description="Loading" size="large"></Spin></div>}>
      <Routes>
        <Route element={<AnonymusRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/otp" element={<OtpPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashBoardPages />}>
            <Route path="/" element={<RolesAuthRoute roles={["ADMIN", "EMPLOYEE"]}><RoleDashboard /></RolesAuthRoute>} />
            <Route path="/Employee" element={<RolesAuthRoute roles={["ADMIN"]}><Employee /></RolesAuthRoute>} />
            <Route path="/Projects" element={<ProjectPage />} />
            <Route path="/Tasks" element={<TaskPage />} />
            <Route path="/Unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<Unauthorized />} />
          </Route>

          <Route path="project/:id" element={<Projectdata />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;