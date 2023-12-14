"use client"

import Table from '@/components/Table';
import { AppDispatch } from '@/store';
import { getTableById, selectTableDetail } from '@/store/apps/table';
import { localStorageClient } from '@/utils/localStorage';
import { Icon, IconButton, Stack } from '@mui/material';
import { GridColDef, GridRowSelectionModel, GridValueGetterParams } from '@mui/x-data-grid';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import moment from 'moment';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const DetailTable = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams();
    const router = useRouter()
    const tableDetail = useSelector(selectTableDetail);
    const token = localStorageClient.getItem("userToken");

    const [rowSelectionModel, setRowSelectionModel] =
    React.useState<GridRowSelectionModel>([]);
    const [value, setValue] = React.useState<Dayjs | null>(dayjs());
    const [listBooking, setListBooking] = useState<any[]>(tableDetail.bookings || [])

    useEffect(() => {
        dispatch(getTableById({id, token}));
      }, [dispatch, id]);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Order ID', width: 150, align: "center"},
        {
            field: 'fullName',
            headerName: 'Full Name',
            width: 200,
            editable: false,
            align: "center",

        },
        {
            field: 'email',
            headerName: 'Email',
            width: 200,
            editable: false,
            align: "center",

        },
        {
          field: 'phoneNumber',
          headerName: 'Phone Number',
          width: 200,
          editable: false,
          align: "center",

        },
        {
            field: 'numberOfPeople',
            headerName: 'Number Of People',
            width: 140,
            editable: false,
            align: "center",
  
          },
          {
            field: 'specialRequest',
            headerName: 'Special Request',
            width: 300,
            editable: false,
            align: "center",
  
          },
          {
            field: 'createdAt',
            headerName: 'Booking Date',
            minWidth: 188,
            editable: false,
            align: "center",
            valueGetter: (params: GridValueGetterParams<any, string>) => {
                return moment(params.value).format('YYYY-MM-DD HH:mm:ss');
              }
        },
      ];


    const handleChangeTime = (newValue: any) => {
        setValue(newValue)
        setListBooking(tableDetail.bookings.filter((booking) => moment((booking as any).createdAt).format("YYYY-MM-DD") === newValue.format("YYYY-MM-DD"))
      );
    }

  return (
    <div>
        <Stack direction={"row"} gap="30px" justifyContent={"space-between"}>
            <IconButton
            onClick={() => {
              router.back();
            }}
          >
            <ArrowBackIcon/>
          </IconButton>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                label="Booking Date"
                value={value}
                onChange={handleChangeTime}
                sx={{
                    "&": {
                        borderRadius: "10px",
                        "& .MuiOutlinedInput-root": { borderRadius: "10px",  backgroundColor: "#fff"},
                        "& .MuiInputLabel-outlined": {
                          position: "absolute",
                          top: "8px",
                          color: "rgba(0, 0, 0, 0.54) !important",
                          transition: "all 0.2s",
                        },
                        "& .MuiOutlinedInput-root:focus-within .MuiInputLabel-outlined": {
                          top: "0",
                        }
                      },
                }}
                />
         </LocalizationProvider>
      </Stack>
        <Table
            rows={listBooking}
            columns={columns}
            rowSelectionModel={rowSelectionModel}
            setRowSelectionModel={setRowSelectionModel}
            checkboxSelection={false}
        />
    </div>
  )
}

export default DetailTable
