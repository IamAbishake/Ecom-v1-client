import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../redux/slices/authSlice';
import { Eye, EyeOff, Shield } from 'lucide-react';

const Login = () => {
  const React_Url = "https://ecom-v1-server.onrender.com";

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) navigate('/');
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${React_Url}/api/auth/login`, form, { withCredentials: true });
      dispatch(loginSuccess(response.data));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const handleAdminLogin = () => {
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Login</h2>
          <p className="text-gray-600 text-sm mt-2">Welcome back! Please sign in to your account</p>
        </div>
        
        {error && <p className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          required
        />

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            required
          />
          <span
            className="absolute top-3.5 right-3 cursor-pointer text-gray-500 hover:text-gray-700 transition"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <Link to="/forgot-password" className="text-indigo-600 hover:text-indigo-800 underline transition">
            Forgot password?
          </Link>
          <Link to="/otp-forgot-password" className="text-indigo-600 hover:text-indigo-800 underline transition">
            Reset using OTP?
          </Link>
        </div>

        <button 
          type="submit" 
          className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 shadow-lg hover:shadow-xl"
        >
          Log In
        </button>

        {/* Admin Login Button */}
        <button
          type="button"
          onClick={handleAdminLogin}
          className="w-full py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900 transition duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          <Shield size={20} />
          Admin Login
        </button>

        <div className="text-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-indigo-600 hover:text-indigo-800 hover:underline font-medium transition">
            Signup now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;