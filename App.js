import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import RoleBasedRoute from "./RoleBasedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
        <Route
          path="/admin"
          element={<RoleBasedRoute allowedRoles={["admin"]} />}
        />
        <Route
          path="/moderator"
          element={<RoleBasedRoute allowedRoles={["admin", "moderator"]} />}
        />
        <Route
          path="/user"
          element={<RoleBasedRoute allowedRoles={["admin", "moderator", "user"]} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
