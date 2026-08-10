import {Route, Routes } from "react-router";
import LoginPage from "./Pages/LoginPage.tsx";
import TodoPage from "./Pages/TodoPage.tsx";

import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import AnonymusRoute from "./routes/AnonymusRoute.tsx";

function App() {
  return (
    <>
      <Routes>
      <Route element={<AnonymusRoute/>}>
      <Route path="/login" element={<LoginPage/>}/>
      </Route>
      <Route element={<ProtectedRoute />}>
          <Route path="/" element={<TodoPage/>} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
