import { IconButton, TextField } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

interface TextFieldProps {
  width?: string;
  value: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onClick?: () => void;
}

const TextFieldWithIcon = ({
  width,
  value,
  onChange,
  onClick,
}: TextFieldProps) => {
  return (
    <TextField
      id="standard-bare"
      variant="outlined"
      placeholder="Search"
      value={value}
      onChange={onChange}
      InputProps={{
        endAdornment: (
          <IconButton onClick={onClick}>
            <SearchIcon />
          </IconButton>
        ),
      }}
      sx={{
        "&": {
          width: width || "25%",
          "& .MuiInputBase-root": {
            backgroundColor: "#fff",
            height: "40px",
          },
        },
      }}
      onKeyDown={(e) => {
        e.key === "Enter" && onClick && onClick();
      }}
    />
  );
};

export default TextFieldWithIcon;
