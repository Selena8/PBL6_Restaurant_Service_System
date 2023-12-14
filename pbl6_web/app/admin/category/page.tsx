"use client"

import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import { GridColDef, GridRowSelectionModel, GridValueGetterParams } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store';
import { getListCategory, updateCategory, addCategory, deleteCategories, updateIdsDelete, getCategory, deleteCategory } from "@/store/apps/category";
import { Alert, Button, IconButton, Snackbar, Stack, TextField, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TextFieldWithIcon from '@/components/TextFieldWithIcon';
import ButtonWithIcon from '@/components/ButtonWithIcon';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Table from '@/components/Table';
import { Category } from '@/types/category';
import moment from 'moment';
import CategoryModal from '@/components/Modal/Category/CategoryModal';
import { localStorageClient } from '@/utils/localStorage';
import ConfirmDelete from '@/components/ConfirmDelete';
import { showMessage } from '@/utils/parse.util';

const Category = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { listCategory, error, categoryDetail } = useSelector(
      (state: any) => state.category
    );

    const token = localStorageClient.getItem("userToken");

    const [category, setCategory] = useState({
        ...categoryDetail
    })
    const [isDisableDelete, setIsDisableDelete] = useState(true)
    const [err, setErr] = useState("")
    const [rowSelectionModel, setRowSelectionModel] =
    React.useState<GridRowSelectionModel>([]);
    const [categories, setCategories] = useState([])
    const [valueSearch, setValueSearch] = useState("")
    const [isOpenAdd, setIsOpenAdd] = useState(false)
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [confirmDialog, setConfirmDialog] = useState(false)
    const [idDel, setIdDel] = useState(null)

    useEffect(() => {
        dispatch(getListCategory())
    }, [])

    useEffect(() => {
      setCategories(listCategory)
    }, [listCategory])

    useEffect(() => {
      if(rowSelectionModel.length === 0){
        setIsDisableDelete(true)
      } else {
        setIsDisableDelete(false)
      }
      dispatch(updateIdsDelete(rowSelectionModel));
    }, [rowSelectionModel])

    useEffect(() => {
      setCategory({
        ...categoryDetail
    })
    }, [categoryDetail])

    const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90, align: "center", },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: false,
      align: "center",
    },
    {
      field: 'description',
      headerName: 'Description',
      minWidth: 700,
      editable: false,
      align: "center",
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 170,
      editable: false,
      align: "center",
      valueGetter: (params: GridValueGetterParams<Category, string>) => {
        return moment(params.value).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    {
      field: 'updatedAt',
      headerName: 'Updated At',
      width: 170,
      editable: false,
      align: "center",
      valueGetter: (params: GridValueGetterParams<Category, string>) => {
        return moment(params.value).format('YYYY-MM-DD HH:mm:ss');
      }
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
                            aria-label="edit" 
                            style={{color: "#FFC107"}}
                            onClick={() => {
                              dispatch(getCategory(row.id))
                              setIsOpenEdit(!isOpenEdit)
                            }}
                        >
                            <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete" style={{color: "#F44336"}} onClick={() => {
                          setConfirmDialog(true)
                          setIdDel(row.id)
                        }}>
                            <DeleteIcon />
                        </IconButton>

                </Stack>
            );
        }
    },
  ];

    // function 
    const resetValue = () => {
      setCategory({
        id: 1,
        name: "",
        description: "",
        createdAt: "",
        updatedAt: ""
    })
    }

    const emptyInput = () => {
      return category.name !== '' && category.description !== ''
    }

    const handleChange = (e: any) => {
      const { name, value } = e.target;
      setCategory((prevCategory: any) => ({
        ...prevCategory,
        [name]: value
      }));
      setErr("")
    }

    const handleCancel = () => {
      resetValue()
    }

    const handleAdd = async () => {
      if(!emptyInput()){
        setErr('Please enter complete information ')
      } else {
          const res:any = await dispatch(addCategory({...category, token}))
          if(res.payload){
            showMessage("Add category is successful", true)
            setIsOpenAdd(false)
            } else {
              showMessage(res.error.message, false)
            }
          resetValue()
      }
    }

    const handleEdit = async () => {
      if(!emptyInput()){
        setErr('Please enter complete information ')
      } else {
        const res:any = await dispatch(updateCategory({...category, token}))
        if(res.payload){
          showMessage("Update category is successful", true)
          setIsOpenEdit(false)
          resetValue()
        }  else {
          showMessage(res.error.message, false)
        }
      }
    }

    const handleDeleteCategories = async (e: any) => {
      e.stopPropagation()
      if(token && error === null){
        const res:any = await dispatch(deleteCategories({ids: rowSelectionModel, token}))
        if(res.payload){
          showMessage("Delete category is successful", true)
          setConfirmDialog(false)
        } else {
          showMessage(res.error.message, true)
        }
      } 
    }

    const handleDeleteCategory = async (e: any) => {
      e.stopPropagation()
      dispatch(updateIdsDelete([idDel]));
      if(token){
        const res:any = await dispatch(deleteCategory({id: idDel, token}))
        if(res.payload){
          showMessage("Delete categories is successful", true)
          setConfirmDialog(false)
          setIdDel(null)
        } else {
          showMessage(res.error.message, true)
        }
      } 
    }

  const handleSearch = (value: string) => {
    setValueSearch(value)
    if(value === ""){
      setCategories(listCategory)
    } else {
      const newCategories = categories.filter((category : Category) => category.name.toLowerCase().includes(value.toLowerCase()))
      setCategories(newCategories)
    }
    
  }
    return (
      <Box sx={{ width: '100%' }}>
        <Box style={{display: "flex", justifyContent: "space-between", padding: "16px 0px"}}>
            <TextFieldWithIcon 
              value={valueSearch}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <Box style={{display: "flex", gap: "30px"}}>
              <ButtonWithIcon
                  disabled={isDisableDelete}
                  icon={<RemoveCircleIcon/>}
                  label="DELETE"
                  bgColor={isDisableDelete ? "rgb(217 217 217)" : '#DC3545'}
                  onClick={() => setConfirmDialog(true)}
              />
              <ButtonWithIcon
                  icon={<AddCircleIcon/>}
                  label=" ADD"
                  bgColor='#28A745'
                  onClick={() => setIsOpenAdd(!isOpenAdd)}
            />
            </Box>
        </Box>
          <Table
            rows={categories}
            columns={columns}
            rowSelectionModel={rowSelectionModel}
            setRowSelectionModel={setRowSelectionModel}
          />
      <CategoryModal
        open={isOpenAdd}
        onClose={() => {
          setIsOpenAdd(false)
          handleCancel()
        }}
        name={category.name}
        description={category.description}
        err={err}
        label="add"
        handleButton={handleAdd}
        handleChange={handleChange}
      />
      <CategoryModal
        open={isOpenEdit}
        onClose={() => {
          setIsOpenEdit(false)
          handleCancel()
        }}
        name={category.name}
        description={category.description}
        err={err}
        label="edit"
        handleButton={handleEdit}
        handleChange={handleChange}
      />
      <ConfirmDelete
        title="category"
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
        handleDelete={idDel ? handleDeleteCategory : handleDeleteCategories}
      />
    </Box>
    );
}

export default Category
