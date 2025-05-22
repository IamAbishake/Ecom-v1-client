import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/images/men/Ark logo.png";
import { Link } from "react-router-dom";
import { 
  Package, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  Filter, 
  Grid, 
  List, 
  LogOut, 
  User, 
  ArrowLeft,
  DollarSign,
  Tag,
  Loader,
  AlertTriangle,
  CheckCircle,
  Eye
} from 'lucide-react';

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("list"); // "list" or "grid"
  const [filterCategory, setFilterCategory] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/admin/products",
        {
          withCredentials: true,
        }
      );
      console.log("products", data);
      setProducts(data);
      setError("");
    } catch (error) {
      setError(
        "Failed to fetch products. Make sure you are logged in as admin."
      );
      if (error.response?.status === 401 || error.response?.status === 403) {
        setTimeout(() => {
          navigate("/admin/login");
        }, 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/products/edit/${id}`);
  };

  const handleView = (id) => {
    navigate(`/admin/products/view/${id}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/admin/products/${deleteId}`,
        {
          withCredentials: true,
        }
      );
      setProducts(products.filter((product) => product._id !== deleteId));
      setShowDeleteModal(false);
      setDeleteId(null);
    } catch (error) {
      setError("Failed to delete product");
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/admin/logout",
        {},
        {
          withCredentials: true,
        }
      );
      navigate("/admin/login");
    } catch (error) {
      setError("Logout failed");
    }
  };

  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.SKU.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter
  const categories = [...new Set(products.map(product => product.category))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex justify-center items-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
          <Loader className="animate-spin h-12 w-12 text-blue-600 mb-4" />
          <p className="text-gray-600 font-medium">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Enhanced Navigation */}
      <nav className="bg-white/80 backdrop-blur-lg border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to={"/admin/dashboard"} className="flex items-center space-x-3">
                <img className="h-10 w-auto" src={logo} alt="Ark logo" />
                <div>
                  <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
                  <p className="text-xs text-gray-500">Product Management</p>
                </div>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <User size={18} />
                <span className="text-sm font-medium">Admin User</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <LogOut size={16} />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-8 px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/admin/dashboard")}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back to Dashboard</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-3">
              <Package className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Product Management</h1>
                <p className="text-gray-600">Manage your product inventory</p>
              </div>
            </div>

            <button
              onClick={() => navigate("/admin/products/create")}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus size={20} />
              <span className="font-medium">Add New Product</span>
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl shadow-lg">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-3" />
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Controls Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search products by name or SKU..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                />
              </div>
            </div>

            {/* Filter and View Controls */}
            <div className="flex items-center space-x-4">
              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === "list" 
                      ? "bg-white text-blue-600 shadow-lg" 
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <List size={20} />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === "grid" 
                      ? "bg-white text-blue-600 shadow-lg" 
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <Grid size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Total Products</p>
                    <p className="text-2xl font-bold">{products.length}</p>
                  </div>
                  <Package className="h-8 w-8 text-blue-200" />
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">In Stock</p>
                    <p className="text-2xl font-bold">{products.filter(p => p.stock > 0).length}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-200" />
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm">Low Stock</p>
                    <p className="text-2xl font-bold">{products.filter(p => p.stock <= 10 && p.stock > 0).length}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-orange-200" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Display */}
        {viewMode === "list" ? (
          // List View
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
                  <tr>
                    <th className="py-4 px-6 text-left font-semibold">Product</th>
                    <th className="py-4 px-6 text-left font-semibold">SKU</th>
                    <th className="py-4 px-6 text-center font-semibold">Price</th>
                    <th className="py-4 px-6 text-center font-semibold">Stock</th>
                    <th className="py-4 px-6 text-center font-semibold">Status</th>
                    <th className="py-4 px-6 text-center font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <tr key={product._id} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              <img
                                src={product.images[0] || product.thumbnail?.[0]}
                                alt={product.title}
                                className="w-16 h-16 object-cover rounded-xl shadow-lg"
                              />
                              {product.discountPrice && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                  Sale
                                </span>
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-800 text-sm">{product.title}</h3>
                              <p className="text-gray-600 text-xs mt-1">{product.brand}</p>
                              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-1">
                                {product.category}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-mono text-sm bg-gray-100 px-3 py-1 rounded-lg">
                            {product.SKU}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <div className="space-y-1">
                            <div className="font-semibold text-green-600">
                              ${product.price.toFixed(2)}
                            </div>
                            {product.discountPrice && (
                              <div className="text-xs text-gray-400 line-through">
                                ${product.discountPrice.toFixed(2)}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                            product.stock > 10 
                              ? "bg-green-100 text-green-800" 
                              : product.stock > 0 
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            product.stock > 0 
                              ? "bg-green-100 text-green-800" 
                              : "bg-red-100 text-red-800"
                          }`}>
                            {product.stock > 0 ? "In Stock" : "Out of Stock"}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => handleView(product._id)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-110"
                              title="View Product"
                            >
                              <Eye size={18} />
                            </button>
                            <button
                              onClick={() => handleEdit(product._id)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 hover:scale-110"
                              title="Edit Product"
                            >
                              <Edit3 size={18} />
                            </button>
                            <button
                              onClick={() => confirmDelete(product._id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110"
                              title="Delete Product"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="py-12 text-center">
                        <div className="flex flex-col items-center space-y-4">
                          <Package className="h-16 w-16 text-gray-300" />
                          <p className="text-gray-500 text-lg font-medium">No products found</p>
                          <p className="text-gray-400 text-sm">Try adjusting your search or filter criteria</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          // Grid View
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product._id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className="relative">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-48 object-cover"
                    />
                    {product.discountPrice && (
                      <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        Sale
                      </span>
                    )}
                    <span className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
                      product.stock > 0 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-3">
                      <h3 className="font-semibold text-gray-800 text-lg mb-1 line-clamp-2">{product.title}</h3>
                      <p className="text-gray-600 text-sm">{product.brand}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-sm bg-gray-100 px-3 py-1 rounded-lg">
                        {product.SKU}
                      </span>
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="font-semibold text-green-600 text-lg">
                          ${product.price.toFixed(2)}
                        </div>
                        {product.discountPrice && (
                          <div className="text-sm text-gray-400 line-through">
                            ${product.discountPrice.toFixed(2)}
                          </div>
                        )}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        product.stock > 10 
                          ? "bg-green-100 text-green-800" 
                          : product.stock > 0 
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}>
                        Stock: {product.stock}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleView(product._id)}
                        className="flex-1 flex items-center justify-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 px-3 rounded-xl transition-all duration-200"
                      >
                        <Eye size={16} />
                        <span className="text-sm font-medium">View</span>
                      </button>
                      <button
                        onClick={() => handleEdit(product._id)}
                        className="flex-1 flex items-center justify-center space-x-2 bg-green-50 hover:bg-green-100 text-green-600 py-2 px-3 rounded-xl transition-all duration-200"
                      >
                        <Edit3 size={16} />
                        <span className="text-sm font-medium">Edit</span>
                      </button>
                      <button
                        onClick={() => confirmDelete(product._id)}
                        className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all duration-200"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-16">
                <Package className="h-24 w-24 text-gray-300 mb-4" />
                <p className="text-gray-500 text-xl font-medium mb-2">No products found</p>
                <p className="text-gray-400">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Enhanced Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto transform transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Confirm Deletion</h3>
                  <p className="text-gray-600 text-sm">This action cannot be undone</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6">
                Are you sure you want to delete this product? All associated data will be permanently removed.
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-xl transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductList;