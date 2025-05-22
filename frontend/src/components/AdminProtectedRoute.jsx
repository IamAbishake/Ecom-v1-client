import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

const AdminProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        // First check localStorage for adminInfo
        const adminInfo = localStorage.getItem('adminInfo');
        
        if (!adminInfo) {
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }
        
        // Verify with backend
        const { data } = await axios.get('http://localhost:5000/api/admin/profile', {
          withCredentials: true
        });
        
        if (data._id) {
          setIsAuthenticated(true);
        } else {
          // Clear localStorage if backend validation fails
          localStorage.removeItem('adminInfo');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Auth verification error:", error);
        localStorage.removeItem('adminInfo');
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl">Verifying authentication...</div>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminProtectedRoute;