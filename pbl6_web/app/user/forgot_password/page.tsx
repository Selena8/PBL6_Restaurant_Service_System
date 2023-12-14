"use client";

import { resetPassword } from "@/store/apps/auth/api/user";
import { capitalize, unValidEmail, unValidPassword } from "@/utils/parse.util";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button, InputAdornment, TextField } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
// @ts-ignore
import { isEmpty } from "validator";

const ForgotPassword = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmpw, setShowConfirmpw] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [data, setData] = useState({
    password: "",
    confirmPw: "",
    errPassword: "",
    errConfirmPw: "",
  });
  const { password, confirmPw, errPassword, errConfirmPw } = data;

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmpw = () => setShowConfirmpw((show) => !show);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setData((prevData: any) => ({
      ...prevData,
      [name]: value,
      [`err${capitalize(name)}`]: "",
    }));
  };
  const validateInputs = (data: any) => {
    const { password, confirmPw } = data;
    const newData: any = { ...data };

    if (isEmpty(password)) {
      newData.errPassword = "Password is empty";
    } else if (unValidPassword(password)) {
      newData.errPassword =
        "Password must be at least 8 characters long, contain numbers and special characters";
    }

    if (isEmpty(confirmPw)) {
      newData.errConfirmPw = "Confirm password is empty";
    } else if (password !== confirmPw) {
      newData.errConfirmPw = "Please make sure your passwords match";
    }

    setData(newData);
    if (newData.errPassword === "" && newData.errConfirmPw === "") {
      return true;
    }
    return false;
  };

  const handleReset = async () => {
    const isValid = validateInputs(data);
    if (isValid && token) {
      const response = await resetPassword({
        newPassword: data.password,
        confirmPassword: data.confirmPw,
        token: token,
      });
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

  useEffect(() => {
    if (success) {
      router.replace("/signin");
    }
  }, [success]);

  return (
    <div className="bg-white w-full h-[100vh] flex flex-col">
      <div className="md:w-[70%] w-[90%] mx-auto flex flex-col justify-center items-center mt-[70px]">
        <img
          className="w-[600px]"
          src="/assets/images/verify.jpg"
          alt="verify"
        />
        <div className="heading text-[#FE724C] lg:text-[45px] md:text-[35px] text-[25px] font-bold text-center">
          Reset Password
        </div>
        <div className="w-[50%] grid grid-cols-1 gap-[30px] mt-[40px]">
          <div className="w-full grid grid-cols-1 gap-5">
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
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      sx={{ cursor: "pointer" }}
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </InputAdornment>
                  ),
                }}
                autoComplete="off"
                type={showPassword ? "text" : "password"}
                label="New password"
                placeholder="Your password"
                value={password}
                name="password"
                onChange={handleTextChange}
              />
              {errPassword !== "" && (
                <p className="mt-[5px] ml-[15px] text-[red]">{errPassword}</p>
              )}
            </div>
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
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      sx={{ cursor: "pointer" }}
                      onClick={handleClickShowConfirmpw}
                    >
                      {showConfirmpw ? <VisibilityOff /> : <Visibility />}
                    </InputAdornment>
                  ),
                }}
                autoComplete="off"
                type={showConfirmpw ? "text" : "password"}
                label="Confirm password"
                placeholder="Your confirm password"
                value={confirmPw}
                name="confirmPw"
                onChange={handleTextChange}
                onKeyDown={(e) => {
                  e.key === "Enter" && handleReset();
                }}
              />
              {errConfirmPw !== "" && (
                <p className="mt-[5px] ml-[15px] text-[red]">{errConfirmPw}</p>
              )}
            </div>
          </div>
          <div className="w-full grid grid-cols-1 ">
            <Button
              onClick={handleReset}
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
              Reset
            </Button>
            {error !== "" && (
              <p className="mt-[10px] ml-[15px] text-[red]">{error}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
