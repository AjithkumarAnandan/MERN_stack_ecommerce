'use client';
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { Spin } from "antd";
import Cookies from "js-cookie";
import { createStructuredSelector } from "reselect";
import { getDashboard } from "@/Redux/Selector/dashboard.selector";
import { bindActionCreators } from "@reduxjs/toolkit";
import { fetchDashboard } from "@/Redux/ActionThunk/dashboard.action";
import { connect } from "react-redux";
import { AppDispatch } from "@/Redux/Store/store";

 function Dashboard({actions, userData}) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true); 


  useEffect(()=>{
    actions.fetchDashboard();
  },[actions])
  console.log(userData);
  
    useEffect(() => {
    if (status === "loading") return; // Wait for session to load
    const accessToken = (session as any)?.accessToken;
    if (accessToken) {
        Cookies.set("token", accessToken)
        setLoading(false);
    } else {
        const token =  Cookies.get("token");
        if (!token) {
            redirect("/login"); // Redirect only if no session and no token
        } 
        setLoading(false);
    }
    }, [session, status]);

  if (loading) {
    return <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 z-50"><Spin size="large" /></div>  
  }

  return <div>Welcome</div>;
}

const mapStateToProps=createStructuredSelector({
  userData: getDashboard
});
const mapDispatchToProps=(dispatch:AppDispatch)=>({
  actions:bindActionCreators({fetchDashboard}, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);