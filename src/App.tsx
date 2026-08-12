import {Route, Routes } from "react-router";
import LoginPage from "./Pages/LoginPage.tsx";
import TodoPage from "./Pages/TodoPage.tsx";

import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import AnonymusRoute from "./routes/AnonymusRoute.tsx";
import SignupPage from "./Pages/SignupPage.tsx";
import ProjectPage from "./Pages/ProjectPage.tsx";

function App() {
  return (
    <>
    {/* <LoginPage/> */}
    {/* <SignupPage/> */}
      <Routes>
      <Route element={<AnonymusRoute/>}>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/signup" element={<SignupPage/>}/>
      </Route>
      <Route element={<ProtectedRoute />}>
          <Route path="/" element={<ProjectPage/>} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
