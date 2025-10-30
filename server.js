import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = "mysecretkey123";

// Dummy user database
const users = [
  { email: "admin@college.com", password: "12345", role: "admin" },
  { email: "moderator@college.com", password: "12345", role: "moderator" },
  { email: "user@college.com", password: "12345", role: "user" },
];

// Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ email: user.email, role: user.role }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token, role: user.role });
});

// Middleware to verify token and role
function verifyRole(allowedRoles) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(403).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) return res.status(401).json({ message: "Invalid or expired token" });

      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ message: "Access Denied: Insufficient Permissions" });
      }
      req.user = decoded;
      next();
    });
  };
}

// Role-based routes
app.get("/admin", verifyRole(["admin"]), (req, res) => {
  res.json({ message: "Welcome Admin! You have full access." });
});

app.get("/moderator", verifyRole(["admin", "moderator"]), (req, res) => {
  res.json({ message: "Welcome Moderator! You can manage user content." });
});

app.get("/user", verifyRole(["admin", "moderator", "user"]), (req, res) => {
  res.json({ message: "Welcome User! You can view content." });
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
