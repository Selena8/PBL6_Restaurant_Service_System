import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ConfirmDialogProps {
    title?: string
    confirmDialog: boolean
    setConfirmDialog: (value: boolean) => void
    handleDelete: (e: any) => void
  }

const ConfirmDelete = (props: ConfirmDialogProps) => {
    const {title, confirmDialog, setConfirmDialog, handleDelete} = props
    return (
      <Dialog open={confirmDialog}>
        <DialogTitle>
          <Typography variant="h6" style={{textTransform: "uppercase"}}>
            delete {title}
          </Typography>
          <IconButton 
            aria-label="delete" 
            style={{position: "absolute", top: 0, right: 0}}
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
          Are you sure to delete this {title}?
          </Typography>
          <Typography variant="subtitle2" style={{color: "#FFC107"}}>
          This action cannot be undone
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            "&": {
              padding: "20px 12px",
              gap: "8px"
            }
          }}
        >
          <Button 
            variant="contained" 
            color="success" 
            sx={{
              backgroundColor: "#D9D9D9",
              "&:hover": {
                backgroundColor: "#D9D9D9",
                opacity: 0.9,
              },
              color: "black",
            }}
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
