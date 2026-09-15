import { Route, Routes } from "react-router";
import LoginPage from "./Pages/LoginPage.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import AnonymusRoute from "./routes/AnonymusRoute.tsx";
import SignupPage from "./Pages/SignupPage.tsx";
import ProjectPage from "./Pages/ProjectPage.tsx";
import Projectdata from "./Pages/Projectdata.tsx";
import OtpPage from "./Pages/OtpPage.tsx";
import DashBoardPages from "./routes/DashBoardPages.tsx";
import Employee from "./Pages/Employee.tsx";
import { RolesAuthRoute } from "./routes/RolesRoute.tsx";
import RoleDashboard from "./routes/RoleDashboard.tsx";
import TaskPage from "./Pages/TaskPage.tsx";

function App() {
  return (
    <Routes>
      <Route element={<AnonymusRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<DashBoardPages />}>
          <Route
            path="/"
            element={
              <RolesAuthRoute roles={["ADMIN", "EMPLOYEE"]}>
                <RoleDashboard />
              </RolesAuthRoute>
            }
          />
          <Route
            path="/Employee"
            element={
              <RolesAuthRoute roles={["ADMIN"]}>
                <Employee />
              </RolesAuthRoute>
            }
          />
          <Route path="/Projects" element={<ProjectPage />} />
          <Route path="/Tasks" element={<TaskPage />} />
          {/* <Route path="/Employee" element={<Employee/>} />  */}
        </Route>
        <Route path="project/:id" element={<Projectdata />} />
      </Route>
    </Routes>
  );
}

export default App;
