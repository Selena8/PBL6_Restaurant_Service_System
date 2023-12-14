"use client";

import { verifyEmail } from "@/store/apps/auth/api/user";
import { capitalize, unValidEmail } from "@/utils/parse.util";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
// @ts-ignore
import { isEmpty } from "validator";

const VerifyEmail = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState({
    email: "",
    errEmail: "",
  });
  const { email, errEmail } = data;
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setData((prevData: any) => ({
      ...prevData,
      [name]: value,
      [`err${capitalize(name)}`]: "",
    }));
  };
  const validateInputs = (data: any) => {
    const { email } = data;
    const newData: any = { ...data };

    if (isEmpty(email)) {
      newData.errEmail = "Email is empty";
    } else if (unValidEmail(email)) {
      newData.errEmail = "Please enter a valid email address";
    }

    setData(newData);
    if(newData.errEmail === "") {
      return true
    }
    return false
  };

  const handleVerify = async () => {
    const isValid = validateInputs(data);
    if (isValid) {
      const response = await verifyEmail(data.email);
      if (response.ok) {
        setError("");
        setSuccess(true);
      } else {
        const errData = await response.json();
        setError(errData.message);
        setSuccess(false);
      }
    }
  };

  return (
    <div className="bg-white w-full h-[100vh] flex flex-col">
      <div className="md:w-[70%] w-[90%] mx-auto flex flex-col justify-center items-center mt-[70px]">
        <img
          className="w-[600px]"
          src="/assets/images/verify.jpg"
          alt="verify"
        />
        <div className="heading text-[#FE724C] lg:text-[45px] md:text-[35px] text-[25px] font-bold text-center">
          Verify your email address
        </div>
        <div className="w-[50%] grid grid-cols-1 gap-[30px] mt-[40px]">
          <div>
            <TextField
              fullWidth
              sx={{
                "&": {
                  backgroundColor: "white",
                  borderRadius: "10px",
                  "& .MuiOutlinedInput-root": { borderRadius: "10px" },
                  "& .MuiInputLabel-outlined": {
                    position: "absolute",
                    color: "rgba(0, 0, 0, 0.54) !important",
                    transition: "all 0.2s",
                  },
                  "& .MuiOutlinedInput-root:focus-within .MuiInputLabel-outlined":
                    {
                      color: "#FE724C",
                    },
                },
              }}
              type="text"
              label="Email"
              placeholder="Your email"
              value={email}
              name="email"
              onChange={handleTextChange}
              onKeyDown={(e) => {
                e.key === "Enter" && handleVerify();
              }}
            />
            {errEmail !== "" && (
              <p className="mt-[5px] ml-[15px] text-[red]">{errEmail}</p>
            )}
          </div>
          <div className="w-full grid grid-cols-1 ">
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
            {error !== "" && (
              <p className="mt-[10px] ml-[15px] text-[red]">{error}</p>
            )}
            {success && (
              <span className="mt-[15px] text-center">
                We sent a verification link to your email. Not receive?{" "}
                <span
                  className="text-[#FE724C] hover:cursor-pointer"
                  onClick={handleVerify}
                >
                  Resend it!
                </span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
