import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import {addStaffDB, deleteStaffsDB, getStaffByIdDB, getStaffsDB, updateStaffDB } from './api/staff'
import { User } from '@/types/user'

export const getStaffs = createAsyncThunk(
    'staff/getListStaff', async (params: any) => {
        const {data, token} = params
        const response = await getStaffsDB(data, token)
        return response
    }
)

export const getStaffById = createAsyncThunk(
    'staff/getStaffById', async (params: any) => {
        const {id, token} = params
        const response = await getStaffByIdDB(id, token)
        return response
    }
)

export const addStaff = createAsyncThunk(
    'staff/addStaff', async (params: any) => {
        const {data, token} = params
        const response = await addStaffDB(data, token)
        return response
    }
)

export const updateStaff = createAsyncThunk(
    'staff/updateStaff', async (params: any) => {
        const {data, token} = params
        const response = await updateStaffDB(data, token)
        return response
    }
)

export const deleteStaffs = createAsyncThunk(
    'staff/deleteStaff', async (params: any) => {
        const {ids, token} = params
        const response = await deleteStaffsDB(ids, token)
        return response
    }
)

const initialState = {
    listStaff: [] as User[],
    staffDetail: {},
    error: null,
    isEdit: false,
    listIdDelete: [] as number[]
}

const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {
        updateIsEdit(state, action){
            state.isEdit = action.payload
        },
        updateIdsDelete: (state, action) => {
            state.listIdDelete = [...action.payload]
        }
    },
    extraReducers: builder => {
        builder

        //get list staff
        .addCase(getStaffs.fulfilled, (state, action) => {
            state.listStaff =  action.payload.data
            state.error = null
        })

        // get staff by id
        .addCase(getStaffById.fulfilled, (state, action) => {
            state.staffDetail =  action.payload
            state.error = null
        })

        .addCase(getStaffById.rejected, (state, action: any) => {
            state.error = action.error.message
        })

        //add staff
        .addCase(addStaff.fulfilled, (state, action) => {
            state.listStaff = [action.payload, ...state.listStaff];
            state.error = null
        })

        .addCase(addStaff.rejected, (state, action: any) => {
            console.log(JSON.parse(action.error.message).message)
            state.error = JSON.parse(action.error.message).message
        })

        //update staff
        .addCase(updateStaff.fulfilled, (state, action) => {
            const updatedStaffIndex = state.listStaff.findIndex((staff) => staff.id === action.payload.id);
            if (updatedStaffIndex !== -1) {
                state.listStaff[updatedStaffIndex] = action.payload;
                state.staffDetail = action.payload
            }
            state.error = null
        })

        .addCase(updateStaff.rejected, (state, action: any) => {
            state.error = action.error.message
        })

        //delete staff
        .addCase(deleteStaffs.fulfilled, (state, action) => {
            state.listIdDelete.forEach((idToDelete) => {
                state.listStaff = state.listStaff.filter((staff) => staff.id !== idToDelete);
            });
            state.error = null
        })

        .addCase(deleteStaffs.rejected, (state, action: any) => {
            state.error = action.error.message
        })

        // //active account
        // .addCase(activeAccountUser.fulfilled, (state, action) => {
        //     state.listStaff =  action.payload.data
        //     state.error = null
        // })
    },
}) 

export const { updateIsEdit, updateIdsDelete } = staffSlice.actions
export default staffSlice.reducer