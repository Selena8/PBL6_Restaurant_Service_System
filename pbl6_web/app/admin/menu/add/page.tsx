"use client";
import React, { useEffect, useState, useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormMenu from "@/components/FormMenu";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { getListCategory } from "@/store/apps/category";

const AddMenuPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { listCategory } = useSelector((state: any) => state.category);

  useEffect(() => {
    dispatch(getListCategory());
  }, []);
  
  return (
    <FormMenu
      isAdd={true}
      listCategory={listCategory}
    />
  );
};

export default AddMenuPage;
