export default function Button({ children, onClick, type = "button", className = "" }) {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`px-4 py-2 rounded-2xl bg-black text-white hover:bg-gray-700 transition-colors duration-200 shadow-md ${className}`}
      >
        {children}
      </button>
    );
  }
  