"use client";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import GoogleButton from "react-google-button";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const Login: React.FC = () => {
  const { data: session, status } = useSession();
  const [pending, setPending] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const router = useRouter();
  
useEffect(() => {
  if (session && (session as any).accessToken) {
    // Remove old token to avoid conflicts
    Cookies.remove("token");

    // Store the new token
    Cookies.set("token", (session as any).accessToken);
    console.log("User logged in with Google. Access token:", (session as any).accessToken);
  } else {
    // No session: clear token and sign out
    Cookies.remove("token");
    signOut({ redirect: false });
  }
}, [session]);

useEffect(() => {
  if (typeof window === "undefined") return; // Ensure it runs only in the browser

  const storedToken = Cookies.get("token");
  if (storedToken) {
    router.replace("/dashboard");
  }
}, []);


  const fetchData = async () => {
    setPending(true);
    try {
      const payload={...formData,  password: btoa(formData.password)};
      const response = await axios.post(
        "/api/auth/signin",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response?.data?.status === 200) {
      Cookies.set("token", response.data.accessToken, { expires: 1/24, secure: true, sameSite: "Strict" });
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
              await signIn("google", { callbackUrl: "/dashboard" });
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