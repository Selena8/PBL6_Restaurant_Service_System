"use client"

import { AppDispatch } from '@/store';
import { addTable, deleteTables, getTableById, getTables, updateIdsDelete, updateTable } from '@/store/apps/table';
import { localStorageClient } from '@/utils/localStorage';
import { Alert, Box, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Snackbar, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ButtonWithIcon from '@/components/ButtonWithIcon';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Table } from '@/types/table';
import TablePerson from '@/components/TablePerson';
import TableModal from '@/components/TablePerson/TableModal';
import ConfirmDelete from '@/components/ConfirmDelete';
import { showMessage } from '@/utils/parse.util';

const TablePage = () => {
   const token = localStorageClient.getItem("userToken");

  const dispatch = useDispatch<AppDispatch>();
  const { listTable, error, tableDetail } = useSelector(
    (state: any) => state.table
  );
  const [valueFilter, setValueFilter] = useState('2')
  const [isOpenAdd, setIsOpenAdd] = useState(false)
  const [err, setErr] = useState("")
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [confirmDialog, setConfirmDialog] = useState(false)
  const [idDel, setIdDel] = useState(0)
  const [table, setTable] = useState({
    ...tableDetail
  })

  useEffect(() => {
    dispatch(getTables({data: {Limit: 100}, token}))
  }, [])

  useEffect(() => {
    if(idDel === 0){
      dispatch(updateIdsDelete([]));
    } else {
      dispatch(updateIdsDelete([idDel]));

    }
  }, [idDel])

  const resetValue = () => {
    setTable({
        name: '',
        numberOfSeats: 2,
        currentStatus: 1,
        tableName: '',
        password: ''
    })
  }

  const emptyInput = () => {
    return table.name !== '' && table.tableName !== ''
  }

  const handleCancel = () => {
    resetValue()
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setTable((prev: any) => ({
      ...prev,
      [name]: value
    }));
    setErr("")
  }
  
  const handleChangeSelected = (event: SelectChangeEvent) => {
    setValueFilter(event.target.value as string);
    if(parseInt(event.target.value) !== 2){
        dispatch(getTables({
            data : {
                CurrentStatus: parseInt(event.target.value),
            },
            token
        }))
    } else {
        dispatch(getTables({
            data : {},
            token
        }))
    }
  };

  const handleChangeSelectedAdd = (event: SelectChangeEvent) => {
    setTable((prev: any) => ({
        ...prev,
        numberOfSeats: parseInt(event.target.value)
      }));

  };

  const handleAdd = async () => {
    if(!emptyInput()){
      setErr('Please enter complete information ')
    } else {
        const res: any = await dispatch(addTable({data: {...table}, token}))
       if(res.payload){
        showMessage("Add category is successful", true)
        setIsOpenAdd(false)
        resetValue()
        } else {
          showMessage(res.error.message, false)
        }
    }
  }

  const handleEdit = async () => {
    if(!emptyInput()){
      setErr('Please enter complete information ')
    } else {
      if(token){
        const res: any = await dispatch(updateTable({data: {
          id: table.id,
          name: table.name,
          numberOfSeats: table.numberOfSeats,
          tableName: table.tableName,
          password: table.password || ''
        }, token}))
        if(res.payload){
          showMessage("Update category is successful", true)
          setIsOpenEdit(false)
          resetValue()
        } else {
          showMessage(res.error.message, false)
        }
      } 
    }
  }

  const handleDelete = async (e: any) => {
    e.stopPropagation()
    const res: any = await dispatch(deleteTables({ids: [idDel], token}))
    if(res.payload){
      showMessage("Delete categories is successful", true)
      setConfirmDialog(false)
    } else {
      showMessage(res.error.message, false)
    }
  }


  return (
    <div>
    <Box style={{display: "flex", justifyContent: "space-between", padding: "0 8px"}}>
        <FormControl className='w-[20%] bg-white'>
            <InputLabel id="demo-simple-select-label" sx={{top: "-5px"}}>Filter</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={valueFilter}
                label="SearchBy"
                onChange={handleChangeSelected}
                sx={{height: "40px"}}
            >
                <MenuItem value={2}>All</MenuItem>
                <MenuItem value={0}>In Use</MenuItem>
                <MenuItem value={1}>Free</MenuItem>
            </Select>
        </FormControl>
        <Box style={{display: "flex", gap: "16px"}}>
        <ButtonWithIcon
            icon={<AddCircleIcon/>}
            label=" ADD TABLE"
            bgColor='#28A745'
            onClick={() => {
              resetValue()
              setIsOpenAdd(!isOpenAdd)
            }}
            />
        </Box>
    </Box>
    <Grid container spacing={6} style={{marginTop: "20px"}}>
        {
            listTable.map((table: Table) => (
                <TablePerson 
                    id={table.id}
                    name={table.name} 
                    numberOfSeats={table.numberOfSeats} 
                    isUse={table.currentStatus} 
                    clickEdit={() => {
                        setIsOpenEdit(true)
                        setTable({...table})
                    }}
                    clickDelete={() => {
                      setIdDel(table.id)
                      setConfirmDialog(true)
                    }}
                />
            ))
        }
    </Grid>
    <TableModal
        open={isOpenAdd}
        onClose={() => {
          setIsOpenAdd(false)
          handleCancel()
        }}
        name={table.name}
        password={table.password}
        numberOfSeats={table.numberOfSeats}
        tableName={table.tableName}
        err={err}
        label="add"
        handleButton={handleAdd}
        handleChange={handleChange}
        handleChangeSelectedAdd={handleChangeSelectedAdd}
      />
    <TableModal
        open={isOpenEdit}
        isEdit={true}
        onClose={() => {
            setIsOpenEdit(false)
          handleCancel()
        }}
        name={table.name}
        password={table.password}
        numberOfSeats={table.numberOfSeats}
        tableName={table.tableName}
        err={err}
        label="edit"
        handleButton={handleEdit}
        handleChange={handleChange}
        handleChangeSelectedAdd={handleChangeSelectedAdd}
      />
    <ConfirmDelete
        title="table"
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
        handleDelete={handleDelete}
    />
</div>
  )
}

export default TablePage
