import { useState } from "react";
import {
  Route,
  Routes,
  Navigate
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  const [token, setToken] = useState(sessionStorage.getItem("jwt") || "");
  return (
    <Routes>
      <Route path="/" element={token ? <Home token={token} /> : <Navigate to="login" />} />
      <Route path="/login" element={token ? <Navigate to="/" /> : <Login setToken={setToken} />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
