import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

import Home from './pages/Home';
import Men from './pages/Men';
import Women from './pages/Women';
import Kids from './pages/Kids';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import WishList from './components/WishList';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import OtpForgotPassword from './components/OtpForgotPassword';
import OtpResetPassword from './components/OtpResetPassword';
import VerifyOtp from './components/VerifyOtp';
import ProductDetails from './components/ProductDetails';
import { AdminProvider } from './context/AdminContext';
import AdminLogin from './pages/AdminLogin';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import AdminProductList from './pages/AdminProductList';
import AdminProductForm from './pages/AdminProductForm';

function App() {
  return (
    <BrowserRouter>
    <AdminProvider>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/otp-forgot-password" element={<OtpForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/otp-reset-password" element={<OtpResetPassword />} />


        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="men" element={<Men />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="women" element={<Women />} />
          <Route path="kids" element={<Kids />} />
          <Route path="cart" element={<Cart />} />
          <Route path="profile" element={<Profile />} />
          <Route path="wishlist" element={<WishList />} />

        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* Protected Admin Routes */}
          <Route element={<AdminProtectedRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProductList />} />
            <Route path="/admin/products/create" element={<AdminProductForm />} />
            <Route path="/admin/products/edit/:id" element={<AdminProductForm />} />
            {/* Add more admin routes as needed */}
          </Route>
      </Routes>
    </AdminProvider>
    </BrowserRouter>
  );
}

export default App;
