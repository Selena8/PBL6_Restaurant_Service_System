import React, { useState } from "react";
import {
  Alert,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
} from "@mui/material";
import TextFieldCustom from "@/components/TextField";
import DateTimePickerCustom from "@/components/DateTimePicker";
import {
  unValidEmail,
  unValidNumberField,
  unValidPhoneNumber,
  unValidTextField,
} from "@/utils/parse.util";
import dayjs from "dayjs";
import { makeStyles } from "@material-ui/core/styles";
import { FormValues } from "@/types/form";
import { booking, checkAvailable } from "@/store/apps/booking/api/booking";
import LoadingButton from "@mui/lab/LoadingButton";

const useStyles = makeStyles({
  button: {
    color: "white",
    backgroundColor: "#FE724C",
    padding: "0.75rem",
    "&:hover": {
      backgroundColor: "#EB5D37",
    },
  },
});

const FormBooking = () => {
  const classes = useStyles();
  const [isOpenSuccessFull, setIsOpenSuccessFull] = useState(false);
  const [message, setMessage] = useState("");
  const [err, setErr] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [orderInfo, setOrderInfo] = useState<FormValues>({
    fullName: "",
    email: "",
    orderDate:
      dayjs().format("YYYY-MM-DD") +
      "T" +
      dayjs().hour(8).minute(0).format("HH:mm"),
    numberOfPeople: null,
    phoneNumber: "",
    specialRequest: "",
  });

  const validateInputs = async (orderInfo: FormValues) => {
    const { fullName, email, numberOfPeople, phoneNumber, orderDate } =
      orderInfo;

    const response = await checkAvailable({ startTime: orderDate });

    if (!response) {
      return "Invalid date time";
    }

    if (unValidTextField(fullName)) {
      return "Invalid name";
    }

    if (unValidEmail(email)) {
      return "Invalid email";
    }

    if (numberOfPeople === null) {
      return "Invalid number of people";
    }

    if (unValidPhoneNumber(phoneNumber)) {
      return "Invalid phone number";
    }

    return "";
  };
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setOrderInfo((prevOrderInfo: any) => ({
      ...prevOrderInfo,
      [name]: value,
    }));
  };
  const handleChangeSelectedAdd = (event: SelectChangeEvent) => {
    setOrderInfo((prev: any) => ({
      ...prev,
      numberOfPeople: parseInt(event.target.value),
    }));
  };
  const handleSubmit = async () => {
    const validationError: string = await validateInputs(orderInfo);
    if (validationError === "") {
      setErr("");
      setLoading(true);
      const response = await booking(orderInfo);
      if (Object.keys(response).length !== 0) {
        setLoading(false);
        setMessage("Booking successfully");
        setIsOpenSuccessFull(true);
        setOrderInfo({
          fullName: "",
          email: "",
          orderDate:
            dayjs().format("YYYY-MM-DD") +
            "T" +
            dayjs().hour(8).minute(0).format("HH:mm"),
          numberOfPeople: null,
          phoneNumber: "",
          specialRequest: "",
        });
      } else {
        setLoading(true);
        const errData = await response.json();
        setMessage(errData.message);
        setIsOpenSuccessFull(true);
      }
    }
    setErr(validationError);
  };
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setIsOpenSuccessFull(false);
  };
  return (
    <FormControl className="grid grid-cols-1 gap-6 mt-8 relative">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <TextFieldCustom
          type="text"
          label="Your Name"
          name="fullName"
          value={orderInfo?.fullName}
          onChange={handleTextChange}
        />
        <TextFieldCustom
          type="email"
          label="Your Email"
          name="email"
          value={orderInfo?.email}
          onChange={handleTextChange}
        />
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <TextFieldCustom
          type="text"
          label="Phone number"
          name="phoneNumber"
          value={orderInfo?.phoneNumber}
          onChange={handleTextChange}
        />
        <FormControl
          className="bg-white"
          fullWidth
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
              },
              "& .MuiInputBase-root": {
                "&.MuiOutlinedInput-root": {
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#EB5D37",
                  },
                },
              },
            },
          }}
        >
          <InputLabel id="demo-simple-select-label" sx={{ top: "6px" }}>
            Number of people
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={
              orderInfo?.numberOfPeople !== null
                ? orderInfo?.numberOfPeople.toString()
                : ""
            }
            label="Number of people"
            onChange={handleChangeSelectedAdd}
          >
            <MenuItem value={2}>2 people</MenuItem>
            <MenuItem value={4}>4 people</MenuItem>
            <MenuItem value={6}>6 people</MenuItem>
            <MenuItem value={8}>8 people</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <DateTimePickerCustom
          setOrderInfo={setOrderInfo}
          value={orderInfo?.orderDate}
        />
      </div>
      <div className="grid grid-cols-1">
        <TextFieldCustom
          type="text"
          label="Special Request"
          name="specialRequest"
          value={orderInfo?.specialRequest}
          onChange={handleTextChange}
        />
      </div>
      {err !== "" && <span className="ml-[10px] text-[red]">{err}</span>}
      <div className="grid grid-cols-1">
        {!loading ? (
          <Button className={classes.button} onClick={handleSubmit}>
            BOOK NOW
          </Button>
        ) : (
          <LoadingButton
            className={classes.button}
            loading={loading}
            variant="outlined"
          >
            <span>BOOK NOW</span>
          </LoadingButton>
        )}
      </div>
      <Snackbar
        open={isOpenSuccessFull}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        style={{ top: "64px" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </FormControl>
  );
};

export default FormBooking;
