import {Route, Routes } from "react-router";
import LoginPage from "./Pages/LoginPage.tsx";
import TodoPage from "./Pages/TodoPage.tsx";

import ProtectedRoute from "./ProtectedRoute.tsx";

function App() {
  return (
    <>
      <Routes>
      <Route path="/login" element={<LoginPage/>}/>
      <Route element={<ProtectedRoute />}>
          <Route path="/" element={<TodoPage/>} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
