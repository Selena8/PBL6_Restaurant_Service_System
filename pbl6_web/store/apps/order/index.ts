import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { 
    getOrdersDB, 
    getOrderByIdDB, 
    getOrderByTable, 
    addOrderDB, 
    updateStatusOrderByIdDB, 
    updateStatusOrderByIdAndOrderDetailIdDB, 
    updateOrderFoodByIdDB } from './api/order'
import { User } from '@/types/user'
import { Stats } from 'fs'
import { Order } from '@/types/order'

export const getOrders = createAsyncThunk(
    'staff/getListOrder', async (params: any) => {
        const {data, token} = params
        const response = await getOrdersDB(data, token)
        return response
    }
)

export const getOrderById = createAsyncThunk(
    'staff/getOrderById', async (params: any) => {
        const {id, token} = params
        const response = await getOrderByIdDB(id, token)
        return response
    }
)


const initialState = {
    listOrder: [] as Order[],
    orderDetail: {},
    error: null,
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder

        //get list order
        .addCase(getOrders.fulfilled, (state, action) => {
            state.listOrder =  action.payload.data
            state.error = null
        })

        // get order by id
        .addCase(getOrderById.fulfilled, (state, action) => {
            state.orderDetail =  action.payload
            state.error = null
        })
    },
})

export default orderSlice.reducer