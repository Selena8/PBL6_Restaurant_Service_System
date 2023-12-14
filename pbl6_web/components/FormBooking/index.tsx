import React from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Button, FormControl, TextField } from "@mui/material";

const FormBooking = () => {
  return (
    <FormControl className="grid grid-cols-1 gap-6 mt-8">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <TextField
          sx={{
            "&": {
              borderRadius: "10px",
              "& .MuiOutlinedInput-root": { borderRadius: "10px" },
              "& .MuiInputLabel-outlined": {
                position: "absolute",
                top: "8px",
                color: "rgba(0, 0, 0, 0.54) !important",
                transition: "all 0.2s",
              },
              "& .MuiOutlinedInput-root:focus-within .MuiInputLabel-outlined": {
                top: "0",
                color: "#FE724C",
              },
            },
          }}
          className="bg-white"
          type="text"
          label="Your Name"
        />
        <TextField
          sx={{
            "&": {
              borderRadius: "10px",
              "& .MuiOutlinedInput-root": { borderRadius: "10px"},
              "& .MuiInputLabel-outlined": {
                position: "absolute",
                top: "8px",
                color: "rgba(0, 0, 0, 0.54) !important",
                transition: "all 0.2s",
              },
              "& .MuiOutlinedInput-root:focus-within .MuiInputLabel-outlined": {
                top: "0",
                color: "#FE724C",
              },
            },
          }}
          className="bg-white"
          type="email"
          label="Your Email"
        />
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker label="Date & Time" sx={{
            "&": {
              backgroundColor: "white",
              borderRadius: "10px",
              "& .MuiOutlinedInput-root": { borderRadius: "10px" },
              "& .MuiInputLabel-outlined": {
                position: "absolute",
                top: "8px",
                color: "rgba(0, 0, 0, 0.54) !important",
                transition: "all 0.2s",
              },
              "& .MuiOutlinedInput-root:focus-within .MuiInputLabel-outlined": {
                top: "0",
                color: "#FE724C",
              },
            },
          }}/>
        </LocalizationProvider>
        <TextField
          sx={{
            "&": {
              borderRadius: "10px",
              "& .MuiOutlinedInput-root": { borderRadius: "10px" },
              "& .MuiInputLabel-outlined": {
                position: "absolute",
                top: "8px",
                color: "rgba(0, 0, 0, 0.54) !important",
                transition: "all 0.2s",
              },
              "& .MuiOutlinedInput-root:focus-within .MuiInputLabel-outlined": {
                top: "0",
                color: "#FE724C",
              },
            },
          }}
          className="bg-white"
          type="text"
          label="Number of people"
        />
      </div>
      <div className="grid grid-cols-1">
      <TextField
  className="bg-white"
  type="text"
  label="Special Request"
  sx={{
    "&": {
      borderRadius: "10px",
      "& .MuiOutlinedInput-root": { borderRadius: "10px" },
      "& .MuiInputBase-root": {
        padding: "10px 0",
      },
      "& .MuiInputLabel-outlined": {
        position: "absolute",
        top: "8px",
        color: "rgba(0, 0, 0, 0.54) !important",
        transition: "all 0.2s",
      },
      "& .MuiOutlinedInput-root:focus-within .MuiInputLabel-outlined": {
        top: "0",
        color: "#FE724C",
      },
    },
  }}
/>
      </div>
      <div className="grid grid-cols-1 ">
        <Button className="text-white bg-[#FE724C] p-3" sx={{"&:hover": {backgroundColor: "#EB5D37"}}}>BOOK NOW</Button>
      </div>
    </FormControl>
  );
};

export default FormBooking;
