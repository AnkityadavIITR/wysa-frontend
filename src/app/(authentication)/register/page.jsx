"use client";
import React, { useState, useEffect } from "react";

// import { useToast } from "@/components/ui/use-toast";
import Form from "@/components/auth/signupform";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useAuthRequest from "@/hooks/useAuth";
import { setLocalStorage } from "@/lib/utils";
import axios from "axios";
import Image from "next/image";
import {  toast } from 'react-hot-toast';

const RegisterPage = () => {
  const router = useRouter();
  const { loading, error, register } = useAuthRequest();
  const [loginData, setLoginData] = useState(null);

  useEffect(() => {
    const loginConfig = async () => {
      console.log("check");
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URI}/unauth/login/config`
        );
        console.log(data);
        if (data?.success) {
          setLoginData(data.config);
        }
      } catch (e) {
        console.log(e);
      }
    };
    loginConfig();
  }, []);

  const handleSignIn = async (name, email, password) => {
    try {
      const response = await register(name, email, password);
      console.log(response);
      if (response?.success) {
        console.log("check");
        setLocalStorage("token", `Bearer ${response.token}`);
        setLocalStorage("isUserAuthenticated", true);
        router.replace("/chat");
      }
      if(!response?.success){
        toast.error(response.message);
      }
    } catch (e) {
      console.log(e);
      toast.error("internal error")
    }
  };
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      {loginData && (
        <div className="flex flex-col gap-y-3">
          <Image
            src={loginData.image}
            alt="logo"
            width={120}
            height={120}
            className="rounded-full mx-auto"
          />
          <h1 className="text-[24px] text-bold">{loginData?.heading}</h1>
        </div>
      )}
      <div className="w-[95%] md:min-w-[400px] p-4 flex-col border rounded-md justify-center border-gray-600 bg-white">
        <h1 className="text-[24px] text-semibold">Sign in to account</h1>
        <h2 className="text-[14px] text-gray-500 text-md mt-2">
          Enter your email below to signup
        </h2>
        <Form onSubmit={handleSignIn} loading={loading} />
        <div className=" flex justify-end gap-x-1">
          <p className="text-[14px] text-gray-500 text-md">
            already have an account?
          </p>
          <Link
            href={"/login"}
            className="text-[14px] text-md text-blue-500 hover:underline"
          >
            login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
