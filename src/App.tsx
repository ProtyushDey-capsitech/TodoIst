import { Route, Routes } from "react-router";
import LoginPage from "./Pages/LoginPage.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import AnonymusRoute from "./routes/AnonymusRoute.tsx";
import SignupPage from "./Pages/SignupPage.tsx";
import ProjectPage from "./Pages/ProjectPage.tsx";
import DashBoard from "./Pages/DashBoard.tsx";
import Projectdata from "./Pages/Projectdata.tsx";
import OtpPage from "./Pages/OtpPage.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route element={<AnonymusRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/otp" element={<OtpPage/>} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashBoard />}>
            <Route path="/Projects" element={<ProjectPage />} />
          </Route>
          <Route path="project/:id" element={<Projectdata/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
