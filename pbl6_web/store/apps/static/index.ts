import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { pickBy } from "lodash";
import { getStaticOrder, getStaticOrderToday, getStaticPayment, getStaticProfit } from "./api";
import { StaticRevenue } from "@/types/static";

export const getListStaticProfit = createAsyncThunk(
    'staff/getListStaticProfit', async (params: any) => {
        const {data, token} = params
        const response = await getStaticProfit(data, token)
        return response
    }
)

export const getTotalStaticOrderToday = createAsyncThunk(
    'staff/getTotalStaticOrderToday', async (token: any) => {
        const response = await getStaticOrderToday(token)
        return response
    }
)

export const getTotalStaticOrder = createAsyncThunk(
    'staff/getTotalStaticOrder', async (token: any) => {
        const response = await getStaticOrder(token)
        return response
    }
)

export const getTotalStaticPayment = createAsyncThunk(
    'staff/getTotalStaticPayment', async (params: any) => {
        const {data, token} = params
        const response = await getStaticPayment(data, token)
        return response
    }
)

const initialState = {
    profits: [] as StaticRevenue[],
    totalOrderToday: 0,
    totalOrder: 0,
    totalOnlinePay: 0,
    totalCashPay: 0,
    error: null
}

const staticSlice = createSlice({
    name: 'static',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
    
        //get list static profit
        .addCase(getListStaticProfit.fulfilled, (state, action) => {
            state.profits =  action.payload.data
            state.error = null
        })

        //get list static order
        .addCase(getTotalStaticOrderToday.fulfilled, (state, action) => {
            state.totalOrderToday =  action.payload
            state.error = null
        })

        //get list static order
        .addCase(getTotalStaticOrder.fulfilled, (state, action) => {
            state.totalOrder =  action.payload
            state.error = null
        })

        //get list static payment
        .addCase(getTotalStaticPayment.fulfilled, (state, action) => {
            state.totalOnlinePay =  action.payload.onlinePaymentTotal
            state.totalCashPay = action.payload.cashPaymentTotal
            state.error = null
        })
        
    },
})

export const selectProfits = (state: RootState) => state.static.profits;
export const selectTotalOrderToday = (state: RootState) => state.static.totalOrderToday;
export const selectTotalOrder = (state: RootState) => state.static.totalOrder;
export const selectTotalOnlinePay = (state: RootState) => state.static.totalOnlinePay;
export const selectTotalCashPay = (state: RootState) => state.static.totalCashPay;
export default staticSlice.reducer;