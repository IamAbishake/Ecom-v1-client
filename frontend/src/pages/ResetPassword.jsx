import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react"; 

const ResetPassword = () => {
  const React_Url= "https://abi-ecom.onrender.com"

  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        `${React_Url}/api/auth/reset-password/${token}`,
        { password }
      );
      setMessage(res.data.message);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired reset link.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-white mb-6">Reset Password</h2>

        {message && <p className="text-green-500 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4 relative">
          <label className="block text-gray-300 mb-2" htmlFor="password">
            New Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className="w-full px-4 py-2 pr-10 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div
            className="absolute right-3 top-[38px] cursor-pointer text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
        </div>

        <div className="mb-6 relative">
          <label className="block text-gray-300 mb-2" htmlFor="confirm">
            Confirm Password
          </label>
          <input
            type={showConfirm ? "text" : "password"}
            id="confirm"
            className="w-full px-4 py-2 pr-10 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          <div
            className="absolute right-3 top-[38px] cursor-pointer text-gray-400"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
