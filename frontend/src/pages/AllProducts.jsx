import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { addToWishList, removeFromWishList } from "../redux/slices/wishSlice";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";


const AllProducts = () => {

  const React_Url= "https://abi-ecom.onrender.com"

  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const dispatch = useDispatch();
  const wishlist = useSelector((state)=> state.wish.wishItems)
  const isInWishlist = wishlist.some((item) => item._id === products._id);

  
  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(`${React_Url}/api/products`);
      setProducts(response.data);
    } catch (error) {
      console.error(" Product Fetch Error", error);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      category === "All" ||
      p.categoryName?.toLowerCase() === category.toLowerCase();
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesMin = minPrice === "" || p.price >= parseFloat(minPrice);
    const matchesMax = maxPrice === "" || p.price <= parseFloat(maxPrice);
    return matchesCategory && matchesSearch && matchesMin && matchesMax;
  });

  const handleToggleWishlist = (product) => {
    if (isInWishlist) {
      dispatch(removeFromWishList(product._id));
      toast("Removed from Wishlist", {
        icon: "💔",
        style: { background: "#333", color: "#fff" },
      });
    } else {
      dispatch(addToWishList(product));
      toast("Added to Wishlist!", {
        icon: "❤️",
        style: { background: "#333", color: "#fff" },
      });
    }
  };


  

  return (
    <>
          <Toaster position="bottom-center" reverseOrder={false} />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          >
            <option value="All">All Categories</option>
            <option value="T-Shirts">T-Shirts</option>
            <option value="Jeans">Jeans</option>
            <option value="Shoes">Shoes</option>
            <option value="Dresses">Hoodies</option>
            <option value="Tops">Tops</option>
            <option value="Heels">ActiveWear</option>
          </select>
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          />
        </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link
                to={`/product/${product._id}`}
                key={product._id}
                className="block"
              >
                <div className="bg-[#fdfdfd] border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-64 object-cover rounded-t-xl"
                  />
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div className="space-y-1 mb-4">
                      <h3 className="text-[16px] font-medium text-gray-900 truncate">
                        {product.title}
                      </h3>
                      <p className="text-[13px] text-gray-500 line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                    <div className="mb-4">
                      <span className="text-[15px] text-gray-800 font-semibold">
                        ${product.discountPrice.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-400 line-through ml-2">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <button
                        onClick={(e) => {
                          dispatch(addToCart(product))
                           toast("Added to Cart!", {
                            icon: "✔️",
                            style: {
                              borderRadius: "10px",
                              background: "#333",
                              color: "#fff",
                            },
                          });
                         e.preventDefault(); 
                         e.stopPropagation();
                        
                        }}
                        
                        className="bg-gray-900 text-white cursor-pointer text-sm px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={(e) => {
                          handleToggleWishlist(product)
                          e.preventDefault(); 
                          e.stopPropagation();
                        }}
                        className="text-gray-500 cursor-pointer hover:text-red-400 transition"
                        title={
                  isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"
                }
                      >
                        <Heart
                         fill={isInWishlist ? "red" : "none"}
                  stroke={isInWishlist ? "red" : "currentColor"} className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No products found.
            </p>
          )}
        </div>
      </div>
    </>
  );
};
export default AllProducts;
