"use client";
import { useEffect, useState, useMemo } from "react";
import { io } from "socket.io-client";

const Page = () => {
  const [chatArray, setChatArray] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [socketInitialized, setSocketInitialized] = useState(false);

  let socket;
  useEffect(() => {
    socket = io("http://localhost:4000", {
      withCredentials: true,
    });
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
    if (socketInitialized) {
      // Check if socket is initialized
      socket.emit("user-query", query);
    } else {
      console.error("Socket is not initialized!");
    }
    setQuery("");
  };

  return (
    <div className="h-screen flex justify-center bg-gradient-to-br from-custom-gradient ">
      <div className="relative xl:min-w-[40%]  flex flex-col h-screen ">
        <div className="flex flex-col gap-y-4 h-[80vh] overflow-auto mt-10">
          {chatArray?.map((chat) => {
            return (
              <>
                {chat.response ? (
                  <div className="max-w-[300px] border bg-white p-3 text-[18px] rounded-xl w-fit">
                    {chat.response}
                  </div>
                ) : (
                  <div className="max-w-[300px] border bg-blue-300 text-white p-3 text-[18px] rounded-xl w-fit">
                    {chat.response}
                  </div>
                )}
              </>
            );
          })}
        </div>

        <div className="absolute bottom-10 xl:min-w-[40%]">
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
        </div>
      </div>
    </div>
  );
};

export default Page;
