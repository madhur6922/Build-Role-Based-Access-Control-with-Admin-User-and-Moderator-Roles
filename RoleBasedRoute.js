import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Navigate } from "react-router-dom";

function RoleBasedRoute({ allowedRoles }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const location = useLocation();
  const [data, setData] = useState("");

  const route = location.pathname.replace("/", ""); // admin/moderator/user

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/${route}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data.message);
      } catch (err) {
        setData("Access Denied!");
      }
    };
    fetchData();
  }, [route, token]);

  if (!token) return <Navigate to="/" />;

  return allowedRoles.includes(role) ? (
    <div className="dashboard">
      <h2>{route.toUpperCase()} PAGE</h2>
      <p>{data}</p>
    </div>
  ) : (
    <h3 style={{ textAlign: "center", marginTop: "100px", color: "red" }}>
      ❌ Access Denied – You are not authorized for this page.
    </h3>
  );
}

export default RoleBasedRoute;
