import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:3001";

  const fetchHealth = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/health`);
      const data = await response.json();
      setHealth(data);
    } catch (err) {
      console.error("Health check failed:", err);
      setHealth({ status: "error", message: err.message });
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE}/api/users`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setError(`Failed to connect to backend: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
    fetchUsers();
  }, []);

  const handleRefresh = () => {
    fetchHealth();
    fetchUsers();
  };

  return (
    <div className="App">
      <div className="header">
        <h1>🐳 Docker Training Application</h1>
        <p>Frontend + Backend Containerization Example</p>
      </div>

      <div className="status">
        <div
          className={`status-card ${
            health?.status === "healthy" ? "connected" : "error"
          }`}
        >
          <h3>Backend Status</h3>
          <p>Status: {health?.status || "Unknown"}</p>
          <p>API URL: {API_BASE}</p>
        </div>
        <div className={`status-card ${!error ? "connected" : "error"}`}>
          <h3>Frontend Status</h3>
          <p>Status: {!error ? "Connected" : "Error"}</p>
          <p>Build: Production Ready</p>
        </div>
      </div>

      <button className="refresh-btn" onClick={handleRefresh}>
        🔄 Refresh Data
      </button>

      <div className="users-section">
        <h2>Team Members</h2>

        {loading && <div className="loading">Loading users...</div>}

        {error && (
          <div className="error">
            <h3>Connection Error</h3>
            <p>{error}</p>
            <p>Make sure the backend container is running on port 3001</p>
          </div>
        )}

        {!loading && !error && users.length > 0 && (
          <div className="user-grid">
            {users.map((user) => (
              <div key={user.id} className="user-card">
                <h3>{user.name}</h3>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Role:</strong> {user.role}
                </p>
                <p>
                  <strong>ID:</strong> {user.id}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
