"use client"

import { Box, Button, IconButton, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store';
import { getOrders } from '@/store/apps/order';
import { localStorageClient } from '@/utils/localStorage';
import { GridColDef, GridRowSelectionModel, GridValueGetterParams } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import Table from '@/components/Table';
import TextFieldWithIcon from '@/components/TextFieldWithIcon';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Order } from '@/types/order';
import moment from 'moment';
import { useRouter } from "next/navigation";
import { formatNumber } from '@/utils/parse.util';
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles({
    button: {
      color: "black",
      backgroundColor: "white",
      padding: "0.75rem 1.5rem",
      "&:hover": {
        backgroundColor: "white",
        color: "black",
      },
    },
  });


const OrderHistory = () => {
    const classes = useStyles();

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter()

    const { listOrder } = useSelector(
        (state: any) => state.order
      );
      const token = localStorageClient.getItem("userToken");
      const [rowSelectionModel, setRowSelectionModel] =
      React.useState<GridRowSelectionModel>([]);
      const [valueSearch, setValueSearch] = useState('')
      const [dateTimeFilter, setDateTimeFilter] = useState('')
      const [total, setTotal] = useState(0)


    useEffect(() => {
        if(valueSearch === ""){
            dispatch(getOrders({data: {}, token}))
        }
    }, [valueSearch])

    useEffect(() => {
        const total = listOrder.reduce((acc : number, item : Order) => acc + item.total, 0)
        setTotal(total)
    }, [listOrder])

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Order ID', width: 150, align: "center"},
        {
            field: 'orderTime',
            headerName: 'Date',
            width: 300,
            editable: false,
            align: "center",
            valueGetter: (params: GridValueGetterParams<Order, string>) => {
                return moment(params.value).format('YYYY-MM-DD HH:mm:ss');
              }

        },
        {
            field: 'tableName',
            headerName: 'Table',
            width: 200,
            editable: false,
            align: "center",

        },
        {
            field: 'orderStatus',
            headerName: 'Status',
            width: 200,
            editable: false,
            align: "center",
            renderCell: (params) => (
                <div style={{ 
                    padding: "8px",
                    borderRadius: "16px",
                    width: "80px",
                    textAlign: "center",
                    color: params.value === 0 ? "#000" : "#fff",
                    background: params.value === 0
                    ? "#ECF0F1"
                    : params.value === 1
                    ? "#FFC107"
                    : params.value === 2
                    ? "#FE724C"
                    : params.value === 3
                    ? "#28A745"
                    : "#DC3545"
                 }}>
                    {
                    params.value === 0
                        ? "Open"
                        : params.value === 1
                        ? "Progress"
                        : params.value === 2
                        ? "Payment"
                        : params.value === 3
                        ? "Done"
                        : "Cancel"
                    }
                </div>
              ),

        },
        {
          field: 'total',
          headerName: 'Amount',
          width: 200,
          editable: false,
          align: "center",
          valueFormatter: (params) => {
            return `${formatNumber(params.value)} (VND)`;
          },
        },
        {
          field: 'payment',
          headerName: 'Payment',
          width: 200,
          editable: false,
          align: "center",
          renderCell: (params) => (
            <div style={{ 
                padding: "8px",
                borderRadius: "16px",
                width: "80px",
                textAlign: "center",
                color: params.value === 0 ? "#000" : "#fff",
                background: params.value === 0
                ? "#56CA94"
                : "#538FCA"
             }}>
                {
                params.value === 0
                    ? "Cash"
                    : "Online"
                }
            </div>
          ),
        },
        {
        headerName: "Actions",
        headerAlign: "center",
        field: "actions",
        minWidth: 150,
        align: "center",
        flex: 1,
        sortable: false,
        renderCell: function render({ row }) {
            return (
                <Stack direction="row" spacing={1}>
                        <IconButton 
                            aria-label="show" 
                            style={{color: "#28A745"}} 
                            onClick={() => router.push(`orderhistory/${row.id}`)}

                        >
                            <VisibilityIcon />
                        </IconButton>
                </Stack>
            );
        }
        },
      ];

      const handleViewAll = () => {
        dispatch(getOrders({data: {}, token}))
      }

      const handleSearch = () => {
        dispatch(getOrders({
            data : {
                Search: valueSearch,
                searchBy: 1
            },
            token
        }))
    }
    return (
        <>
            <Box>
                <Box className="flex justify-between items-center">
                    <Box className="w-[50%] flex items-center gap-4">
                        <span>Table Name</span>
                        <TextFieldWithIcon 
                            width="30%"
                            value={valueSearch} 
                            onChange={(e) => setValueSearch(e.target.value)}
                            onClick={handleSearch}    
                        />
                    </Box>
                <Box className="flex gap-8">
                    <Button 
                        variant="contained"
                        onClick={handleViewAll}
                        className={classes.button}
                    >   
                        View All
                    </Button>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={dateTimeFilter || dayjs()}
                        onChange={(newValue) => {
                            const formattedDate: string = dayjs(newValue).format("MM-DD-YYYY HH:mm:ss");
                            setDateTimeFilter(formattedDate);
                            dispatch(getOrders({
                                data : {
                                    OrderTime: formattedDate,
                                },
                                token
                            }))
                        }}
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
                    <Box className="rounded-[15px] px-8 py-4 bg-[#FE724C] text-white text-center text-xl">
                        Total: {formatNumber(total)} (VND)
                    </Box>
                </Box>
                </Box>
                <Table
                    rows={listOrder}
                    columns={columns}
                    rowSelectionModel={rowSelectionModel}
                    setRowSelectionModel={setRowSelectionModel}
                    checkboxSelection={false}
                />
            </Box>
        </>
    )
}

export default OrderHistory