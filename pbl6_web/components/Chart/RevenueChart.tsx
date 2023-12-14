import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SaleChart from './LineChart';
import { useDispatch, useSelector } from 'react-redux';
import { getListStaticProfit, selectProfits } from '@/store/apps/static';
import { AppDispatch } from '@/store';
import { localStorageClient } from '@/utils/localStorage';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

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
  

export default function RevenueChart() {
    const dispatch = useDispatch<AppDispatch>();
    const token = localStorageClient.getItem("userToken");
    const listProfit = useSelector(selectProfits)
    const [searchBy, setSearchBy] = useState("1");
    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);

    useEffect(() => {
        const todayFormatted: string = new Date().toISOString().split('T')[0];
        dispatch(getListStaticProfit({data: {
            Type: 1,
            Date: todayFormatted
        }, token}))
    }, [])

    useEffect(() => {
        if(searchBy !== ("2" || "3")){
            dispatch(getListStaticProfit({data: {
                Type: parseInt(searchBy)
            }, token}))
        }
    }, [searchBy])

    const handleChangeSelected = (event: SelectChangeEvent) => {
        setSearchBy(event.target.value as string);
      };

    const handleDateChange = (newDate: dayjs.Dayjs | null) => {
        setSelectedDate(newDate);
        if(searchBy !== ("2" || "3")){
            dispatch(getListStaticProfit({data: {
                Type: parseInt(searchBy)
            }, token}))
        } else {
            dispatch(getListStaticProfit({data: {
                Type: parseInt(searchBy),
                Date: searchBy === "2" ? newDate?.format("YYYY-MM-DD") :  newDate?.format("YYYY-MM-DD")
            }, token}))
        }
    };

  return (
    <Box 
        sx={{
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        minWidth: "620px"
      }}
    >
        <Box className="flex gap-4 mb-4">
            <FormControl className='w-[30%] bg-white'>
                <InputLabel id="demo-simple-select-label" sx={{top: "-5px"}}>Search by</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={searchBy}
                    label="SearchBy"
                    onChange={handleChangeSelected}
                    sx={{height: "40px"}}
                >
                    <MenuItem value={"0"}>Last 7 day</MenuItem>
                    <MenuItem value={"1"}>Current Month</MenuItem>
                    <MenuItem value={"2"}>Month</MenuItem>
                    <MenuItem value={"3"}>Year</MenuItem>
                </Select>
            </FormControl>
            {
                searchBy === "2" && (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                        label={'Month'}
                        openTo="month"
                        views={['month']}
                        value={selectedDate}
                        onChange={handleDateChange}
                    />
                    </LocalizationProvider>

                )
            }
            {
                searchBy === "3" && (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                        label={'Year'}
                        openTo="year"
                        views={['year']}
                        value={selectedDate}
                        onChange={handleDateChange}
                    />
                    </LocalizationProvider>

                )
            }
        </Box>
        <SaleChart data={listProfit}/>
    </Box>
  )
}
