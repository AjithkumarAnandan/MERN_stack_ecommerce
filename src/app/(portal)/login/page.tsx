"use client";
import axios from 'axios';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Login: React.FC = () => {
  const [pending, setPending] = useState(false);
  const [formData, setFormData] = useState<{username:string, password:string}>({
    username: '',
    password: ''
  });
  const router = useRouter();
const fetchData = async (value: { username: string; password: string }) => {
    try {
        setPending(true); // Set pending to true before making the request
        
        const response = await axios.post("/api/auth/login", value, { 
            headers: { "Content-Type": "application/json" }
        });
        if (response?.data?.status === 200) {
          localStorage.setItem('token',response?.data?.token);
          router.push('/dashboard');
        }
    } catch (error) {
        console.error("Login failed:", error);
    } finally {
        setPending(false); // Ensure it's set to false after request completes
    }
};


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await fetchData(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className='flex justify-center items-center text-center'>
      <form method="POST" action="/login" onSubmit={handleSubmit} >
      <h2 className='text-[24px] my-4'>Login Form</h2>
       <div className='flex my-2'>
        <h3 className='mr-8'>Username</h3> 
        <input name='username' type="text" value={formData.username} onChange={handleChange} className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div> 
        <div className='flex my-2 ml-1'>
        <h3 className='mr-8'>Password</h3> 
        <input name='password' type="password" value={formData.password} onChange={handleChange} className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div className='flex justify-center align-middle'>
        <button type="submit" className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg transition duration-300 hover:bg-blue-500 hover:text-white">{pending ? "Loading..." : "Login"}</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
