import { useState, useEffect, useRef, useCallback } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Cookies from "js-cookie";

const UserDropdown = ({ session, token }: { session: any; token: string | null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {    
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  return (
    <div className="relative z-[100]" ref={dropdownRef}>
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Image
          src={"/profile_logo.jpg"}
          alt="User"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full"
        />
        <h2 className="text-sm font-medium">{session?.user?.email ?? "User"}</h2>
      </div>      
     {isOpen && (        
      <div className="absolute right-0 mt-2 w-48 shadow-lg bg-white rounded-lg z-[9999]">
          <button
            onClick={() => {
              Cookies.remove("token");
              signOut({ callbackUrl: "/" });
            }}
            className="w-full text-left px-4 py-2 text-sm text-blue-700 hover:bg-blue-500 hover:text-white border rounded-lg"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
