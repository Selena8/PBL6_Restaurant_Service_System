"use client";
import "@/app/globals.css";
import AdminHeader from "@/components/AdminHeader";
import FormLoginContainer from "@/components/FormLoginContainer";
import React from "react";

const SignIn = () => {
  return (
    <div className="bg-[#F0F1F6] w-full h-[100vh] flex flex-col">
      <AdminHeader namePage="" />
      <div className="md:w-[70%] w-[90%] mx-auto flex flex-col justify-center items-center gap-[30px] mt-[100px]">
        <div className="heading text-[#FE724C] lg:text-[50px] md:text-[40px] text-[30px] font-bold text-center">
          WELCOME TO FOODHUB
        </div>
        <FormLoginContainer />
      </div>
    </div>
  );
};

export default SignIn;
