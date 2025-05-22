import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff, Shield, ArrowLeft } from 'lucide-react';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/admin/profile', {
          withCredentials: true
        });
        
        if (data._id) {
          navigate('/admin/dashboard');
        }
      } catch (error) {
        console.log("Not authenticated yet");
      }
    };
    
    checkAdminAuth();
  }, [navigate]);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', formData, {
        withCredentials: true
      });
      
      const data = response.data;
      console.log("Login response:", data);
      
      if (data._id) {
        localStorage.setItem('adminInfo', JSON.stringify(data));
        navigate('/admin/dashboard', { replace: true });
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-purple-900/50 to-slate-900/50"></div>
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Back Button */}
      <Link 
        to="/login" 
        className="absolute top-6 left-6 flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200"
      >
        <ArrowLeft size={20} />
        <span>Back to Login</span>
      </Link>
      
      {/* Login Form */}
      <div className="relative bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
          <p className="text-white/70 text-sm">Secure access to admin dashboard</p>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 backdrop-blur border border-red-500/30 text-red-200 px-4 py-3 rounded-lg mb-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              {error}
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-white/90 text-sm font-medium mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              className="w-full px-4 py-3 bg-white/10 backdrop-blur border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              id="email"
              type="email"
              name="email"
              placeholder="Enter your admin email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="username"
              required
            />
          </div>
          
          {/* Password Field */}
          <div>
            <label className="block text-white/90 text-sm font-medium mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="w-full px-4 py-3 bg-white/10 backdrop-blur border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 pr-12"
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-white/60 hover:text-white transition-colors duration-200"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          
          {/* Submit Button */}
          <button
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Logging in...</span>
              </>
            ) : (
              <>
                <Shield size={20} />
                <span>Access Dashboard</span>
              </>
            )}
          </button>
        </form>
        
        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-white/60 text-xs">
            Authorized personnel only. All access is monitored and logged.
          </p>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-10 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl"></div>
    </div>
  );
};

export default AdminLogin;