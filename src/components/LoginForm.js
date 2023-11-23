import React, { useState } from "react";

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí se llamará a la función onLogin pasada como prop para realizar la llamada a la API
    onLogin(username, password);
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-5">
      <h2>Iniciar sesión</h2>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Usuario:
        </label>
        <input
          type="text"
          className="form-control"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Contraseña:
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Iniciar sesión
      </button>
    </form>
  );
};

export default LoginForm;
