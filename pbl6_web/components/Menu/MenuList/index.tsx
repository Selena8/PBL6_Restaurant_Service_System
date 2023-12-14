"use client";

import IconTab from "@/components/Tab/IconTab";
import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import MenuCard from "../MenuCard/MenuCard";
import { useDispatch, useSelector } from "react-redux";
import { getListCategory } from "@/store/apps/category";
import { AppDispatch } from "@/store";
import { updateIdCategory } from "@/store/apps/menu";

interface TabData {
  id: string;
  label: string;
  component: React.ReactNode;
}
interface ListMenuType {
  listMenu?: any
  resultCount?: any
  valueSearch?: string
  handleTextSearch: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleSearch: () => void
}

const MenuList = (props: ListMenuType) => {
  const { listMenu, resultCount, valueSearch, handleTextSearch, handleSearch } = props
  const dispatch = useDispatch<AppDispatch>()
  const { categoryId } = useSelector((state: any) => state.menu)
  const { listCategory } = useSelector(
    (state: any) => state.category
  );
  
  useEffect(() => {
    dispatch(getListCategory())
  }, [])
  const [tab, setTab] = useState("21");
  useEffect(() => {
    categoryId && setTab(categoryId.toString())
  }, [listCategory])

  const handleChange = (newValue: string) => {
    setTab(newValue);
    dispatch(updateIdCategory(parseInt(newValue)))
  };
  
  const renderListMenu = (list: any, typeId: number) => {
    list = Object.keys(list).length !== 0 ? list.filter((item: any) => item.categoryId === typeId) : []
    return (
      list.map((item: any) => (
        <MenuCard key={item.id} item={item} categoryId={typeId}/>
      ))
    )
  }
  let tabData: TabData[] = [];
  listCategory.map((item: any) => {
    tabData.push({
      id: item.id.toString(),
      label: item.name.toUpperCase(),
      component: renderListMenu(listMenu, item.id),
    })
  })
  return (
    <Stack direction={"column"}>
      <IconTab onChange={handleChange} tabData={tabData} value={tab} valueSearch={valueSearch} handleChange={handleTextSearch} handleSearch={handleSearch}/>
    </Stack>
  );
};

export default MenuList;
