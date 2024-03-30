"use client";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { EyeOff, Eye } from "lucide-react";

const Form = ({onSubmit,loading,setLoading}) => {
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      name:"",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name:Yup.string().min(1,"Minimum 1 character").required("Required!"),
      email: Yup.string().email("Invalid email format").required("Required!"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("Required!"),
    }),
    onSubmit: (values) => {
      onSubmit(values.name,values.email, values.password);
    },
  });



  return (
    <form onSubmit={formik.handleSubmit} className="w-full">
      <div className="mb-4 text-[#585858] font-semibold mt-10 lg:mt-4">
        <label className="block mb-1" for="name">
          name
        </label>
        <input
          type="name"
          placeholder="name"
          my="2"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="py-2 px-3 rounded-xl mt-2 border-black border-2 text-gray-600 focus:outline-none focus:ring focus:ring-gray-200 focus:ring-opacity-50 shadow-sm disabled:bg-gray-100 block w-full placeholder:font-light"
        />
        <div className="text-red-500 text-xs italic mt-2">
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-700">{formik.errors.name}</div>
          ) : null}
        </div>
        <label className="block mb-1" for="email">
          Email-Address
        </label>
        <input
          type="email"
          placeholder="Email"
          my="2"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="py-2 px-3 rounded-xl mt-2 border-black border-2 text-gray-600 focus:outline-none focus:ring focus:ring-gray-200 focus:ring-opacity-50 shadow-sm disabled:bg-gray-100 block w-full placeholder:font-light"
        />
        <div className="text-red-500 text-xs italic mt-2">
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-700">{formik.errors.email}</div>
          ) : null}
        </div>
        <label className="block mb-1 mt-5 lg:mt-2" for="email">
          Password
        </label>
        <div className="flex relative">
          <input
            id="email"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formik.values.password}
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="py-2 px-3 rounded-xl mt-2 border-black border-2 text-gray-600 focus:outline-none focus:ring focus:ring-gray-200 focus:ring-opacity-50 shadow-sm disabled:bg-gray-100 block w-full placeholder:font-light"
          />
          {!showPassword ? (
            <EyeOff
              size={24}
              strokeWidth={1.25}
              className="absolute right-2 top-[16px]"
              onClick={() => {
                if (formik.values.password) setShowPassword(true);
              }}
            />
          ) : (
            <Eye
              size={24}
              strokeWidth={1.25}
              className="absolute right-2 top-[16px]"
              onClick={() => setShowPassword(false)}
            />
          )}
        </div>
        <div className="text-red-500 text-xs italic mt-2">
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-700">{formik.errors.password}</div>
          ) : null}
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
          {loading ? (
            "loading..."
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </form>
  );
};

export default Form;
