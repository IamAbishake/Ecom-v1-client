import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const adminInfo = JSON.parse(localStorage.getItem('adminInfo') || 'null');
    
    if (adminInfo) {
      setAdmin(adminInfo);
      setLoading(false);
    } else {
      // If not found in localStorage, check server
      fetchAdminData();
    }
  }, []);

  const fetchAdminData = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/admin/profile', {
        withCredentials: true
      });
      
      if (data._id) {
        setAdmin(data);
        localStorage.setItem('adminInfo', JSON.stringify(data));
      }
    } catch (error) {
      console.log('No admin session found');
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    const { data } = await axios.post('http://localhost:5000/api/admin/login', credentials, {
      withCredentials: true
    });
    
    setAdmin(data);
    localStorage.setItem('adminInfo', JSON.stringify(data));
    return data;
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:5000/api/admin/logout', {}, {
        withCredentials: true
      });
    } catch (error) {
      console.error('Logout error', error);
    } finally {
      setAdmin(null);
      localStorage.removeItem('adminInfo');
    }
  };

  return (
    <AdminContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};