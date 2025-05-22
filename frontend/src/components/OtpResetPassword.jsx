import React, { useState } from 'react';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';

const OtpResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [show, setShow] = useState({ new: false, confirm: false });
  const React_Url= "https://abi-ecom.onrender.com"


  const email = localStorage.getItem('resetEmail');
  const otp = localStorage.getItem('otp');

  const handleReset = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await axios.post(`${React_Url}/api/auth/resetPasswordOtp`, {
        email,
        otp,
        newPassword: password,
      });

      alert('Password reset successful');
      localStorage.removeItem('resetEmail');
      localStorage.removeItem('otp');
      window.location.href = '/login';
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to reset password');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-950 px-4 text-white">
      <form
        onSubmit={handleReset}
        className="w-full max-w-md bg-gray-900 p-8 rounded-xl shadow space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">Reset Your Password</h2>

        {/* New Password */}
        <div className="relative">
          <input
            type={show.new ? 'text' : 'password'}
            className="w-full p-3 pr-10 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            onClick={() => setShow({ ...show, new: !show.new })}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-400"
          >
            {show.new ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <input
            type={show.confirm ? 'text' : 'password'}
            className="w-full p-3 pr-10 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <span
            onClick={() => setShow({ ...show, confirm: !show.confirm })}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-400"
          >
            {show.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded font-semibold"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default OtpResetPassword;
