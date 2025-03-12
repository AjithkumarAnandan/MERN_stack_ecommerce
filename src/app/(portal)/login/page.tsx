"use client";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import GoogleButton from "react-google-button";
import toast from "react-hot-toast";

const Login: React.FC = () => {
  const { data: session, status } = useSession();
  const [pending, setPending] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const router = useRouter();
   const [token, setToken] = useState<string | null>(null);
   
   useEffect(() => {
       if (session?.accessToken) {
            signOut({ redirect: false }); // Sign out user if access token exists
            return;
        }
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);               
            }
        }
          
    }, [session]);

    
  useEffect(() => {
    if (token) {
      router.replace("/dashboard");
    }
  }, []);

  const fetchData = async () => {
    setPending(true);
    try {
      const response = await axios.post(
        "/api/auth/signin",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response?.data?.status === 200) {
        localStorage.setItem("token", response.data.token);
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setPending(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await fetchData();
  };

  return (
    <>
      <div className="flex justify-center items-center text-center">
        <form onSubmit={handleSubmit} className="w-80">
          <h2 className="text-2xl my-4">Login</h2>
          <div className="flex flex-col my-2">
            <label>Username</label>
            <input
              name="username"
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, username: e.target.value }))
              }
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="username"
            />
          </div>
          <div className="flex flex-col my-2">
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="w-full border border-blue-500 text-blue-500 px-4 py-2 rounded-lg transition duration-300 hover:bg-blue-500 hover:text-white"
          >
            {pending ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
      <div className="flex justify-center items-center text-center mt-10 flex-col">
        <p className="p-2">Or sign in with Google</p>
        <GoogleButton
          onClick={async () => {
            try {
              await signIn("google", { redirect: false, callbackUrl:'/register' })
            } catch (error) {
              toast.error("Google Sign-In failed");
            }
          }}
        />
      </div>
    </>
  );
};

export default Login;