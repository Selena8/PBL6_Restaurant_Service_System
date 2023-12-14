import React, { useEffect, useReducer } from 'react'
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Box, DialogActions, DialogContent, Divider, Grid, TextField, Typography } from '@mui/material';


interface CategoryModalProps {
    open: boolean;
    onClose: () => void;
    name?: string;
    description?: string
    err?: string
    label?: string
    handleButton: () => void
    handleChange: (e: any) => void; 
}

const CategoryModal = (props: CategoryModalProps) => {
    //props
    const { onClose, open, name, description, err, label, handleButton, handleChange } = props;

    return (
      <Dialog 
        onClose={onClose} 
        open={open}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "500px",  // Set your width here
            },
          },
        }}
      >
        <DialogTitle sx={{textAlign: "center", textTransform: "uppercase"}}>{label} category</DialogTitle>
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
            <TextField
              maxRows={5}
              multiline
              fullWidth={true}
              type='text'
              label='Description'
              name='description'
              value={description}
              onChange={handleChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Typography variant="subtitle1" className='text-[red]'>{err}</Typography>
          <Box className='flex justify-between px-4 py-2 !ml-0 w-full'>
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

export default CategoryModal
