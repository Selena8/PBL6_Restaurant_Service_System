import React, { Dispatch, SetStateAction, useState } from 'react'
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/Themes/CustomTheme";
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { getFreeTimes } from "@/store/apps/booking/api/booking";
import { FormValues } from "@/types/form";

interface DateTimePickerProps {
  value: any;
  setOrderInfo: Dispatch<SetStateAction<FormValues>>
}

const CustomDatePicker = styled(DatePicker)(({ theme }) => ({
    color: theme.palette.primary.main,
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
          color: theme.palette.primary.main,
        },
      },
}));

const CustomTimePicker = styled(TimePicker)(({ theme }) => ({
  color: theme.palette.primary.main,
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
        color: theme.palette.primary.main,
      }
    },
}));

const DateTimePickerCustom = ({ value, setOrderInfo }: DateTimePickerProps) => {
  const [ dateProp, timeProp ] = value.split('T')
  
  const [freeTime, setFreeTime] = useState<any>([])
  const [date, setDate] = useState<string>('')
  
  const handleDateChange = async (data: any) => {
    const res = await getFreeTimes(data.format("YYYY/MM/DD"))
    const times = res.map((time: any) => time.startTime)
    setFreeTime(times)
    setDate(data.format("YYYY-MM-DD"))
  }

  const handleTimeChange = (time: any) => {
    const hour = time?.format('HH:mm');
    const data = date+"T"+hour
    setOrderInfo((prevOrderInfo) => ({
      ...prevOrderInfo,
      orderDate: data,
    }));
  }

  const shouldDisableTime = (time: any) => {
    const hours = time.format('HH:mm');

    if (!freeTime.includes(hours)) {
      return true;
    }

    return false;
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CustomDatePicker
          className="bg-white"
          label="Date"
          onChange={handleDateChange}
          value={dayjs(dateProp, "YYYY/MM/DD") || dayjs()}
          minDate={dayjs().startOf('day')}
        />
        <CustomTimePicker
          className="bg-white"
          label="Time"
          ampm={false}
          onChange={handleTimeChange}
          value={dayjs(timeProp, "HH:mm") || dayjs()}
          format="HH:mm"
          views={['hours']}
          shouldDisableTime={shouldDisableTime}
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default DateTimePickerCustom;
