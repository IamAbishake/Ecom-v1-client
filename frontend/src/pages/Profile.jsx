import React from 'react';
import avatar from "../assets/images/men/profile.jpg";
import { useSelector } from 'react-redux';
import { LogIn } from 'lucide-react'; 

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      {user ? (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
          <div className="bg-white shadow-2xl rounded-2xl max-w-xl w-full p-8">
            <div className="flex flex-col items-center text-center">
              <img
                src={avatar}
                alt="User"
                className="w-28 h-28 rounded-full shadow-md"
              />
              <h2 className="text-2xl font-semibold text-gray-800 mt-4">
                {user.name}
              </h2>
            </div>

            <div className="mt-8 border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Contact Details
              </h3>
              <div className="text-gray-600 text-sm leading-6">
                <p>
                  <span className="font-medium text-gray-800">Name:</span>{' '}
                  {user.name}
                </p>
                <p>
                  <span className="font-medium text-gray-800">Email:</span>{' '}
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 px-4">
          <div className="bg-white shadow-lg rounded-xl p-10 max-w-sm w-full text-center">
          <h2 className="text-2xl sm:text-3xl mb-5 font-bold text-gray-800">
            Profile
          </h2>
            <LogIn className="mx-auto text-indigo-500 mb-4" size={48} />
            <h1 className="text-xl font-bold text-gray-800 mb-2">Access Denied</h1>
            <p className="text-gray-600 mb-6">
              You must be logged in to view your profile.
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

export default Profile;
