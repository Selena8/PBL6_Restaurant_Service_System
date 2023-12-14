"use client"

import RevenueLineChart from '@/components/Chart/RevenueChart'
import PieChart from '@/components/PieChart'
import Topbar from '@/components/Topbar'
import { AppDispatch } from '@/store'
import { getListStaticProfit, getTotalStaticOrder, getTotalStaticOrderToday, selectProfits, selectTotalOrder, selectTotalOrderToday } from '@/store/apps/static'
import { localStorageClient } from '@/utils/localStorage'
import { Box, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const DashBoard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const listProfit = useSelector(selectProfits)
    const totalOrderToday = useSelector(selectTotalOrderToday)
    const totalOrder = useSelector(selectTotalOrder)
    const token = localStorageClient.getItem("userToken");

    useEffect(() => {
        const todayFormatted: string = new Date().toISOString().split('T')[0];
        dispatch(getListStaticProfit({data: {
            Type: 0,
            Date: todayFormatted
        }, token}))
        dispatch(getTotalStaticOrderToday(token))
        dispatch(getTotalStaticOrder(token))
    }, [])

    return (
        <>
            <Box style={{background: "#fff", padding: "16px"}}>
            <Grid container sx={{gap: "40px"}}>
            <Grid item xs={12}>
                <Topbar todaySales={listProfit[0]?.item2 || 0} todayOrders={totalOrderToday} totalOrders={totalOrder}/>
            </Grid>
            <Grid container item xs={12} sx={{gap: "40px", justifyContent: "space-around"}}>
                <Grid item xs={4}>
                    <PieChart />
                </Grid>
                <Grid item xs={4}>
                    <RevenueLineChart/>
                </Grid>
                </Grid>
         </Grid>
            </Box>
        </>
    )
}

export default DashBoard