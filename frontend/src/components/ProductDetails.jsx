import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import toast, { Toaster } from "react-hot-toast";
import { Heart } from "lucide-react";
import { addToWishList, removeFromWishList } from "../redux/slices/wishSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wish.wishItems);
  const React_Url= "https://abi-ecom.onrender.com"


  const isInWishlist = wishlist.some((item) => item._id === product._id);

  useEffect(() => {
    axios
      .get(`${React_Url}/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        if (res.data.variants?.length > 0) {
          setSelectedVariant(res.data.variants[0]);
        }
      })
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

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

  if (!product) return <div className="text-center py-20">Loading...</div>;

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-[500px] object-cover rounded-lg mb-4"
            />
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  className="w-20 h-20 object-cover rounded-lg border"
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-bold text-gray-900">
              {product.title}
            </h1>
            <p className="text-gray-600">{product.description}</p>

            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-black">
                ${product.discountPrice}
              </span>
              <del className="text-gray-400">${product.price}</del>
            </div>

            <div className="text-sm text-gray-500">
              SKU: <span className="font-medium">{product.SKU}</span>
            </div>
            <div className="text-sm text-gray-500">
              Brand: <span className="font-medium">{product.brand}</span>
            </div>
            <div className="text-sm text-gray-500">
              Category:{" "}
              <span className="font-medium capitalize">
                {product.categoryName}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              Gender: <span className="font-medium">{product.gender}</span>
            </div>

            {/* Variant Selector */}
            {product.variants?.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-700">Select Variant:</h3>
                <div className="flex gap-2 flex-wrap">
                  {product.variants.map((variant, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-4 py-2 border cursor-pointer rounded-md text-sm ${
                        selectedVariant?.size === variant.size &&
                        selectedVariant?.color === variant.color
                          ? "bg-black text-white"
                          : "bg-white text-gray-700"
                      }`}
                    >
                      {variant.size} / {variant.color}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  Stock: {selectedVariant?.stock ?? product.stock}
                </p>
              </div>
            )}

            {/* Tags */}
            <div className="text-sm text-gray-500">
              Tags:
              {product.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 ml-2 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Add to Cart Button */}
            <div className="flex flex-column align-middle items-center gap-4">
              <button
                onClick={() => {
                  dispatch(addToCart(product));
                  toast("Added to Cart!", {
                    icon: "✔️",
                    style: {
                      borderRadius: "10px",
                      background: "#333",
                      color: "#fff",
                    },
                  });
                }}
                className="bg-black text-white cursor-pointer px-4 py-2 rounded-md mt-4 hover:bg-gray-800 transition"
              >
                Add to Cart
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleToggleWishlist(product);
                }}
                className="text-gray-500 cursor-pointer hover:text-red-500 transition mt-4"
                title={
                  isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"
                }
              >
                <Heart
                  className="w-6 h-6"
                  fill={isInWishlist ? "red" : "none"}
                  stroke={isInWishlist ? "red" : "currentColor"}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
