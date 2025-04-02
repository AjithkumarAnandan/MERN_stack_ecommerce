"use client";

import { Spin } from 'antd';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Register: React.FC = () => {
  const {data:session, status}=useSession();
  const [pending, setPending] = useState(false);
  const [isButton, setIsButton] = useState(false);
  const [formData, setFormData] = useState<{username:string, password:string, cpassword: string, email:string, dob: string}>({
    username: '',
    password: '',
    cpassword:'',
    email:"",
    dob: ""
  });
  const router = useRouter();
  useEffect(()=>{
    if (status === "authenticated" && session?.user) {
      setFormData({...formData, username:session?.user?.name??'', email:session?.user?.email??''})
    }
  },[session, status])

  const fetchData = async (value: { username:string, password:string, cpassword: string, email:string, dob: string })=>{
    setPending(false);
     const response = await axios.post("/api/auth/register", value,{
      headers: {"Content-Type": "application/json"}
    });
    if (response.data.status===201) {
      router.replace("/dashboard");
    }
    }
  
  useEffect(()=>{
      (formData.password===formData.cpassword) ? setIsButton(false) : setIsButton(true)
  },[formData]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    await fetchData(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  if (status === "loading") {
            return <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 z-50">
                        <Spin size="large" />
                    </div>      
        }

  return (<>
    <button className="flex w-16 p-2 m-4 rounded-lg text-blue-300 border border-blue-400 justify-start items-start transition duration-300 hover:text-white hover:bg-blue-500"><a href="/login">Login</a></button>
    <div className='flex justify-center items-center text-center'>
      <form method="POST" action="/login" onSubmit={handleSubmit} >
      <h2 className='text-[24px] my-4'>Register Form</h2>
       <div className='flex my-2'>
        <h3 className='mr-8'>Username</h3> 
        <input name='username' type="text" value={formData.username} onChange={handleChange} className="px-3 py-2 ml-16 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" autoComplete="username"/>
        </div> 
        <div className='flex my-2 ml-1'>
        <h3 className='mr-8'>Password</h3> 
        <input name='password' type="password" value={formData.password} onChange={handleChange} className="px-3 py-2 ml-16 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" autoComplete="new-password"/>
        </div>
          <div className='flex my-2 ml-1'>
        <h3 className='mr-8'>Confirm Password</h3> 
        <input name='cpassword' type="password" value={formData.cpassword} onChange={handleChange} className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" autoComplete="new-password"/>
        </div>
        <div className='flex my-2 ml-1'>
        <h3 className='mr-8'>Email</h3> 
        <input name='email' type="email" value={formData.email} onChange={handleChange} className="ml-24 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div className='flex my-2 ml-1'>
        <h3 className='mr-8'>Date Of Birth</h3> 
        <input name='dob' type="date" value={formData.dob} onChange={handleChange} className="ml-12 w-54 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div className='flex justify-center align-middle'>
       <button disabled={isButton} type="submit"   className={`border border-blue-500 text-blue-500 mt-4 px-4 py-2 rounded-lg transition duration-300 ${isButton ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-500 hover:text-white"}`}>{pending ? "Loading..." : "Register"}</button>
        </div>
      </form>
    </div></>
  );
};


export default Register;