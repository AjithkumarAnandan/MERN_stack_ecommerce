import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

// Custom Hook for Token Management
export const useToken = () => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            try {
                const tokenParts = storedToken.split(".");
                if (tokenParts.length === 3) {
                  const expTime = JSON.parse(atob(tokenParts[1])).exp; 
                  const currentTime=Math.floor(Date.now() / 1000);
                 if(currentTime && expTime && currentTime >= expTime){
                     localStorage.removeItem('token');
                     setToken(null);
                 } else{
                     setToken(storedToken); 
                 }
                } else {
                    throw new Error("Invalid token format");
                }
            } catch (error) {
                console.error("Invalid token format", error);
            }
        }else{
            console.log('Token expire');
            redirect('/login');        
        }
    }, []);

    return token;
};