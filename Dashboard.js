import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="dashboard">
      <h2>Welcome to Dashboard</h2>
      <p>Your role: <b>{role}</b></p>
      <div>
        {role === "admin" && <button onClick={() => navigate("/admin")}>Admin Page</button>}
        {(role === "moderator" || role === "admin") && (
          <button onClick={() => navigate("/moderator")}>Moderator Page</button>
        )}
        <button onClick={() => navigate("/user")}>User Page</button>
      </div>
      <button className="logout" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
