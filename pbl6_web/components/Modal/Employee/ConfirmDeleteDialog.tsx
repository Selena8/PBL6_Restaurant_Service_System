import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Typography } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';


interface ConfirmDialogProps {
  confirmDialog: boolean;
  setConfirmDialog: (value: boolean) => void;
}

const ConfirmDialog = (props: ConfirmDialogProps) => {
  const {confirmDialog, setConfirmDialog} = props
  return (
    <Dialog open={confirmDialog}>
      <DialogTitle>
        <Typography variant="h6">
          DELETE EMPLOYEE
        </Typography>
        <IconButton 
          aria-label="delete" 
          className="absolute top-0 right-0"
          onClick={() => {
            setConfirmDialog(false)
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Typography variant="h6">
        Are you sure to delete this employee?
        </Typography>
        <Typography variant="subtitle2" style={{color: "#FFC107"}}>
        This action cannot be undone
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button 
          variant="contained" 
          color="success" 
          className="bg-[#D9D9D9] hover:bg-[#D9D9D9] hover:opacity-90 text-black" 
          onClick={() => {
            setConfirmDialog(false)
          }}>
            Cancel
        </Button>
        <Button 
          variant="contained" 
          color="success" 
          style={{backgroundColor: "#DC3545"}}
          className="w-[100px]"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
