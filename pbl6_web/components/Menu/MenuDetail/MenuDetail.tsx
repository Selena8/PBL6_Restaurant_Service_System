import { Stack, Box, Button } from "@mui/material";
import { Icon } from "@iconify/react";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormMenu from "@/components/FormMenu";
import { useRouter } from "next/navigation";

const MenuDetail = (props: any) => {
  const { id, menuDetailData, listCategory } = props;

  return (
    <FormMenu id={id} menuDetailData={menuDetailData} listCategory={listCategory} />
  );
};

export default MenuDetail;
