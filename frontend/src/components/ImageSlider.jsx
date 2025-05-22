import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import image1 from '../assets/images/women/slider5.webp';
import image2 from '../assets/images/women/slider6.webp';
import image3 from '../assets/images/women/slider4.webp';

const images = [image1, image2, image3];

const ImageSlider = () => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  return (
    <div className="w-full max-w-7xl mx-auto relative overflow-hidden rounded-2xl shadow-xl">
      <img
        src={images[current]}
        alt={`slide-${current}`}
        className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover object-top transition duration-700 ease-in-out"
      />

      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 text-sm sm:text-base md:text-lg rounded-lg shadow backdrop-blur-sm">
        Trending Collection
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 sm:left-5 transform -translate-y-1/2 bg-white/80 text-gray-700 hover:bg-white rounded-full p-2 sm:p-3 shadow-lg transition"
      >
        <FaChevronLeft size={16} className="sm:size-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 sm:right-5 transform -translate-y-1/2 bg-white/80 text-gray-700 hover:bg-white rounded-full p-2 sm:p-3 shadow-lg transition"
      >
        <FaChevronRight size={16} className="sm:size-5" />
      </button>

      <div className="absolute bottom-3 sm:bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
              index === current ? 'bg-indigo-600 scale-110' : 'bg-gray-300'
            } transition-all duration-300`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
