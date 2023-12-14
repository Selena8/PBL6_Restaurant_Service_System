import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/Themes/CustomTheme";
import { styled } from '@mui/material/styles';
import { TextField } from "@mui/material";


interface TextFieldProps {
  fullWidth?: boolean,
  type?: string;
  label?: string;
  placeholder?: string;
  name?: string;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

const CustomTextField = styled(TextField)(({ theme }) => ({
    color: theme.palette.secondary.main,
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
          color: theme.palette.secondary.main,
        },
      },
  }));

const TextFieldCustom = ({ 
  fullWidth,
  type, 
  label, 
  placeholder, 
  name, 
  value, 
  onChange 
}: TextFieldProps) => {

  return (
    <ThemeProvider theme={theme}>
      <CustomTextField
        fullWidth={fullWidth}
        className="bg-white"
        type={type}
        label={label}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    </ThemeProvider>
  );
};

export default TextFieldCustom;
