"use client";
import { response } from "express";
import { useEffect, useState, useMemo } from "react";
import { io } from "socket.io-client";

const Page = () => {
  const [chatArray, setChatArray] = useState(null);
  const [query, setQuery] = useState("");
//   const socket = useMemo(
//     () =>
//       io("http://localhost:3000", {
//         withCredentials: true,
//       }),
//     []
//   );
  useEffect(() => {
    const socket = io("http://localhost:3000", {
      withCredentials: true,
    });

    // Event listener for 'connect' event
    socket.on("connect", () => {
      console.log("Socket connected");
    });

    // Event listener for 'welcome' event
    socket.on("welcome", (msg) => {
      console.log(msg);
      setChatArray((prev) => [...prev, { response: msg }]);
    });

    // Cleanup function to disconnect the socket when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []); // Run effect only once on component mount

  const onSubmit = () => {
    console.log(query);
    socket.emit("user-query");
  };

  return (
    <div className="h-screen flex justify-center items-center">
      {/* <div className="max-w-[600px]">
        {chatArray?.map((chat) => {
          return (
            <>{chat.response ? <p>{chat.response}</p> : <p>{chat.query}</p>}</>
          );
        })}
      </div> */}
      <div>
        <label className="block mb-1" for="name">
          Email-Address
        </label>
        <input
          type="name"
          placeholder="Email"
          my="2"
          name="name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="py-2 px-3 rounded-xl mt-2 border-black border-2 text-gray-600 focus:outline-none focus:ring focus:ring-gray-200 focus:ring-opacity-50 shadow-sm disabled:bg-gray-100 block w-full placeholder:font-light"
        />
      </div>
    </div>
  );
};

export default Page;
