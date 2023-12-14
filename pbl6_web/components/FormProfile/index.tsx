"use client";
import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Snackbar,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useReducer, useRef, useState } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { StyledInput, HelperText, Label } from "@/components/InputForm";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { capitalize, unValidEmail, unValidTextField } from "@/utils/parse.util";
import dayjs from "dayjs";
import moment from "moment";
import { Provider, useDispatch, useSelector } from "react-redux";
import { AppDispatch, store } from "@/store";
import { userUpdate, getUserDetail, updateAvatarUser } from "@/store/apps/auth";
import { localStorageClient } from "@/utils/localStorage";
import TabPanel from "@mui/lab/TabPanel/TabPanel";
import HomeIcon from "@mui/icons-material/Home";
import LockResetIcon from "@mui/icons-material/LockReset";
import TabContext from "@mui/lab/TabContext/TabContext";
import FormChangePassword from "../FormChangePassword";
const FormData = require("form-data");

const FormProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = localStorageClient.getItem("userToken");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState(new FormData());
  const [isUploadImage, setIsUploadImage] = useState(false);
  const [valueTab, setValueTab] = React.useState(0);

  const { userInfo } = useSelector((state: any) => state.auth);

  // useReducer
  const [state, setState] = useReducer(
    (prevState: any, newState: any) => ({
      ...prevState,
      ...newState,
    }),
    {
      ...userInfo,
      dayOfBirth: moment(userInfo.dayOfBirth).format("YYYY-MM-DD"),
      errFirstName: "",
      errLastName: "",
      errorEmail: "",
      errorPhone: "",
    }
  );

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    dayOfBirth,
    gender,
    errFirstName,
    errLastName,
    errorEmail,
    errorPhone,
  } = state;

  useEffect(() => {
    if (token) {
      dispatch(getUserDetail({ token }));
    }
  }, []);


  useEffect(() => {
    setImageUrl(userInfo.avatar);
    setState({
      ...userInfo,
      dayOfBirth: moment(userInfo.dayOfBirth).format("YYYY-MM-DD"),
      errFirstName: "",
      errLastName: "",
      errorEmail: "",
      errorPhone: "",
    });
  }, [userInfo]);

  useEffect(() => {
    if (isUploadImage) {
      dispatch(updateAvatarUser({ formData, token }));
      setIsUploadImage(false);
    }
  }, [formData]);

  const handleFileUpload = (event: any) => {
    setIsUploadImage(true);
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === "string" || result === null) {
          setImageUrl(result);
        }
        if (typeof file === "undefined") return;
        const newFormData = new FormData();
        newFormData.append("avatar", file);
        setFormData(newFormData);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSuccess(false);
  };

  // function
  const validateInput = () => {
    const errorState: { [key: string]: string } = {};
    if (unValidTextField(firstName)) {
      errorState.errFirstName = "First Name is not valid";
    }
    if (unValidTextField(lastName)) {
      errorState.errLastName = "Last Name is not valid";
    }
    if (unValidEmail(email)) {
      errorState.errorEmail = "Email is not valid";
    }
    // if(!validatePhoneNumber(phoneNumber)){
    //   errorState.errorPhone = 'Phone is not valid';
    // }
    setState(errorState);
    if (
      !unValidTextField(firstName) &&
      !unValidTextField(lastName) &&
      !unValidEmail(email)
    ) {
      setIsSuccess(true);
      return true;
    } else {
      setIsSuccess(false);
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

  const handleDisCard = () => {
    setState({ ...state, ...userInfo });
  };

  const handleSaveChange = () => {
    const isValid = validateInput();
    if (isValid) {
      const user = {
        displayName: firstName + " " + lastName,
        firstName: firstName,
        lastName: lastName,
        dayOfBirth: moment(dayOfBirth).format("YYYY-MM-DD") || dayjs(),
        phoneNumber: phoneNumber,
        address: userInfo.address,
        gender: gender,
      };
      setState({
        ...state,
        ...user,
        dayOfBirth: moment(dayOfBirth).format("YYYY-MM-DD"),
      });
      if (token) {
        dispatch(userUpdate({ user, token }));
      }
    }
  };

  const handleChangeValueTab = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setValueTab(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }

  return (
    <Provider store={store}>
      <Grid
        container
        spacing={2}
        sx={{ height: "60%", padding: "32px", justifyContent: "space-around" }}
      >
        <TabContext value={valueTab.toString()}>
          <Grid
            item
            xs={3}
            sx={{
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              paddingLeft: "0 !important",
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{
                position: "relative",
                width: "200px",
                height: "200px",
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <label
                htmlFor="upload-image"
                className="cursor-pointer absolute bottom-0 right-8"
              >
                <CameraAltIcon />
                <input
                  id="upload-image"
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleFileUpload}
                />
              </label>
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Uploaded Image"
                  className="w-full h-full rounded-full object-cover ml-0"
                />
              ) : (
                <img
                  src="/assets/images/user-1.jpg"
                  alt="Uploaded Image"
                  className="w-full h-full rounded-full object-cover ml-0"
                />
              )}
              <Typography variant="h5">{`${firstName || ""} ${
                lastName || ""
              }`}</Typography>
            </Stack>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={valueTab.toString()}
              onChange={handleChangeValueTab}
              aria-label="Vertical tabs example"
              TabIndicatorProps={{
                style: { display: "none" },
              }}
              sx={{
                margin: "64px 0 0 0",
                "& .MuiTab-root": {
                  display: "flex",
                  gap: "16px",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  minHeight: "50px",
                },
                "&.MuiTab-iconWrapper": {
                  margin: 0,
                },
                "& button.Mui-selected": {
                  color: "#FE724C",
                },
              }}
            >
              <Tab
                label="Overview"
                value="0"
                icon={<HomeIcon />}
                {...a11yProps(0)}
              />
              <Tab
                label="Change Password"
                value="1"
                icon={<LockResetIcon />}
                {...a11yProps(1)}
              />
            </Tabs>
          </Grid>
          <Grid
            item
            xs={8}
            sx={{
              backgroundColor: "white",
              padding: "16px 32px !important",
            }}
          >
            <TabPanel value="0" sx={{padding: "0px"}}>
              <FormControl
                defaultValue=""
                required
                fullWidth
                sx={{ justifyContent: "center", height: "100%" }}
              >
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={6}
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    <Box>
                      <Label>First Name</Label>
                      <StyledInput
                        placeholder="Your first name"
                        name="firstName"
                        value={firstName}
                        onChange={handleChangeValue}
                      />
                      <p className="ml-[15px] my-[8px] text-[red] h-8">
                        {errFirstName}
                      </p>
                    </Box>
                    <Box>
                      <Label>Email</Label>
                      <StyledInput
                        placeholder="Your email"
                        name="email"
                        value={email}
                        onChange={handleChangeValue}
                        readOnly
                      />
                      <p className="ml-[15px] my-[8px] text-[red] h-8">
                        {errorEmail}
                      </p>
                    </Box>
                    <Box>
                      <Label>Date of birth</Label>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          sx={{ width: "100% " }}
                          value={dayjs(dayOfBirth) || dayjs()}
                          onChange={(newValue) => {
                            const formattedDate =
                              dayjs(newValue).format("YYYY-MM-DD");
                            setState({ dayOfBirth: formattedDate });
                          }}
                          minDate={dayjs().startOf('day')}
                        />
                      </LocalizationProvider>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    <Box>
                      <Label>Last Name</Label>
                      <StyledInput
                        placeholder="Your last name"
                        name="lastName"
                        value={lastName}
                        onChange={handleChangeValue}
                      />
                      <p className="ml-[15px] my-[8px] text-[red] h-8">
                        {errLastName}
                      </p>
                    </Box>
                    <Box>
                      <Label>Phone number</Label>
                      <StyledInput
                        placeholder="Your phone number"
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={handleChangeValue}
                      />
                      <p className="ml-[15px] my-[8px] text-[red] h-8">
                        {errorPhone}
                      </p>
                    </Box>
                    <Box>
                      <Label>Gender</Label>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        className="h-full flex gap-4"
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
                        />
                        <FormControlLabel
                          value={0}
                          control={<Radio />}
                          label="Male"
                          className="mr-0"
                        />
                        <FormControlLabel
                          value={2}
                          control={<Radio />}
                          label="Other"
                        />
                      </RadioGroup>
                    </Box>
                  </Grid>
                </Grid>
                <Box className="w-full flex justify-center mt-8 gap-12">
                  <Button
                    variant="outlined"
                    sx={{
                      color: "#FE724C",
                      borderColor: "#FE724C",
                      ":hover": {
                        borderColor: "#FE724C",
                        backgroundColor: "rgba(254, 114, 76, 0.04)",
                      },
                    }}
                    onClick={handleDisCard}
                  >
                    Discard changes
                  </Button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#FE724C", color: "white" }}
                    onClick={handleSaveChange}
                  >
                    Save changes
                  </Button>
                </Box>
              </FormControl>
            </TabPanel>
            <TabPanel value="1" sx={{padding: "0px"}}>
              <FormChangePassword/>
            </TabPanel>
          </Grid>
        </TabContext>
        <Snackbar
          open={isSuccess}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          style={{ top: "64px" }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Update successful!
          </Alert>
        </Snackbar>
      </Grid>
    </Provider>
  );
};

export default FormProfile;
