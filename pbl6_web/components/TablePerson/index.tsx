import { Box, Button, Grid, IconButton, Popover, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const TablePerson = (props : any) => {
  const router = useRouter()

  const {id, name, numberOfSeats, isUse, clickEdit, clickDelete} = props

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const idOpen = open ? 'simple-popover' : undefined;
  const numberOfSeatsToRender = Math.floor(numberOfSeats / 2)

  return (
    <Grid item xs={numberOfSeats !== 8 ? 4 : 6} md={numberOfSeats !== 8 ? 3 : 4}>
     <Box 
      className=" h-[180px] flex flex-col items-center gap-[8px] cursor-pointer"
      style={{
        width: numberOfSeats === 2 ? "180px" : numberOfSeats === 4 ? "250px" : numberOfSeats === 6 ? "400px" : "500px"
      }}
      onClick={handleClick}
    >
          <Box className="flex gap-8">
            {Array.from({ length: numberOfSeatsToRender }).map((_, index) => (
              <Box key={index} className="w-[80px] h-[25px] bg-[#D8E6F7] rounded-tl-[100%] rounded-tr-[100%] rounded-bl-[20px] rounded-br-[20px]"></Box>
            ))}
          </Box>
          <Box className="bg-white relative w-full h-full rounded-[30px] flex flex-col text-black flex justify-between align-start pl-[30px] py-[5px]">
            <Box className={`absolute w-[25px] h-full top-0 left-0 ${isUse === 0 ? 'bg-[#DC3545]' : 'bg-[#28A745]'} rounded-tl-[50px] rounded-bl-[50px]`}></Box>
            <Typography variant='h5'>{name}</Typography>
            <Typography variant='subtitle1' className="text-[#B6B6B6]">{isUse === 0 ? 'Occupied' : 'Vacant'}</Typography>
          </Box>
          <Box className="flex gap-8">
            {Array.from({ length: numberOfSeatsToRender }).map((_, index) => (
              <Box key={index} className="w-[80px] h-[25px] bg-[#D8E6F7] rounded-tl-[20px] rounded-tr-[20px] rounded-bl-[100%] rounded-br-[100%]"></Box>
            ))}
          </Box>
      </Box>
      <Popover
        id={idOpen}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        PaperProps={{ style: { width: '180px' } }}
      >
        <Button 
          fullWidth
          style={{display: "block", color: "#000"}} 
          onClick={() => {
            router.push(`/admin/table/${id}`)
          }}
        >
          Detail
        </Button>
        <Button fullWidth style={{display: "block", color: "#000"}} onClick={() =>{handleClose(),clickEdit()}}>Edit</Button>
        <Button fullWidth style={{display: "block", color: "#000"}} onClick={() => {handleClose(), clickDelete()}}>Delete</Button>
      </Popover>
    </Grid>

  )
}

export default TablePerson
