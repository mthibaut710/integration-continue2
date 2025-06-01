const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Sample data
const users = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Developer",
  },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Designer" },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "Manager",
  },
];

// Routes
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.get("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});

app.post("/api/users", (req, res) => {
  const { name, email, role } = req.body;
  const newUser = {
    id: users.length + 1,
    name,
    email,
    role,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
  console.log(`📊 Health check: http://0.0.0.0:${PORT}/api/health`);
});
