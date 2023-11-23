// src/App.js
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import LoginForm from './components/LoginForm';
import UserTable from './components/UserTable'; // Suponiendo que tienes este componente
import loginUser from './services/authService';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = (isAuthSuccessful) => {
    setIsAuthenticated(isAuthSuccessful);
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsAuthenticated(false);
  };

  return (
    <Layout isAuthenticated={isAuthenticated} onLogout={handleLogout}>
      {isAuthenticated ? (
        <UserTable setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <div className="card mx-auto" style={{ maxWidth: '400px' }}>
          <div className="card-body">
            <LoginForm onLogin={(username, password) => loginUser(username, password, handleLoginSuccess)} />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
