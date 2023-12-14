"use client";

import React, {useState, useEffect} from "react";
import Stack from "@mui/material/Stack";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box, Button, Typography, styled } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { getTotalStaticPayment, selectTotalCashPay, selectTotalOnlinePay } from "@/store/apps/static";
import { AppDispatch } from "@/store";

interface DateProps {
  startTime:  Dayjs | null;
  endTime: Dayjs | null;
}

interface DataProps {
  label: String, 
  value: number,
   color: String
}

const CustomButton = styled(Button)(() => ({
  "&": {
    color: "#FE724C",
    backgroundColor: "#fff !important",
    padding: "0.75rem",
    borderRadius: "10px",
    "&:hover": {
      color: "#fff",
      backgroundColor: "#EB5D37 !important",
    },
  },
}));
export default function PieChartWithPaddingAngle() {
  const dispatch = useDispatch<AppDispatch>();
  const totalOnlinePay = useSelector(selectTotalOnlinePay)
  const totalCashPay = useSelector(selectTotalCashPay)


  const [activeButton, setActiveButton] = React.useState("Last 7 days");
  const handleButtonClick = (buttonText: string) => {
    setActiveButton(buttonText);
  };
  const [state, setState] = useState<DateProps>({
    startTime: dayjs(),
    endTime: dayjs()
  })

  useEffect(() => {
    const fetchData = async () => {
      const todayFormatted: string = new Date().toISOString().split('T')[0];
      const res: any = await dispatch(getTotalStaticPayment({data: {
        StartDate: todayFormatted,
        EndDate: todayFormatted,
      }}))
    }

    fetchData()
  }, [])

  useEffect(() => {
    dispatch(getTotalStaticPayment({data: {
      StartDate: state.startTime?.format('YYYY-MM-DD'),
      EndDate: state.endTime?.format('YYYY-MM-DD')
    }}))
  }, [state])

  const data= [
    { label: "Online", value: totalOnlinePay || 0, color: "#D9D9D9" },
    { label: "Cash", value: totalCashPay || 0, color: "#FE724C" },
  ];

  console.log(state)

  return (
    <Stack
      sx={{
        backgroundColor: "#fff",
        alignItems: "center",
        padding: "20px",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      }}
    >
      <Typography sx={{ fontSize: "20px", color: "black", fontWeight: "bold", marginBottom: "16px" }}>
        PAYMENTS
      </Typography>
      <Stack direction="row" sx={{ margin: "10px", gap: "16px" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{
                  "&": {
                    borderRadius: "5px",
                    "& .MuiOutlinedInput-root": {
                      height: "40px",
                      borderRadius: "5px",
                      backgroundColor: "#fff",
                    },
                    "& .MuiInputLabel-outlined": {
                      position: "absolute",
                      top: "-5px",
                      color: "rgba(0, 0, 0, 0.54) !important",
                      transition: "all 0.2s",
                    },
                    "& .MuiOutlinedInput-root:focus-within .MuiInputLabel-outlined":
                      {
                        top: "0",
                      },
                  },
                }}
                label="Start Date"
                value={state.startTime}
                onChange={(newValue: Dayjs | null) =>
                  setState((prevValue) => ({ ...prevValue, startTime: newValue }))
                }
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{
                  "&": {
                    borderRadius: "5px",
                    "& .MuiOutlinedInput-root": {
                      height: "40px",
                      borderRadius: "5px",
                      backgroundColor: "#fff",
                    },
                    "& .MuiInputLabel-outlined": {
                      position: "absolute",
                      top: "-5px",
                      color: "rgba(0, 0, 0, 0.54) !important",
                      transition: "all 0.2s",
                    },
                    "& .MuiOutlinedInput-root:focus-within .MuiInputLabel-outlined":
                      {
                        top: "0",
                      },
                  },
                }}
                label="End Date"
                value={state.endTime}
                onChange={(newValue: Dayjs | null) =>
                  setState((prevValue: any) => ({ ...prevValue, endTime: newValue }))
                }
              />
            </LocalizationProvider>
      </Stack>
      <Stack
        direction="row"
        sx={{ width: "100%", justifyContent: "center", alignItems: "center" }}
      >
        <Stack direction="column" sx={{ gap: "20px" }}>
          <Box>
            <Stack
              direction="row"
              sx={{
                gap: "10px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "#D9D9D9",
                }}
              ></div>
              <span style={{ fontSize: "20px" }}>Online</span>
            </Stack>
            <span style={{ fontSize: "18px", marginLeft: "30px" }}>{totalOnlinePay || 0}</span>
          </Box>
          <Box>
            <Stack
              direction="row"
              sx={{
                gap: "10px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "#FE724C",
                }}
              ></div>
              <span style={{ fontSize: "20px" }}>Cash</span>
            </Stack>
            <span style={{ fontSize: "18px", marginLeft: "30px" }}>{totalCashPay || 0}</span>
          </Box>
        </Stack>
        <PieChart
          series={[
            {
              paddingAngle: 5,
              innerRadius: 55,
              outerRadius: 80,
              data,
            },
          ]}
          margin={{ right: 5 }}
          width={200}
          height={200}
          legend={{ hidden: true }}
        />
      </Stack>
    </Stack>
  );
}
