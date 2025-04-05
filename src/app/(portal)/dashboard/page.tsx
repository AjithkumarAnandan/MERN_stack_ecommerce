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
import UploadPDF from "@/Component/UploadComponent/uploader";
import DownloadPDF from "@/Component/UploadComponent/downloader";
import { fetchDocumentList } from "@/Redux/ActionThunk/document.action";
import { imageListSelector } from "@/Redux/Selector/document.selector";


 function Dashboard({actions, userData, imageList}) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true); 
  const [data, setData] = useState<any>([]); 
  const [imageListData, setImageListData] = useState<any>([]); 


  useEffect(()=>{
    actions.fetchDashboard();
    actions.fetchDocumentList();
  },[actions])

  useEffect(()=>{
    if (userData) {
      setData(userData?.data);      
    }
  }, [userData])

    useEffect(()=>{
    if (imageList) {
      setImageListData(imageList?.data);      
    }
  }, [imageList])
  
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

  return <>
  
  <h2 className="flex items-center justify-center font-bold">Welcome</h2> 
  {Array.isArray(data) && data.length > 0 && data?.map((item,i)=>{
    return <div key={item.id} className="flex items-center justify-center">
        <div>
              <label htmlFor="name">Name : </label>
              <h4>{item.name}</h4>
        </div>
        <div>
              <label htmlFor="description">Description : </label>
                <p>{item.description}</p>
        </div>
    </div>
  })}
   
  <UploadPDF/>

  <div>
  </div>
  <p>List </p>

<ol style={{ listStyleType: 'decimal', paddingLeft: '20px' }}>
  {Array.isArray(imageListData) && imageListData.map((item, i) => (
    <li key={i} style={{padding:"5px"}}> <DownloadPDF fileName={`${item}`}/></li>
  ))}
</ol>
  </>;
}

const mapStateToProps=createStructuredSelector({
  userData: getDashboard,
  imageList:imageListSelector
});
const mapDispatchToProps=(dispatch:AppDispatch)=>({
  actions:bindActionCreators({fetchDashboard, fetchDocumentList}, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);