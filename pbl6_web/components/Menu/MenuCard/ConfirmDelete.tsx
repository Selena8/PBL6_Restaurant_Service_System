import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ConfirmDialogProps {
    confirmDialog: boolean;
    setConfirmDialog: (value: boolean) => void;
    handleDelete: (e: any) => void
  }

const ConfirmDelete = (props: ConfirmDialogProps) => {
    const {confirmDialog, setConfirmDialog, handleDelete} = props
    return (
      <Dialog open={confirmDialog}>
        <DialogTitle>
          <Typography variant="h6">
            DELETE FOOD
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
          Are you sure to delete this food?
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
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    )
}

export default ConfirmDelete
