"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Register: React.FC = () => {
  const [pending, setPending] = useState(false);
  const [isButton, setIsButton] = useState(false);
  const [formData, setFormData] = useState<{username:string, password:string, cpassword: string}>({
    username: '',
    password: '',
    cpassword:''
  });

  const fetchData = async (value: { username: string; password: string, cpassword: string })=>{
    setPending(false);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });
    
    const data = await response.json();
    console.log(data);
    
    console.log("user loggin");
    
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

  return (<>
      <h2 className='flex w-16 p-2 m-[16px] rounded-[8px] text-blue-300 border border-blue-400 justify-start items-start transition duration-300 hover:text-white   hover:bg-blue-500'><a href="/login">Login</a></h2>
    <div className='flex justify-center items-center text-center'>
      <form method="POST" action="/login" onSubmit={handleSubmit} >
      <h2 className='text-[24px] my-4'>Register Form</h2>
       <div className='flex my-2'>
        <h3 className='mr-8'>Username</h3> 
        <input name='username' type="text" value={formData.username} onChange={handleChange} className="px-3 py-2 ml-16 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div> 
        <div className='flex my-2 ml-1'>
        <h3 className='mr-8'>Password</h3> 
        <input name='password' type="password" value={formData.password} onChange={handleChange} className="px-3 py-2 ml-16 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
          <div className='flex my-2 ml-1'>
        <h3 className='mr-8'>Confirm Password</h3> 
        <input name='cpassword' type="password" value={formData.cpassword} onChange={handleChange} className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div className='flex justify-center align-middle'>
       <button disabled={isButton} type="submit"   className={`border border-blue-500 text-blue-500 mt-4 px-4 py-2 rounded-lg transition duration-300 ${isButton ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-500 hover:text-white"}`}>{pending ? "Loading..." : "Register"}</button>
        </div>
      </form>
    </div></>
  );
};


export default Register