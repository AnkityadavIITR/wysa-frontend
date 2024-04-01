"use client";
import axios from "axios";
import { useState } from "react";
import { getFromLocalStorage } from "@/lib/utils";

const useAuthRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    console.log(email,password);
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/user/login`,
        { email, password },
      );
      console.log(response);
      setLoading(false)
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    console.log(name, email, password);
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/user/register`, {
        name,
        email,
        password,
      },    
      );
      console.log(response);
      setLoading(false)
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    login,
    register,
  };
};

export default useAuthRequest;
