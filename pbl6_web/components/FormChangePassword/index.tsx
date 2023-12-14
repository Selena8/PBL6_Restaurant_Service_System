import React, { useState } from 'react'
import { changePassword } from '@/store/apps/auth/api/user'
import { localStorageClient } from '@/utils/localStorage'
import { unValidPassword } from '@/utils/parse.util'
import { Box, FormControl, InputAdornment, TextField, Typography, Button, Divider, Snackbar, Alert } from '@mui/material'
import { capitalize } from 'lodash'
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

const FormChangePassword = () => {
    const token = localStorageClient.getItem("userToken");

    const [state, setState] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
        errOldPassword: "",
        errNewPassword: "",
        errConfirmPassword: "",
        showOldPassword: false,
        showNewPassword: false,
        showConfirmPassword: false
    })
    const [error, setError] = useState('')
    const [isOpenErr, setIsOpenErr] = useState(false)
    const [success, setSuccess] = useState(false)
    const { 
        oldPassword, 
        newPassword, 
        confirmPassword, 
        errOldPassword, 
        errNewPassword, 
        errConfirmPassword,
        showOldPassword,
        showNewPassword,
        showConfirmPassword
    } = state

    const resetInput = () => {
        setState((prevState: any) => ({
            ...prevState,
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        }))
    }

    const validateInput = () => {
      const errorState: { [key: string]: string } = {};
      if(!oldPassword){
          errorState.errOldPassword = "Old Password is empty"
      } else {
        errorState.errOldPassword = ""
      }
      if(!newPassword){
        errorState.errNewPassword = "New Password is empty"
      } else if(unValidPassword(newPassword)) {
        errorState.errNewPassword = "Password is not incorrect format"
      } else {
        errorState.errNewPassword = ""
      }
      if(!confirmPassword){
        errorState.errConfirmPassword = "Confirm Password is empty"
      } else if(newPassword.trim() !== confirmPassword.trim()){
        errorState.errConfirmPassword = "Password is not match"
      } else {
        errorState.errConfirmPassword = ""
      }
      setState((prevState: any) => ({
        ...prevState,
        ...errorState
      }))
      if(errorState.errOldPassword && errorState.errNewPassword && errorState.errConfirmPassword){
          return false
      }
      return true
    }
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = e.target
        setState((prevState: any) => ({
            ...prevState,
            [name]: value,
            [`err${capitalize(name)}`]: "",
        }));
    }

    const handleChangePassword = async () => {
        const isValid = validateInput()
        const data = {
            oldPassword,
            newPassword,
            confirmPassword
        }
        if(isValid && token){
            const response = await changePassword(data, token);
            if (response.ok) {
              setError("");
              setSuccess(true);
              resetInput()
            } else {
              const errData = await response.json();
              setError(errData.message);
              setIsOpenErr(true)
            }
      
        }
    }

  return (
    <Box>
       <Typography variant='h5'>Change Password</Typography>
       <Divider />
       <FormControl
        sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: "40px",
                gap: "40px",
            }}
       >
        <Box className="w-full flex flex-col gap-6">
        <Box>
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
                    onClick={() => setState((prevState: any) => ({...prevState,showOldPassword: !showOldPassword}))}
                  >
                    {showOldPassword ? <VisibilityOff /> : <Visibility />}
                  </InputAdornment>
                ),
              }}
            type={`${showOldPassword ? "text" : "password"}`}
            label="Old Password"
            placeholder="Your old password"
            value={oldPassword}
            name="oldPassword"
            onChange={handleChange}
        />
        <p className="ml-[15px] text-[red]">{errOldPassword}</p>
        </Box>
        <Box>
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
                        onClick={() => setState((prevState: any) => ({...prevState,showNewPassword: !showNewPassword}))}
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </InputAdornment>
                    ),
                  }}
                  type={`${showNewPassword ? "text" : "password"}`}
                  label="New Password"
                placeholder="Your new password"
                value={newPassword}
                name="newPassword"
                onChange={handleChange}
            />
            <Typography variant='subtitle2' sx={{fontWeight: "500"}}>
            Must be at least 6 characters long, at least 1 uppercase character and at least 1 special character
            </Typography>
            <p className="ml-[15px] text-[red]">{errNewPassword}</p>
        </Box>
        <Box>
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
                        onClick={() => setState((prevState: any) => ({...prevState,showConfirmPassword: !showConfirmPassword}))}
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </InputAdornment>
                    ),
                  }}
                  type={`${showConfirmPassword ? "text" : "password"}`}
                label="Confirm Password"
                placeholder="Your Confirm password"
                value={confirmPassword}
                name="confirmPassword"
                onChange={handleChange}
            />
            <p className="ml-[15px] text-[red]">{errConfirmPassword}</p>
        </Box>
        </Box>
        <Box className="w-full flex justify-end">
            <Button
              sx={{
                color: 'white',
                backgroundColor: '#FE724C !important',
                padding: '0.75rem',
                borderRadius: '10px',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#EB5D37',
                },
              }}
              onClick={handleChangePassword}
            >
              Change Password
            </Button>
        </Box>
       </FormControl>
       <Snackbar 
          open={isOpenErr} 
          autoHideDuration={3000} 
          onClose={() => setIsOpenErr(false)} 
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          style={{ top: '64px' }}
        >
          <Alert onClose={() => setIsOpenErr(false)} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
       <Snackbar
          open={success}
          autoHideDuration={3000}
          onClose={() => setSuccess(false)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          style={{ top: "64px" }}
        >
          <Alert
            onClose={() => setSuccess(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            Change Password successful!
          </Alert>
        </Snackbar>
    </Box>
  )
}

export default FormChangePassword
