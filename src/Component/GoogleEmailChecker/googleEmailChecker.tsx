import { Spin } from "antd";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface WithAuthProps {}
const GoogleEmailCheck=<p extends object>(WrappedComponent:React.ComponentType<p>)=>{

    return (props: p & WithAuthProps)=>{
        const [isAuthenticated, setIsAuthenticated]=useState<Boolean | null>(null);
        const { data: session, status}=useSession();
        const router=useRouter();
        const UserEmail = session?.user?.email;
        useEffect(() => {
            if (!UserEmail) return ;
            const fetchUser = async () => {
                try {
                    const response = await axios.post(
                        "/api/auth/findingUser",
                        { email: UserEmail },
                        { headers: { "Content-Type": "application/json" } }
                    );   
                if (response?.data?.data && response?.data?.accessToken){
                        router.push("/dashboard");
                        localStorage.setItem("token", response?.data?.accessToken);
                    }else{
                        router.push("/register");
                        setIsAuthenticated(false);
                    }
                } catch (error) {
                    console.error("Something went wrong", error);
                }
            };
            fetchUser();
        }, [UserEmail]); 

        useEffect(()=>{
        if (!session) {
            setTimeout(()=>{
                setIsAuthenticated(false);
            },2000)
        }
        },[])

        if (isAuthenticated=== null) {
            return <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 z-50">
                        <Spin size="large" />
                    </div>      
        }

        return <WrappedComponent {...props}/>
    }

}

export default GoogleEmailCheck;