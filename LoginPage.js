// src/components/LoginPage.js
import React, { useState } from "react";

function LoginPage({ onLogin, disabled }) {
    const [role, setRole] = useState("user");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const ADMIN_PASSWORD = "admin123";

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (disabled) {
            setError("Please select an event first.");
            return;
        }

        if (role === "admin" && password !== ADMIN_PASSWORD) {
            setError("Invalid admin password");
            return;
        }

        onLogin(role);
    };

    return (
        <div className="card">
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                {/* Radios in correct order */}
                <div className="login-options">
                    <label className="login-option">
                        <input
                            type="radio"
                            name="role"
                            value="user"
                            checked={role === "user"}
                            onChange={() => setRole("user")}
                        />
                        <span>User Login</span>
                    </label>

                    <label className="login-option">
                        <input
                            type="radio"
                            name="role"
                            value="admin"
                            checked={role === "admin"}
                            onChange={() => setRole("admin")}
                        />
                        <span>Admin Login</span>
                    </label>
                </div>

                {/* Show password only for admin */}
                {role === "admin" && (
                    <input
                        type="password"
                        placeholder="Enter admin password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                )}

                <button type="submit" >
                    Login
                </button>

                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
}

export default LoginPage;