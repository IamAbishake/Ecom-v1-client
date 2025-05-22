import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from "../assets/images/men/Ark logo.png";
import { Link } from "react-router-dom";
import { 
  Package, 
  DollarSign, 
  Tag, 
  Image as ImageIcon, 
  Plus, 
  Minus, 
  Save, 
  X, 
  ArrowLeft,
  LogOut,
  User,
  Loader
} from 'lucide-react';

const AdminProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    discountPrice: '',
    stock: '',
    SKU: '',
    brand: '',
    category: '',
    gender: 'Unisex',
    tags: '',
    thumbnail: '',
    images: []
  });
  
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  useEffect(() => {
    if (isEditMode) {
      const fetchProduct = async () => {
        setLoading(true);
        try {
          const { data } = await axios.get(`http://localhost:5000/api/admin/products/${id}`, {
            withCredentials: true
          });
          console.log("data", data)
          
          const tagsString = data.tags ? data.tags.join(', ') : '';
          
          setFormData({
            ...data,
            tags: tagsString,
            category: data.category || '',
          });
        } catch (error) {
          setError('Failed to fetch product details');
        } finally {
          setLoading(false);
        }
      };
      
      fetchProduct();
    }
  }, [id, isEditMode]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    
    try {
      const formattedData = {
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
        price: parseFloat(formData.price),
        discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : undefined,
        stock: parseInt(formData.stock, 10),
        images: formData.images.filter(img => img !== '') 
      };
      
      let response;
      
      if (isEditMode) {
        response = await axios.put(`http://localhost:5000/api/admin/products/${id}`, formattedData, {
          withCredentials: true
        });
        setSuccess('Product updated successfully!');
      } else {
        response = await axios.post('http://localhost:5000/api/admin/products', formattedData, {
          withCredentials: true
        });
        setSuccess('Product created successfully!');
        
        if (!isEditMode) {
          setFormData({
            title: '',
            description: '',
            price: '',
            discountPrice: '',
            stock: '',
            SKU: '',
            brand: '',
            category: '',
            gender: 'Unisex',
            tags: '',
            thumbnail: '',
            images: []
          });
        }
      }
      
      setTimeout(() => {
        navigate('/admin/products');
      }, 2000);
      
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };
  
  const handleImageChange = (index, value) => {
    const updatedImages = [...formData.images];
    updatedImages[index] = value;
    setFormData({
      ...formData,
      images: updatedImages
    });
  };
  
  const addImageField = () => {
    setFormData({
      ...formData,
      images: [...formData.images, '']
    });
  };
  
  const removeImageField = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      images: updatedImages
    });
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
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex justify-center items-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
          <Loader className="animate-spin h-12 w-12 text-blue-600 mb-4" />
          <p className="text-gray-600">Loading product details...</p>
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

      <div className="max-w-6xl mx-auto py-8 px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin/products')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back to Products</span>
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <Package className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-800">
                {isEditMode ? 'Edit Product' : 'Add New Product'}
              </h1>
            </div>
          </div>
        </div>
        
        {/* Alert Messages */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl shadow-lg">
            <div className="flex items-center">
              <X className="h-5 w-5 text-red-500 mr-3" />
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}
        
        {success && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl shadow-lg">
            <div className="flex items-center">
              <Save className="h-5 w-5 text-green-500 mr-3" />
              <p className="text-green-700 font-medium">{success}</p>
            </div>
          </div>
        )}
        
        {/* Main Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white">Product Information</h2>
            <p className="text-blue-100 mt-1">Fill in the details below to manage your product</p>
          </div>

          <div className="p-8 space-y-8">
            {/* Basic Information Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Basic Information</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <Package size={16} />
                    <span>Product Title *</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                    placeholder="Enter product title"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <Tag size={16} />
                    <span>SKU *</span>
                  </label>
                  <input
                    type="text"
                    name="SKU"
                    value={formData.SKU}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                    placeholder="Enter SKU"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white resize-none"
                  placeholder="Enter detailed product description"
                  required
                ></textarea>
              </div>
            </div>

            {/* Pricing & Inventory Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Pricing & Inventory</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <DollarSign size={16} />
                    <span>Price *</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                    placeholder="0.00"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <DollarSign size={16} />
                    <span>Discount Price</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    name="discountPrice"
                    value={formData.discountPrice}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                    placeholder="0.00"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Stock Quantity *</label>
                  <input
                    type="number"
                    min="0"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                    placeholder="0"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Category & Details Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Category & Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Category *</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                    placeholder="Enter category"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Gender *</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                    required
                  >
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                    <option value="Unisex">Unisex</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Brand</label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                    placeholder="Enter brand name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                  <Tag size={16} />
                  <span>Tags (comma separated)</span>
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                  placeholder="e.g. summer, casual, trendy"
                />
              </div>
            </div>

            {/* Images Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Product Images</h3>
              
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                  <ImageIcon size={16} />
                  <span>Thumbnail URL *</span>
                </label>
                <input
                  type="text"
                  name="thumbnail"
                  value={formData.thumbnail}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                  placeholder="Enter thumbnail image URL"
                  required
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-gray-700">Additional Images</label>
                  <button
                    type="button"
                    onClick={addImageField}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <Plus size={16} />
                    <span>Add Image</span>
                  </button>
                </div>
                
                {formData.images.map((image, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={image}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                      placeholder="Enter image URL"
                    />
                    <button
                      type="button"
                      onClick={() => removeImageField(index)}
                      className="flex items-center justify-center w-12 h-12 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <Minus size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-8 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/admin/products')}
                className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <X size={18} />
                <span className="font-medium">Cancel</span>
              </button>
              
              <button
                type="submit"
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin h-5 w-5" />
                    <span className="font-medium">Saving...</span>
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    <span className="font-medium">
                      {isEditMode ? 'Update Product' : 'Create Product'}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProductForm;