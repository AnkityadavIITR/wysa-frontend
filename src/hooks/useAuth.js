"use client";
import axios from "axios";
import { useState } from "react";

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
        {
            withCredentials:true,
            timeout:50000
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/user/register`, {
        name,
        email,
        password,
      },{
        withCredentials:true
      });
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
