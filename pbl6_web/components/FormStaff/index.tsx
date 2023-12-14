"use client";
import React, { useEffect, useReducer, useState } from "react";
import {
  Stack,
  Box,
  Button,
  Radio,
  FormControlLabel,
  Grid,
  Skeleton,
  styled,
  FormControl,
  RadioGroup,
  Snackbar,
  Alert,
  MenuItem,
  IconButton,
  Typography,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Icon } from "@iconify/react";
import { Label, StyledInput } from "@/components/InputForm";
import { useRouter } from "next/navigation";
import { makeStyles } from "@material-ui/core/styles";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { addStaff, updateIsEdit, updateStaff } from "@/store/apps/staff";
import { capitalize, showMessage, unValidEmail, unValidTextField } from "@/utils/parse.util";
import { localStorageClient } from "@/utils/localStorage";
import SaveIcon from '@mui/icons-material/Save';

const Img = styled("img")(({ theme }) => ({
  width: "400px",
  height: "300px",
}));

const useStyles = makeStyles(() => ({
  input: {
    width: "100%",
    fontFamily: "IBM Plex Sans, sans-serif",
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: 1.5,
    padding: "8px 12px",
    borderRadius: "8px",
    color: "#C7D0DD",
    background: "#fff",
    border: "1px solid #DAE2ED",
    boxShadow: "0px 2px 2px #F3F6F9",
    "&:hover": {
      borderColor: "#3399FF",
    },
    "&:focus": {
      outline: 0,
      borderColor: "#3399FF",
      boxShadow: "0 0 0 3px #3399FF",
    },
  },
  button: {
    textTransform: "uppercase",
    width: "150px",
  },
  closeButton: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#FF4D49",
    "&:hover": {
      backgroundColor: "#FF4D49",
    },
  },
  saveButton: {
    background: "#64C623",
    "&:hover": {
      background: "#64C623",
    },
  },
  addButton: {
    background: "#289345",
    "&:hover": {
      background: "#289345",
    },
  }
}));

const FormStaff = (props: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAdd, isEdit, id, staffDetail } = props;
  const token = localStorageClient.getItem("userToken");
  const { error } = useSelector(
    (state: any) => state.staff
  );
  const classes = useStyles();
  const router = useRouter();
  const [state, setState] = useReducer(
    (prevState: any, newState: any) => ({
      ...prevState,
      ...newState,
    }),
    {
      ...staffDetail,
      dayOfBirth: moment(staffDetail.dayOfBirth).format("YYYY-MM-DD"),
      errDayOfBirth: "",
      errGender: "",
      errPhoneNumber: "",
      errAddress: "",
      errFirstName: "",
      errLastName: "",
      errUserType: "",
    }
  );


  const {
    email,
    dayOfBirth,
    gender,
    phoneNumber,
    address,
    avatar,
    firstName,
    lastName,
    userType,
    accountStatus,
    errEmail,
    errDayOfBirth,
    errPhoneNumber,
    errAddress,
    errFirstName,
    errLastName,
  } = state;

  console.log({accountStatus, userType})

  const validateInput = () => {
    const errorState: { [key: string]: string } = {};
    if (unValidTextField(firstName || "")) {
      errorState.errFirstName = "First Name is not valid";
    }
    if (unValidTextField(lastName || "")) {
      errorState.errLastName = "Last Name is not valid";
    }
    if (unValidEmail(email)) {
      errorState.errorEmail = "Email is not valid";
    }
    setState(errorState);
    if (
      !unValidTextField(firstName || "") &&
      !unValidTextField(lastName || "") && 
      !unValidEmail(email)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleChangeValue = (e: any) => {
    const { name, value } = e.target;
    setState({ 
      [name]: value,
      [`err${capitalize(name)}`]: "",
     });
  };

  const handleClick = async () => {
    const isValid = validateInput()
    let err = null
    if(isValid){
      const dataUpdate = {
        "id": staffDetail.id,
        "dayOfBirth": moment(dayOfBirth).format("YYYY-MM-DD"),
        "gender": parseInt(gender),
        "email": email,
        "phoneNumber": phoneNumber,
        "avatar": avatar,
        "firstName": firstName,
        "lastName": lastName,
        "address": address,
        "accountStatus": parseInt(accountStatus),
        "userType": userType
      }
      const dataAdd = {
        "dayOfBirth": moment(dayOfBirth).format("YYYY-MM-DD"),
        "gender": parseInt(gender),
        "email": email,
        "phoneNumber": phoneNumber,
        "firstName": firstName,
        "lastName": lastName,
        "address": address,
        "userType": userType || 1
      }
      if(isAdd){
        const res: any = await dispatch(addStaff({data: dataAdd, token}))
        err = res?.error?.message
      } else {
        const res: any = await dispatch(updateStaff({data: dataUpdate, token}))
        err = res?.error?.message
      }
      if(!err){
        if(isAdd){
          showMessage("Add user is successful", true)
          router.push('/admin/users')
        } else {
          showMessage("Update user is successful", true)
        }
      }else {
        showMessage(err, false)
      }
    }
  }
  return (
    <Box sx={{ display: "flex", gap: "20px", flexDirection: "column" }}>
      <Stack direction={"row"} gap="30px" justifyContent={"space-between"}>
        <Box className="flex items-center gap-4">
          <IconButton
            onClick={() => {
              router.back();
              isEdit && dispatch(updateIsEdit(false))
            }}
          >
            <Icon icon={"majesticons:arrow-left"} />
          </IconButton>
          <Typography variant="h5">
            {isAdd ? "ADD USER" : isEdit ? "EDIT USER" : "DETAIL USER"}
          </Typography>
        </Box>
        {
          (isAdd || isEdit) && (
            <Button
              variant="contained"
              className={`${classes.button} ${classes.saveButton}`}
              startIcon={<SaveIcon/>}
              onClick={handleClick}
            >
              save
            </Button>
          )
        }
      </Stack>
      <Grid container spacing={2} className="w-full m-0 h-[600px]">
        <Grid item xs={(isAdd || isEdit) ? 12 : 8} className="bg-white flex justify-center">
          <FormControl
            defaultValue=""
            required
            fullWidth
            className="h-full p-[40px] justify-center"
          >
            <Grid container spacing={2} className="gap-4">
              <Grid item xs={12} className="flex flex-col">
                <Grid container spacing={2} className="justify-between">
                  <Grid item xs={5}>
                    <Label>First name</Label>
                    <StyledInput
                      placeholder="First name"
                      name="firstName"
                      value={firstName}
                      onChange={handleChangeValue}
                      readOnly={!(isEdit || isAdd)}
                    />
                    {errFirstName && (
                      <p className="ml-[15px] my-[8px] text-[red] h-8">
                        {errFirstName}
                      </p>
                    )}
                  </Grid>
                  <Grid item xs={5} sx={{ position: "relative" }}>
                    <Label>Last name</Label>
                    <StyledInput
                      placeholder="Last name"
                      name="lastName"
                      value={lastName}
                      onChange={handleChangeValue}
                      readOnly={!(isEdit || isAdd)}
                    />
                    {errLastName && (
                      <p className="ml-[15px] my-[8px] text-[red] h-8">
                        {errLastName}
                      </p>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} className="flex flex-col">
                <Grid container spacing={2} className="justify-between">
                  <Grid item xs={5} sx={{ position: "relative" }}>
                    <Label>Email</Label>
                    <StyledInput
                      placeholder="Email"
                      name="email"
                      value={email}
                      onChange={handleChangeValue}
                      readOnly={!(isEdit || isAdd)}
                    />
                    {errEmail && (
                      <p className="ml-[15px] my-[8px] text-[red] h-8">
                        {errEmail}
                      </p>
                    )}
                  </Grid>
                  <Grid item xs={5}>
                    <Label>Phone number</Label>
                    <StyledInput
                      placeholder="Phone number"
                      name="phoneNumber"
                      value={phoneNumber}
                      onChange={handleChangeValue}
                      readOnly={!(isEdit || isAdd)}
                    />
                    {errPhoneNumber && (
                      <p className="ml-[15px] my-[8px] text-[red] h-8">
                        {errPhoneNumber}
                      </p>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} className="flex flex-col">
                <Grid container spacing={2} className="justify-between">
                  <Grid item xs={5} className="flex !flex-col">
                    <Label>Address</Label>
                    <StyledInput
                      placeholder="Address"
                      name="address"
                      value={address}
                      onChange={handleChangeValue}
                      readOnly={!(isEdit || isAdd)}
                    />
                    {errAddress && (
                      <p className="ml-[15px] my-[8px] text-[red] h-8">
                        {errAddress}
                      </p>
                    )}
                  </Grid>
                  <Grid item xs={5}>
                    <Label>Gender</Label>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      className="flex gap-4"
                      value={gender}
                      onChange={(e) => {
                        setState({ gender: e.target.value });
                      }}
                    >
                      <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label="Female"
                        className="mr-0"
                        disabled={!(isEdit || isAdd)}
                      />
                      <FormControlLabel
                        value={0}
                        control={<Radio />}
                        label="Male"
                        className="mr-0"
                        disabled={!(isEdit || isAdd)}
                      />
                    </RadioGroup>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} className="flex flex-col">
                <Grid container spacing={2} className="justify-between">
                  <Grid item xs={5} sx={{ position: "relative" }}>
                    <Label>Day of birth</Label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        sx={{ width: "100% " }}
                        value={dayjs(dayOfBirth) || dayjs()}
                        onChange={(newValue) => {
                          const formattedDate =
                            dayjs(newValue).format("YYYY-MM-DD");
                          setState({ dayOfBirth: formattedDate });
                        }}
                        readOnly={!(isEdit || isAdd)}
                      />
                    </LocalizationProvider>
                    {errDayOfBirth && (
                      <p className="ml-[15px] my-[8px] text-[red] h-8">
                        {errDayOfBirth}
                      </p>
                    )}
                  </Grid>
                  <Grid item xs={5}>
                    <Label>User type</Label>
                    <FormControl fullWidth>
                      <Select
                        name="userType"
                        value={userType || 1}
                        onChange={(
                          event: SelectChangeEvent<{ value: unknown }>
                        ) => {
                          setState({
                            ...state,
                            userType: event.target.value as string,
                          });
                        }}
                        readOnly={!(isEdit || isAdd)}
                      >
                        <MenuItem value='1'>Admin</MenuItem>
                        <MenuItem value='2'>Staff</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              {
                isEdit && (
                  <Grid item xs={5} sx={{ position: "relative" }}>
                    <Label>Account Status</Label>
                    <FormControl fullWidth>
                      <Select
                        name="accountStatus"
                        value={accountStatus || 0}
                        onChange={(
                          event: SelectChangeEvent<{ value: unknown }>
                        ) => {
                          setState({
                            ...state,
                            accountStatus: event.target.value as string,
                          });
                        }}
                        readOnly={!(isEdit || isAdd)}
                      >
                        <MenuItem value='0'>No Active</MenuItem>
                        <MenuItem value='1'>Active</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                )
              }
            </Grid>
          </FormControl>
        </Grid>
        {
          !(isEdit || isAdd) && (
            <Grid item xs={4} className="bg-white !pt-[100px] !pb-5 !px-[16px]">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
              }}
            >
              {false ? (
                <Skeleton variant="rounded" width={120} height={120} />
              ) : (
                <Img
                  alt="avatar"
                  src={
                    avatar ||
                    "/assets/images/no-photo-available.png"
                  }
                  sx={{
                    width: "300px",
                    height: "300px"
                  }}
                />
              )}
            </Box>
          </Grid>
          )
        }
      </Grid>
    </Box>
  );
};

export default FormStaff;
