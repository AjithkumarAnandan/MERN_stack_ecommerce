'use client';
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { Spin } from "antd";
import { useToken } from "@/lib/useToken";

 function Dashboard() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true); 
  
    useEffect(() => {
    if (status === "loading") return; // Wait for session to load
    const accessToken = (session as any)?.accessToken;
    if (accessToken) {
        localStorage.setItem("token", accessToken);
        setLoading(false);
    } else {
        const token = localStorage.getItem("token");
        if (!token) {
            redirect("/login"); // Redirect only if no session and no token
        } 
        setLoading(false);
    }
    }, [session, status]);


  if (loading) {
    return <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 z-50"><Spin size="large" /></div>  
  }

  return <div>Welcome {(session as any)?.user?.username}</div>;
}


export default Dashboard;