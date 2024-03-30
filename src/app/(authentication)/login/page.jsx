"use client";
import React, { useState } from "react";
import { setLocalStorage } from "@/lib/utils";
import Form from "@/components/auth/loginform";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useAuthRequest from "@/hooks/useAuth";


const LoginPage = () => {
//   const { toast } = useToast();
  const router = useRouter();
//   const [loading, setLoading] = useState(false);
  const {loading,error,login}=useAuthRequest();

  const handleSignIn = async (email, password) => {
    console.log(email,password);
    try {
        const response=await login(email, password);
        console.log(response);
        if(response?.success){
            setLocalStorage("isUserAuthenticated",true)
            router.replace("/chat")
        }else{
            console.log(response);
        }        
    } catch (e) {
        console.log(e);
    }
  };
  return (
    <div className="h-screen w-full flex justify-center items-center ">
      <div className="min-w-[400px] p-4 flex-col border rounded-md justify-center border-gray-600 bg-white">
        <h1 className="text-[24px] text-semibold">Sign in to account</h1>
        <h2 className="text-[14px] text-gray-500 text-md mt-2">
          Enter your email below to login
        </h2>
        <Form
          onSubmit={handleSignIn}
          loading={loading}
        />
        <div className=" flex justify-end gap-x-1">
          <p className="text-[14px] text-gray-500 text-md">
            don&apos;t have an account?
          </p>
          <Link
            href={"/register"}
            className="text-[14px] text-md text-blue-500 hover:underline"
          >
            register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
