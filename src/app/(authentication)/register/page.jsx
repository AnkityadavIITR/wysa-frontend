"use client";
import React, { useState } from "react";

// import { useToast } from "@/components/ui/use-toast";
import { setLocalStorage } from "@/lib/utils";
import Form from "@/components/auth/signupform";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (name,email, password) => {
    try {
        console.log(name ,email, password);
      if (response) {
        router.replace("/dashboard");
      }
    } catch (e) {}
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
          setLoading={setLoading}
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