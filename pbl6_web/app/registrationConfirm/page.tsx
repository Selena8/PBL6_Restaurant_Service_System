"use client"

import React, { useState } from 'react'
import { Button } from "@mui/material";
import { activateAccount } from '@/store/apps/auth/api/user';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { getStaffs } from '@/store/apps/staff';
import { localStorageClient } from '@/utils/localStorage';
import { useSearchParams } from 'next/navigation';

const RegistrationConfirm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const tokenAdmin = localStorageClient.getItem("userToken");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleVerify = async () => {
    const response = await activateAccount(token);
    if (response) {
      dispatch(getStaffs({data: {}, token: tokenAdmin}))
      setError("");
      setSuccess(true);
    } else {
      const errData = await response.json();
      setError(errData.message);
      setSuccess(false);
    }
  };

  return (
    <div className="bg-white w-full h-[100vh] flex flex-col">
      <div className="md:w-[70%] w-[90%] mx-auto flex flex-col justify-center items-center mt-[70px]">
      <img
          className="w-[300px]"
          src={`${success ? "/assets/images/check.png" : "/assets/images/lock.png"}`}
          alt="verify"
        />
        <div className="heading lg:text-[35px] md:text-[35px] text-[20px] font-bold text-center mt-4">
            {success ? "You have successfully activated your account" : "Account activation"}
        </div>
        <div className="w-[50%] grid grid-cols-1 gap-[30px] mt-[40px]">
          <div className="w-full grid grid-cols-1 ">
            {
              !success && (
                <Button
              onClick={handleVerify}
              sx={{
                color: "white",
                backgroundColor: "#FE724C !important",
                padding: "0.75rem",
                borderRadius: "10px",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#EB5D37 !important",
                },
              }}
            >
              Verify
            </Button>
              )
            }
            {error !== "" && (
              <p className="mt-[10px] ml-[15px] text-[red]">{error}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegistrationConfirm
