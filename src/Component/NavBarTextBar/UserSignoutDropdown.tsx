import { useState, useEffect, useRef } from "react";
import { signOut } from "next-auth/react";

const UserDropdown = ({ session }: { session: any } ) => {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!token) return null;
  return (
    <div ref={dropdownRef} className=" z-[100]">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {token ? (
          <img
            src={session?.user?.image??'/profile_logo.jpg'}
            alt="User"
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm">
            ?
          </div>
        )}
        <h2 className="text-sm font-medium">{session?.user?.email ?? "User"}</h2>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 shadow-lg  z-[9999]">
          <button  onClick={() => {
                localStorage.removeItem("token"); 
                signOut({ callbackUrl: "/" }); 
                }}
            className="w-full text-left px-4 py-2 text-sm text-blue-700  bg-white hover:bg-blue-500 hover:text-white border rounded-lg"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
