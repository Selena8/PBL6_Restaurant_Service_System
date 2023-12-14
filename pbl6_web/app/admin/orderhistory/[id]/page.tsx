"use client"
import Invoice from "@/components/invoice";
import { AppDispatch } from "@/store";
import { getOrderById } from "@/store/apps/order";
import { localStorageClient } from "@/utils/localStorage";
import { Box } from "@mui/material";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const OrderDetailPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { id } = useParams();
  const { orderDetail } = useSelector(
    (state: any) => state.order
  );


  const token = localStorageClient.getItem("userToken");

  useEffect(() => {
    if(id){
      const orderId = Array.isArray(id) ? id[0] : id;
      dispatch(getOrderById({id: parseInt(orderId, 10), token}))
    }
  }, [])

  return (
    <Box>
      {Object.keys(orderDetail).length !== 0 ? (
        <Invoice orderDetail={orderDetail}/>
      ) : (
        "loading ..."
      )}
    </Box>
  );
};

export default OrderDetailPage;
