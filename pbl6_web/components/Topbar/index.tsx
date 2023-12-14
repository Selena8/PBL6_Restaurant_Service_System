"use client";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { Icon } from "@iconify/react";

const Topbar = (props: any) => {
  const {todaySales, todayOrders, totalOrders} = props
  return (
    <Grid container spacing={4} sx={{justifyContent: "space-around",}}>
      <Grid item xs={2}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 30px",
            backgroundColor: "#fff",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            borderRadius: "10px",
          }}
        >
          <Icon
            icon="fa-solid:chart-line"
            style={{ width: "50px", height: "50px", color: "#FE724C" }}
          />
          <Box>
            <Typography sx={{ fontSize: "18px" }}>Today Sales</Typography>
            <Typography
              sx={{ fontSize: "16px", color: "black", fontWeight: "bold" }}
            >
              {todaySales}
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 30px",
            backgroundColor: "#fff",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            borderRadius: "10px",
          }}
        >
          <Icon
            icon="fa-solid:chart-bar"
            style={{ width: "50px", height: "50px", color: "#FE724C" }}
          />
          <Box>
            <Typography sx={{ fontSize: "18px" }}>Total Sales</Typography>
            <Typography
              sx={{ fontSize: "16px", color: "black", fontWeight: "bold" }}
            >
              $123
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 20px",
            backgroundColor: "#fff",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            borderRadius: "10px",
          }}
        >
          <Icon
            icon="fa-solid:chart-area"
            style={{ width: "50px", height: "50px", color: "#FE724C" }}
          />
          <Box>
            <Typography sx={{ fontSize: "18px" }}>Today Orders</Typography>
            <Typography
              sx={{ fontSize: "16px", color: "black", fontWeight: "bold" }}
            >
              {todayOrders}
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 30px",
            backgroundColor: "#fff",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            borderRadius: "10px",
          }}
        >
          <Icon
            icon="fa-solid:chart-pie"
            style={{ width: "50px", height: "50px", color: "#FE724C" }}
          />
          <Box>
            <Typography sx={{ fontSize: "18px" }}>Total Orders</Typography>
            <Typography
              sx={{ fontSize: "16px", color: "black", fontWeight: "bold" }}
            >
              {totalOrders}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Topbar;
