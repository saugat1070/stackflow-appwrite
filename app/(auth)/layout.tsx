"use client"
import React from "react";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";

const Layout = ({children}:{children:React.ReactNode})=>{
    const {session} = useAuthStore();
    const router = useRouter();

    React.useEffect(()=>{
        if(session){
            router.push("/")
        }
    },[session,router]);

    if(session){
        return null;
    }
    return(
        <div className="relative flex min-h-screen flex-col items-center justify-center bg-gray-900 py-6 px-5">
            <div className="">
                {children}
            </div>
        </div>
    )
}
export default Layout;
