import React from "react";
const NavDetails:React.FC =()=> {
  return (
    <nav className="bg-white flex justify-between items-center px-6 py-3 fixed top-6">
      {/* Left Side - Logo */}
      <div className="flex items-center pl-32">
        <img
          src="/efiling_logo.svg" // Replace with your logo path
          alt="Logo"
          className="h-10"
        />
       </div>
      <div className="px-64"></div>
      {/* Right Side - Menu */}
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-black flex items-center">
          📞 Call Us
        </button>
        <button className="text-gray-600 hover:text-black flex items-center">
          🌐 English ▾
        </button>
        <button className="text-gray-600 hover:text-black">A-</button>
        <button className="text-gray-600 hover:text-black">A</button>
        <button className="text-gray-600 hover:text-black">A+</button>
        <button className="text-gray-600 hover:text-black">🌓</button>

        {/* Buttons */}
        {/* <button className="px-4 py-1 border rounded">Login</button> */}
        <button className="px-4 py-1 bg-blue-600 text-white rounded"><a href="/register">Register</a></button>
      </div>
    </nav>
  );
}

export default NavDetails;
