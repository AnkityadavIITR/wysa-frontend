"use client";
import React, { useEffect, useState } from "react";
import { setLocalStorage } from "@/lib/utils";
import Form from "@/components/auth/loginform";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useAuthRequest from "@/hooks/useAuth";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  const { loading, error, login } = useAuthRequest();
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

  const handleSignIn = async (email, password) => {
    console.log(email, password);
    try {
      const response = await login(email, password);
      console.log(response);
      if (response?.success) {
        toast.success("succefully login");
        setLocalStorage("isUserAuthenticated", true);
        setLocalStorage("token", `Bearer ${response.token}`);
        router.replace("/chat");
      } else {
        toast.error(response.message);

      }
    } catch (e) {
      console.log(e);
      toast.error("Internal error");
    }
  };
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center ">
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
          Enter your email below to login
        </h2>
        <Form onSubmit={handleSignIn} loading={loading} />
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
