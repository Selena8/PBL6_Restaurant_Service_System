"use client"
import FormStaff from "@/components/FormStaff";
import { AppDispatch } from "@/store";
import { getStaffById } from "@/store/apps/staff";
import { localStorageClient } from "@/utils/localStorage";
import { Box } from "@mui/material";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const StaffDetailPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { id } = useParams();
  const { staffDetail, isEdit } = useSelector(
    (state: any) => state.staff
  );
  const token = localStorageClient.getItem("userToken");

  useEffect(() => {
    if(id){
      const staffId = Array.isArray(id) ? id[0] : id;
      dispatch(getStaffById({id: parseInt(staffId, 10), token}))
    }
  }, [])

  return (
    <Box>
      {Object.keys(staffDetail).length !== 0 ? (
        <FormStaff id={id} isEdit={isEdit} staffDetail={staffDetail}/>
      ) : (
        "loading ..."
      )}
    </Box>
  );
};

export default StaffDetailPage;
