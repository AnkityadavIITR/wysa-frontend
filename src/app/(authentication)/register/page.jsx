"use client";
import React, { useState } from "react";

// import { useToast } from "@/components/ui/use-toast";
import Form from "@/components/auth/signupform";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useAuthRequest from "@/hooks/useAuth";
import { setLocalStorage } from "@/lib/utils";

const LoginPage = () => {
  const router = useRouter();
  const {loading,error,register}=useAuthRequest();

  const handleSignIn = async (name,email, password) => {
    try {
        const response=register(name,email,password);
      if (response?.success) {
        setLocalStorage("token",`Bearer ${response.token}`)
        setLocalStorage("isUserAuthenticated",true);
        router.replace("/chat");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="min-w-[400px] p-4 flex-col border rounded-md justify-center border-gray-600 bg-white">
        <h1 className="text-[24px] text-semibold">Sign in to account</h1>
        <h2 className="text-[14px] text-gray-500 text-md mt-2">
          Enter your email below to signup
        </h2>
        <Form
          onSubmit={handleSignIn}
          loading={loading}
        />
        <div className=" flex justify-end gap-x-1">
          <p className="text-[14px] text-gray-500 text-md">
            already have an account?
          </p>
          <Link
            href={"/login"}
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
