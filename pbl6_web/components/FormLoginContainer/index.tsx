import {
  Button,
  FormControl,
  InputAdornment,
  Link,
  TextField,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React, { useEffect, useState } from "react";
import { unValidEmail, unValidPassword, capitalize } from "@/utils/parse.util";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetail, userLogin } from "@/store/apps/auth";
import { AppDispatch } from "@/store";
import { useRouter } from "next/navigation";
// @ts-ignore
import { isEmpty } from "validator";
import { localStorageClient } from "@/utils/localStorage";

interface FormValues {
  email: string;
  password: string;
  errEmail: string;
  errPassword: string;
}
const FormLoginContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, token, error } = useSelector((state: any) => state.auth);
  const router = useRouter();
  const userToken = localStorageClient.getItem("userToken");
    
  useEffect(() => {
    if (token) {
      localStorageClient.setItem("userToken", token);
      const currentTime = new Date().getTime();
      localStorageClient.setItem('tokenExpiration', currentTime);
      router.push("/admin/dashboard");
    }
  }, [token, userToken]);

  useEffect(() => {
    if (userToken) {
      const tokenExpiration = localStorageClient.getItem('tokenExpiration');
      if (token && tokenExpiration) {
        const currentTime = new Date().getTime();
        const timeElapsed = currentTime - parseInt(tokenExpiration);
    
        if (timeElapsed > 24 * 60 * 60 * 1000) {
          localStorageClient.removeItem('userToken');
          localStorageClient.removeItem('tokenExpiration');
          router.push("/admin/signin");
        } else {
          router.push("/admin/dashboard");
        }
      } else {
        router.push("/admin/dashboard");
      }
      router.push("/admin/dashboard");
    }
  }, [userToken]);

  const [loginInfo, setLoginInfo] = useState<FormValues>({
    email: "",
    password: "",
    errEmail: "",
    errPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { email, password, errEmail, errPassword } = loginInfo;

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const validateInputs = (loginInfo: FormValues) => {
    const { email, password } = loginInfo;
    const newLoginInfo: any = { ...loginInfo };

    if (isEmpty(email)) {
      newLoginInfo.errEmail = "Email is empty";
    } else if (unValidEmail(email)) {
      newLoginInfo.errEmail = "Please enter a valid email address";
    }

    if (isEmpty(password)) {
      newLoginInfo.errPassword = "Password is empty";
    } else if (unValidPassword(password)) {
      newLoginInfo.errPassword =
        "Password must be at least 8 characters long, contain numbers and special characters";
    }

    setLoginInfo(newLoginInfo);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setLoginInfo((prevLoginInfo: any) => ({
      ...prevLoginInfo,
      [name]: value,
      [`err${capitalize(name)}`]: "",
    }));
  };
  const handleLogin = () => {
    validateInputs(loginInfo);
    if(errEmail === '' && errPassword === '') {
      dispatch(userLogin({ email, password }));
    }
  };

  return (
    <div className="w-[50%]">
      <div className="heading text-[#23262F] lg:text-[30px] text-[20px] text-center">
        Please Login To Continue
      </div>
      <FormControl
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
          marginTop: "40px",
          gap: "20px",
        }}
      >
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
              type="text"
              label="Email"
              placeholder="Your email"
              value={loginInfo?.email}
              name="email"
              onChange={handleTextChange}
            />
            {errEmail !== "" && (
              <p className="ml-[15px] text-[red]">{errEmail}</p>
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
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </InputAdornment>
                ),
              }}
              autoComplete="off"
              type={showPassword ? "text" : "password"}
              label="Password"
              placeholder="Your password"
              value={loginInfo?.password}
              name="password"
              onChange={handleTextChange}
              onKeyDown={(e) => {
                e.key === "Enter" && handleLogin();
              }}
            />
            {errPassword !== "" && (
              <p className="ml-[15px] text-[red]">{errPassword}</p>
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <Link
            sx={{
              color: "#FE724C",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline"
              }
            }}
            href="/verify-email"
          >
            Forgot password?
          </Link>
        </div>
        <div className="w-full grid grid-cols-1 ">
          {!loading ? (
            <Button
              onClick={handleLogin}
              sx={{
                color: 'white',
                backgroundColor: '#FE724C !important',
                padding: '0.75rem',
                borderRadius: '10px',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#EB5D37 !important',
                },
              }}
            >
              Login
            </Button>
          ) : ( 
            <LoadingButton
              loading={loading}
              variant="contained"
            >
              <span>Login</span>
            </LoadingButton>
          )}
          {error !== "" && (
            <p className="mt-[10px] ml-[15px] text-[red]">{error}</p>
          )}
        </div>
      </FormControl>
    </div>
  );
};

export default FormLoginContainer;
