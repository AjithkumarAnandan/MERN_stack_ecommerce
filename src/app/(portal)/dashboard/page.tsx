'use client';
import { signOut, useSession } from "next-auth/react";
import React, { useEffect } from "react";

const Dashboard:React.FC=()=>{
            const { data: session, status}=useSession();
        useEffect(()=>{
            if (session) {
             signOut({ redirect: false }); 
            }
        },[]);

    return <div>Dashboard</div>
}
export default Dashboard;