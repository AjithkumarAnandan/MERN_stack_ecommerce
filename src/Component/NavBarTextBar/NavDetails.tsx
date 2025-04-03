'use client';
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const UserDropdown = dynamic(() => import("./UserSignoutDropdown"), {ssr: false});
const NavDetails:React.FC =()=> {
  const { data: session } = useSession();
  const [token, setToken] = useState<string | null>(null);
  const pathname = usePathname();
  useEffect(() => {
      setToken(Cookies.get("token"));   
  }, [pathname]);

  return (
    <nav className="bg-white flex justify-between items-center px-6 py-3 mt-1 fixed top-6 w-full borderborder border-black shadow-lg" >
      {/* Left Side - Logo */}
      <div className="flex items-center pl-32">
        {/* <img
          src="/efiling_logo.svg" // Replace with your logo path
          alt="Logo"
          className="h-10"
        /> */}
        <h3 className="text-red-400">AK</h3>
        <h3 className="text-blue-400">Trends</h3>
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
        <div className="w-24">
        {(session || token ) && <UserDropdown session={session} token={token}/>}
        </div>
      </div>
    </nav>
  );
}

export default NavDetails;
