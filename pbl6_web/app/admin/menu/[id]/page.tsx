"use client";
import MenuDetail from "@/components/Menu/MenuDetail/MenuDetail";
import { AppDispatch } from "@/store";
import { getListCategory } from "@/store/apps/category";
import {
  getMenuDetail,
  selectMenuDetailData,
  selectMenus,
} from "@/store/apps/menu";
import { Box } from "@mui/material";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const MenuDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const menuDetailData = useSelector(selectMenuDetailData);
  const { listCategory } = useSelector((state: any) => state.category);
  useEffect(() => {
    dispatch(getListCategory());
  }, []);
  useEffect(() => {
    dispatch(getMenuDetail(id));
  }, [dispatch, id]);

  return (
    <Box>
      {Object.keys(menuDetailData).length !== 0 ? (
        <MenuDetail
          id={id}
          menuDetailData={menuDetailData}
          listCategory={listCategory}
        />
      ) : (
        "loading ..."
      )}
    </Box>
  );
};

export default MenuDetailsPage;
