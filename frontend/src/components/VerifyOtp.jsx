import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VerifyOtp = () => {
  const React_Url= "https://abi-ecom.onrender.com"

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const email = localStorage.getItem('resetEmail');

  useEffect(() => {
    if (timer <= 0) {
      setCanResend(true);
      return;
    }

    const countdown = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, '');
    if (!value) return;

    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    if (index < 5 && value) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const updated = [...otp];
      updated[index - 1] = '';
      setOtp(updated);
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const fullOtp = otp.join('');
    try {
      await axios.post(`${React_Url}/api/auth/verifyEmailOtp`, {
        email,
        otp: fullOtp,
      });
      localStorage.setItem('otp', fullOtp);
      navigate('/otp-reset-password');
    } catch (err) {
      alert(err.response?.data?.message || 'Invalid or expired OTP');
    }
  };

  const handleResend = async () => {
    try {
      await axios.post(`${React_Url}/api/auth/forgotPasswordUsingOtp`, { email });
      setTimer(60);
      setCanResend(false);
    } catch (err) {
      alert('Failed to resend OTP');
    }
  };

  const formatTime = (t) => {
    const m = String(Math.floor(t / 60)).padStart(2, '0');
    const s = String(t % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-950 px-4">
      <div className="w-full max-w-md bg-gray-900 text-white p-8 rounded-xl shadow-xl space-y-6">
        <h2 className="text-2xl font-bold text-center">Verify OTP</h2>
        <p className="text-center text-gray-400">Enter the 6-digit OTP sent to your email</p>

        <form onSubmit={handleVerify} className="space-y-6">
          <div className="flex justify-between gap-2">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                ref={(el) => (inputsRef.current[idx] = el)}
                className="w-12 h-12 text-center text-xl rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            ))}
          </div>

          <div className="text-center text-sm text-gray-400">
            Expires in: <span className="text-yellow-400">{formatTime(timer)}</span>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded bg-green-600 hover:bg-green-700 text-white font-semibold"
          >
            Verify
          </button>
        </form>

        <div className="text-center">
          <button
            onClick={handleResend}
            disabled={!canResend}
            className={`mt-2 text-sm font-medium ${
              canResend
                ? 'text-blue-400 hover:underline cursor-pointer'
                : 'text-gray-500 cursor-not-allowed'
            }`}
          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
