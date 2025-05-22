import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OtpForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const React_Url= "https://abi-ecom.onrender.com"

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${React_Url}/api/auth/forgotPasswordUsingOtp`, { email });
      localStorage.setItem('resetEmail', email); // Pass to next step
      navigate('/verify-otp');
    } catch (err) {
      alert(err.response?.data?.message || 'Error sending OTP');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-gray-800 rounded-xl space-y-4">
        <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
        <input
          type="email"
          className="w-full p-2 rounded bg-gray-700 border border-gray-600"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded">Send OTP</button>
      </form>
    </div>
  );
};

export default OtpForgotPassword;
