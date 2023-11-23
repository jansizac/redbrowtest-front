// src/components/Layout.js
import React from 'react';

const Layout = ({ children, isAuthenticated, onLogout }) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary" >
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">RedBrow</span>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto">
              {isAuthenticated && (
                <button onClick={onLogout} className="btn btn-outline-light">Cerrar sesión</button>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className="container my-4">
        {children}
      </div>
    </div>
  );
};

export default Layout;
