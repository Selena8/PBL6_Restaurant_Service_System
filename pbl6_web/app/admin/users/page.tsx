"use client"

import { Alert, Box, Collapse, FormControl, FormControlLabel, IconButton, InputLabel, List, ListItemButton, ListItemIcon, ListItemText, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, Snackbar, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ButtonWithIcon from '@/components/ButtonWithIcon';
import TextFieldWithIcon from '@/components/TextFieldWithIcon';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Table from '@/components/Table';
import { useDispatch, useSelector } from 'react-redux';
import { deleteStaffs, getStaffs, updateIsEdit } from '@/store/apps/staff';
import { AppDispatch } from '@/store';
import { useRouter } from "next/navigation";
import { updateIdsDelete } from '@/store/apps/staff';
import { localStorageClient } from '@/utils/localStorage';
import ConfirmDelete from '@/components/ConfirmDelete';
import { showMessage } from '@/utils/parse.util';

const Staff = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter()

    const { listStaff, error } = useSelector(
        (state: any) => state.staff
      );
    const token = localStorageClient.getItem("userToken");

    const [rowSelectionModel, setRowSelectionModel] =
    React.useState<GridRowSelectionModel>([]);
    const [searchBy, setSearchBy] = useState('');
    const [valueSearch, setValueSearch] = useState('')
    const [isDisableDelete, setIsDisableDelete] = useState(true)
    const [confirmDialog, setConfirmDialog] = useState(false)
    const [idDel, setIdDel] = useState(null)

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90, align: "center"},
        {
            field: 'firstName',
            headerName: 'First Name',
            width: 130,
            editable: false,
            align: "center",

        },
        {
            field: 'lastName',
            headerName: 'Last Name',
            width: 130,
            editable: false,
            align: "center",

        },
        {
          field: 'email',
          headerName: 'Email',
          width: 300,
          editable: false,
          align: "center",

        },
        {
          field: 'phoneNumber',
          headerName: 'Phone Number',
          width: 170,
          editable: false,
          align: "center"
        },
        {
          field: 'userType',
          headerName: 'User Type',
          width: 170,
          editable: false,
          align: "center",
          renderCell: (params) => (
            <div style={{ 
                padding: "8px",
                borderRadius: "16px",
                width: "80px",
                textAlign: "center",
                color: "#fff",
                background: params.value === 1 ? "#538FCA" : "#FFC107"
             }}>
              {params.value === 1 ? "Admin" : "Staff"}
            </div>
          ),
        },
        {
            field: 'accountStatus',
            headerName: 'Account Status',
            width: 170,
            editable: false,
            align: "center",
            renderCell: (params) => (
                <div style={{ 
                    padding: "8px",
                    borderRadius: "16px",
                    width: "80px",
                    textAlign: "center",
                    color: params.value === 0 ? "#000" : "#fff",
                    background: params.value === 0 ? "#ECF0F1" : "#56CA94"
                 }}>
                  {params.value === 0 ? "No Active" : "Active"}
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
                            onClick={() => router.push(`users/${row.id}`)}
                        >
                            <VisibilityIcon />
                        </IconButton>
                        <IconButton 
                            aria-label="edit" 
                            style={{color: "#FFC107"}}
                            onClick={() => {
                                router.push(`users/${row.id}`)
                                dispatch(updateIsEdit(true))
                            }}
                        >
                            <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete" style={{color: "#F44336"}} onClick={(e) => {
                            e.stopPropagation()
                            setIdDel(row.id)
                            dispatch(updateIdsDelete([row.id]));
                            setConfirmDialog(true)
                        }}>
                            <DeleteIcon />
                        </IconButton>

                </Stack>
            );
        }
        },
      ];

    useEffect(() => {
        if(valueSearch === "" || searchBy === "All"){
            dispatch(getStaffs({data: {}, token}))
        }
    }, [valueSearch])

    useEffect(() => {
        if(rowSelectionModel.length === 0){
          setIsDisableDelete(true)
        } else {
          setIsDisableDelete(false)
        }
        dispatch(updateIdsDelete(rowSelectionModel));
      }, [rowSelectionModel])

    const handleChangeSelected = (event: SelectChangeEvent) => {
        setSearchBy(event.target.value as string);
        setValueSearch('')
      };

    const handleSearch = () => {
        dispatch(getStaffs({
            data : {
                Search: valueSearch,
                searchBy: searchBy
            },
            token
        }))
    }

    const handleDelete = async (e: any) => {
        e.stopPropagation()
        let err = null
        if(idDel){
            const res:any = await dispatch(deleteStaffs({ids: [idDel], token}))
            err = res?.error?.message
        }
        else {
            const res:any = await dispatch(deleteStaffs({ids: rowSelectionModel, token}))
            err = res?.error?.message
        }
        if(err){
          showMessage(err, false)
          setConfirmDialog(false)
        } else {
            showMessage("Delete user is successful", true)
            setConfirmDialog(false)
            setIdDel(null)
        }
      }

      const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = (event.target as HTMLInputElement).value
        setValueSearch(value)
        dispatch(getStaffs({
            data : {
                [searchBy]: value,
            },
            token
        }))
      };
    return (
        <div>
            <Box style={{display: "flex", justifyContent: "space-between", padding: "0 8px"}}>
                <Box className="flex w-[40%] gap-4 h-10">
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
                            <MenuItem value="All">All</MenuItem>
                            <MenuItem value={2}>First Name</MenuItem>
                            <MenuItem value={3}>Last Name</MenuItem>
                            <MenuItem value={4}>Email</MenuItem>
                            <MenuItem value={5}>Phone</MenuItem>
                            <MenuItem value="AccountStatus">Account Status</MenuItem>
                            <MenuItem value="UserType">User Type</MenuItem>
                        </Select>
                    </FormControl>
                    {
                        searchBy === "AccountStatus" ? (
                            <RadioGroup
                            aria-labelledby="demo-error-radios"
                            name="accountStatus"
                            value={valueSearch}
                            onChange={handleRadioChange}
                            className="h-full flex"
                        >
                            <FormControlLabel value="0" control={<Radio />} label="No active" />
                            <FormControlLabel 
                                value="1" 
                                control={
                                    <Radio 
                                        sx={{
                                            color: "#56CA94",
                                            "&.Mui-checked": {
                                            color: "#56CA94",
                                            },
                                        }}
                                    />
                                } 
                                label="Active" />
                        </RadioGroup>
                        ) : (
                            searchBy === "UserType" ? (
                                <RadioGroup
                                    aria-labelledby="demo-error-radios"
                                    name="userType"
                                    value={valueSearch}
                                    onChange={handleRadioChange}
                                    className="h-full flex"
                                >
                                <FormControlLabel 
                                    value="1" 
                                    control={
                                        <Radio 
                                            sx={{
                                                color: "#28a745",
                                                "&.Mui-checked": {
                                                color: "#28a745",
                                                },
                                            }}
                                        />
                                    } 
                                    label="Admin" />
                                <FormControlLabel 
                                    value="2" 
                                    control={
                                        <Radio 
                                            sx={{
                                                color: "#FFC107",
                                                "&.Mui-checked": {
                                                color: "#FFC107",
                                                },
                                            }}
                                        />
                                    } 
                                    label="Staff" />
                            </RadioGroup>
                            ) : (
                                searchBy !== "All" && <TextFieldWithIcon 
                                    width="50%" 
                                    value={valueSearch} 
                                    onChange={(e) => setValueSearch(e.target.value)}
                                    onClick={handleSearch}    
                                />   
                            )
                            
                        )
                    }
                </Box>
                <Box style={{display: "flex", gap: "16px"}}>
                <ButtonWithIcon
                    icon={<RemoveCircleIcon/>}
                    label="DELETE"
                    bgColor={isDisableDelete ? "rgb(217 217 217)" : '#DC3545'}
                    onClick={() => setConfirmDialog(true)}
                />
                <ButtonWithIcon
                    icon={<AddCircleIcon/>}
                    label=" ADD"
                    bgColor='#28A745'
                    onClick={() => router.push("users/add")}
                />
                </Box>
            </Box>
            <Table
                rows={listStaff}
                columns={columns}
                rowSelectionModel={rowSelectionModel}
                setRowSelectionModel={setRowSelectionModel}
            />
            <ConfirmDelete
                title="user"
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
                handleDelete={handleDelete}
            />
        </div>
    )
}

export default Staff