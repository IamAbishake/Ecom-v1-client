import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { LogIn } from 'lucide-react'; 
import {  removeFromWishList, clearWishList } from "../redux/slices/wishSlice";
import Button from "../components/Button";

const WishList = () => {
  const dispatch = useDispatch();
  
  const items = useSelector((state) => state.wish.wishItems);
  const { user } = useSelector((state) => state.auth);

  return (
    <>{user?(
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6 mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Your Wishlist
          </h2>
          <Button
            onClick={() => dispatch(clearWishList())}
            className="hover:bg-red-500 cursor-pointer text-red-600 px-4 py-2 rounded-md text-sm font-medium"
            >
            Clear Wishlist
          </Button>
        </div>

        {items.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">
            Your Wishlist is empty.
          </p>
        ) : (
          <>
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow transition"
                  >
                  <div className="flex items-center gap-4 flex-1">
                    <img
                      className="h-20 w-20 object-cover rounded border"
                      src={item.images}
                      alt={item.title}
                    />
                    <div>
                      <h4 className="text-lg font-medium text-gray-800">
                        {item.title}
                      </h4>
                      
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 text-right">
                    <Button
                      onClick={() => dispatch(removeFromWishList(item._id))}
                      className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
  ):(
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 px-4">
    <div className="bg-white shadow-lg rounded-xl p-10 max-w-sm w-full text-center">
    <h2 className="text-2xl sm:text-3xl mb-5 font-bold text-gray-800">
            Cart
          </h2>
      <LogIn className="mx-auto text-indigo-500 mb-4" size={48} />

      <h1 className="text-xl font-bold text-gray-800 mb-2">Access Denied</h1>
      <p className="text-gray-600 mb-6">
        You must be logged in to view your Wishlist.
      </p>
      <a
        href="/login"
        className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-full font-medium hover:bg-indigo-700 transition"
      >
        Create an Account
      </a>
    </div>
  </div>
  )}
    </>
  );
};

export default WishList;
