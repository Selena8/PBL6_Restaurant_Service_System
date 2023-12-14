import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React from 'react'

const TableModal = (props: any) => {
    const { onClose, open, name, tableName, numberOfSeats, password, label, err, handleButton, handleChange, handleChangeSelectedAdd} = props;
    return (
      <Dialog 
        onClose={onClose} 
        open={open}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "500px",
            },
          },
        }}
      >
        <DialogTitle sx={{textAlign: "center", textTransform: "uppercase"}}>{label} TABLE</DialogTitle>
        <Divider />
        <DialogContent className='py-4'>
          <Box className="flex flex-col gap-4">
            <TextField
              fullWidth={true}
              type='text'
              label='Name'
              name='name'
              value={name}
              onChange={handleChange}
            />
            <FormControl className='bg-white' fullWidth>
                <InputLabel id="demo-simple-select-label" sx={{top: "-5px"}}>Number of seats</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={numberOfSeats}
                    label="Number of seats"
                    onChange={handleChangeSelectedAdd}
                    sx={{height: "40px"}}
                >
                    <MenuItem value={2}>2 people</MenuItem>
                    <MenuItem value={4}>4 people</MenuItem>
                    <MenuItem value={6}>6 people</MenuItem>
                    <MenuItem value={8}>8 people</MenuItem>
                </Select>
            </FormControl>
            <TextField
              fullWidth={true}
              type='text'
              label='Email'
              name='tableName'
              value={tableName}
              onChange={handleChange}
            />
            <TextField
              fullWidth={true}
              type='password'
              label={label === 'edit' ? 'New Password' : 'Password'}
              name='password'
              value={password || ""}
              onChange={handleChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Typography variant="subtitle1" className='text-[red]'>{err}</Typography>
          <Box className='flex justify-end px-4 py-2 !ml-0 w-full gap-4'>
            <Button variant="contained" color="success" className="bg-[#D9D9D9] hover:bg-[#D9D9D9] hover:opacity-90 text-black" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" color="success" className="bg-green-700 w-[100px]" onClick={handleButton}>
              {label}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    );
}

export default TableModal
