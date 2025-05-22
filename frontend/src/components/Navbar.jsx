import React, { useState } from "react";
import { ShoppingCart, User, Menu, X, LogOut, Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import logo from "../assets/images/men/Ark logo.png";
import { useLocation } from "react-router-dom";
import toast, {Toaster} from 'react-hot-toast';

const categories = {
  Men: ["Shirts", "Jeans", "Shoes"],
  Women: ["Dresses", "Tops", "Heels"],
  Kids: ["Toys", "Clothing", "Accessories"],
};

const Navbar = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  const cartCount = useSelector((state) => {
    return  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
});



  const handleLogOut = () => {
    dispatch(logout());
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      {/* Top Navbar */}
      <nav className="bg-white shadow-md px-4 py-2.5 flex items-center justify-between w-full z-50 relative">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold text-[#9da1a4] flex items-center"
        >
          <img className="w-[140px] h-[40px]" src={logo} alt="logo" />
        </Link>

        {/* Icons */}
        <div className="flex  items-center gap-4 text-gray-700">
          <Link to="/cart" title="Cart" className="relative hover:text-cyan-600">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs px-1.5 py-0.5 rounded-full">
              {cartCount}
            </span>
          </Link>
          <Link to="/wishlist" title="Wishlist" className="hover:text-cyan-600">
            <Heart className="w-5 h-5" />
          </Link>
          <Link to="/profile" title="Profile" className="hover:text-cyan-600">
            <User className="w-5 h-5" />
          </Link>

          {user ? (
            <button title="Logout" onClick={handleLogOut} className="hover:text-cyan-600">
              <LogOut className="w-5 h-5" />
            </button>
          ) : (
            <Link to="/login" title="Login" className="hover:text-cyan-600">
              Login
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button onClick={toggleMobileMenu} className="md:hidden">
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Second Layer - Categories */}
      <div className="bg-white shadow-sm hidden md:flex justify-center gap-8 py-3 text-gray-800 font-medium text-sm relative z-40">
        {Object.keys(categories).map((cat) => (
          <div
            key={cat}
            className="relative"
            onMouseEnter={() => setActiveCategory(cat)}
            onMouseLeave={() => setActiveCategory(null)}
          >
            <Link
              to={`/${cat.toLowerCase()}`}
              className={`hover:text-cyan-700 transition-colors px-3 py-1 rounded-md ${
                location.pathname.startsWith(`/${cat.toLowerCase()}`)
                  ? "bg-[#0C627E] text-white hover:text-white"
                  : ""
              }`}
            >
              {cat}
            </Link>

            {activeCategory === cat && (
              <div className="absolute top-full flex flex-col left-1/2 transform -translate-x-1/2 mt-2 bg-white shadow-lg rounded-md py-5 px-4 gap-4 z-50">
                {categories[cat].map((sub) => (
                  <Link
                    key={sub}
                    to={`/${cat.toLowerCase()}`}
                    className="text-sm text-gray-700 hover:text-cyan-600"
                  >
                    {sub}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="bg-white px-6 py-4 flex flex-col gap-4 md:hidden shadow-md z-40">
          {Object.entries(categories).map(([category, subItems]) => (
            <div key={category}>
              <Link
                to={`/${category.toLowerCase()}`}
                className="font-semibold text-cyan-600"
              >
                {category}
              </Link>
              <div className="ml-4 mt-1 space-y-1 text-gray-700 text-sm">
                {subItems.map((item) => (
                  <Link
                    key={item}
                    to={`/${category.toLowerCase()}/${item.toLowerCase()}`}
                    className="block hover:text-cyan-600"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Navbar;
