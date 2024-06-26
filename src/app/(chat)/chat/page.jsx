"use client";
import { useEffect, useState, useRef, useMemo } from "react";
import { io } from "socket.io-client";
import { getFromLocalStorage } from "@/lib/utils";
import { useRouter } from "next/navigation";

const Page = () => {
  const chatWindowRef = useRef(null);
  const [chatArray, setChatArray] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [socketInitialized, setSocketInitialized] = useState(false);
  const [socket, setSocket] = useState(null);

  const isUser = getFromLocalStorage("isUserAuthenticated") || "";
  const router = useRouter();
  useEffect(() => {
    if (isUser == "") {
      router.push("/login");
    }
  }, [isUser, router]);

  useEffect(() => {
    const authToken = getFromLocalStorage("token");
    if (!authToken) {
      router.push("/login");
      return;
    }

    const newSocket = io(process.env.NEXT_PUBLIC_SERVER_URI, {
      auth: { token: authToken },
      timeout: 50000,
    });

    newSocket.on("connect", () => {
      console.log("Socket connected");
      setSocketInitialized(true);
    });

    newSocket.on("welcome", (msg) => {
      console.log(msg);
      setChatArray((prev) => [...prev, { response: msg }]);
    });

    newSocket.on("backend-response", (msg) => {
      console.log("Response from backend:", msg);
      setChatArray((prev) => [...prev, { response: msg }]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (socketInitialized && query !== "") {
      setChatArray((prev) => [...prev, { query: query }]);
      socket.emit("user-query", query);
    } else {
      console.error("Socket is not initialized!");
    }
    setQuery("");
  };

  return (
    <div className="h-screen flex justify-center bg-gradient-to-br from-custom-gradient ">
      <div className="relative xl:min-w-[40%]  flex flex-col h-screen p-5 ">
        <div
          className="flex flex-col gap-y-4 h-[calc(68vh)] overflow-auto mt-10 "
          ref={chatWindowRef}
        >
          {chatArray?.map((chat) => {
            return (
              <>
                {chat.response ? (
                  <div className="max-w-[300px] border bg-white p-3 text-[14px] xl:text-[18px] rounded-xl w-fit">
                    {chat.response}
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <div className="max-w-[300px] border bg-blue-300 text-white p-3 text-[14px] xl:text-[18px] rounded-xl w-fit">
                      {chat.query}
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>

        <form onSubmit={(e)=>handleSubmit(e)} className="fixed bottom-10 xl:min-w-[40%] h">
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
