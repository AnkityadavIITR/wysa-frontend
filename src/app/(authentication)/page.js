"use client"
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";
import { getFromLocalStorage } from "@/lib/utils";
export default function Home() {
  const isUser=getFromLocalStorage("isUserAuthenticated")|| "";
  const router=useRouter();
  useEffect(()=>{
    if(isUser!=""){
      router.push("/chat")
    }else{
      router.push("/login")
    }

  },[isUser])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
    </main>
  );
}
