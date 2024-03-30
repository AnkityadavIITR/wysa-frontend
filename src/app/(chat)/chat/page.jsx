"use client";
import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { getFromLocalStorage } from "@/lib/utils";
import { useRouter } from "next/navigation";

let socket;
const Page = () => {
  const chatWindowRef = useRef(null);
  const [chatArray, setChatArray] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [socketInitialized, setSocketInitialized] = useState(false);
  const isUser=getFromLocalStorage("isUserAuthenticated")|| "";
  const router=useRouter();
  useEffect(()=>{
    if(isUser==""){
      router.push("/login")
    }

  },[isUser, router])


  useEffect(() => {
    socket = io(process.env.NEXT_PUBLIC_SERVER_URI, 
      {
        auth: {
          token: getFromLocalStorage("token"),
        },
        timeout:50000
      }
    );

    socket.on("connect", () => {
      console.log("Socket connected");
      setSocketInitialized(true);
    });

    socket.on("welcome", (msg) => {
      console.log(msg);
      setChatArray((prev) => [...prev, { response: msg }]);
    });

    socket.on("backend-response", (msg) => {
      console.log("Response from backend:", msg);
      setChatArray((prev) => [...prev, { response: msg }]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(query);
    if (socketInitialized && query!="") {
      // Check if socket is initialized
      setTimeout(() => {
          setChatArray((prev) => [...prev, { query: query }]);
      }, 700);
      socket.emit("user-query", query);
    } else {
      console.error("Socket is not initialized!");
    }
    setQuery("");
    // Scroll to the bottom of the chat window
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  };

  return (
    <div className="h-screen flex justify-center bg-gradient-to-br from-custom-gradient ">
      <div className="relative xl:min-w-[40%]  flex flex-col h-screen ">
        <div
          className="flex flex-col gap-y-4 h-[calc(70vh)] overflow-auto mt-10 "
          ref={chatWindowRef}
        >
          {chatArray?.map((chat) => {
            return (
              <>
                {chat.response ? (
                  <div className="max-w-[300px] border bg-white p-3 text-[18px] rounded-xl w-fit">
                    {chat.response}
                  </div>
                ) : (
                  <div className="max-w-[300px] border bg-blue-300 text-white p-3 text-[18px] rounded-xl w-fit">
                    {chat.query}
                  </div>
                )}
              </>
            );
          })}
        </div>

        <form className="fixed bottom-10 xl:min-w-[40%] h">
          <div className="w-full">
            <label className="block mb-1">Enter your message</label>
            <input
              type="name"
              placeholder="message"
              my="2"
              name="name"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="py-2 px-3 rounded-xl mt-2 border-black border-2 text-gray-600 focus:outline-none focus:ring focus:ring-gray-200 focus:ring-opacity-50 shadow-sm disabled:bg-gray-100 block w-full placeholder:font-light"
            />
          </div>
          <button
            type="submit"
            onClick={onSubmit}
            className={
              loading == false
                ? "w-full mt-5 bg-black py-2 text-white font-extrabold text-lg rounded-2xl desktop-arrow arrow text-center"
                : "w-full mt-5 bg-black py-2 text-white font-extrabold text-lg rounded-2xl desktop-arrow text-center"
            }
            disabled={loading}
          >
            {loading ? "loading.." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
