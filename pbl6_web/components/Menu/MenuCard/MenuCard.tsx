import React, { MouseEvent, useEffect, useState } from "react";
import { Alert, Button, Snackbar } from "@mui/material";
import { useRouter } from "next/navigation";
import { makeStyles } from '@material-ui/core/styles';
import { deleteMenuData, updateIdsDelete } from "@/store/apps/menu";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { localStorageClient } from "@/utils/localStorage";
import ConfirmDelete from "@/components/ConfirmDelete";
import { formatNumber, showMessage } from "@/utils/parse.util";

const useStyles = makeStyles((theme) => ({
  deleteButton: {
    color: '#FE724C',
    backgroundColor: '#ffffff',
    padding: '5px 16px',
    border: '1px solid #eb5d3766',
    '&:hover': {
      backgroundColor: '#eb5d3766',
      borderColor: '#EB5D37',
    },
  },
  detailButton: {
    color: '#ffffff',
    backgroundColor: '#FE724C',
    padding: '5px 16px',
    '&:hover': {
      backgroundColor: '#EB5D37',
    },
  },
}));

interface MenuCardProps {
  item: any
  categoryId: any
}

const MenuCard = ({ item, categoryId }: MenuCardProps) => {
  const classes = useStyles();
  const router = useRouter()
  const [isOpenErr, setIsOpenErr] = useState(false)
  const [isOpenSuccessFull, setIsOpenSuccessFull] = useState(false)
  const [message, setMessage] = useState("")
  const [confirmDialog, setConfirmDialog] = useState(false)

  const dispatch = useDispatch<AppDispatch>();

  const token = localStorageClient.getItem("userToken")

  const handleClickItem = (e: MouseEvent<HTMLElement>, id: number) => {
    e.preventDefault()
    router.push(`menu/${id}?categoryId=${categoryId}`)
  }

  const handleDeleteItem = async (id: number) => {
    await dispatch(updateIdsDelete(id))
    
    if(token){
      const res : any = await dispatch(deleteMenuData({id, token}))
      if(res.payload){
        showMessage("Delete food is successful", true)
      } else {
        showMessage(res.error.message, false)
      }
      setConfirmDialog(false)
    }
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsOpenErr(false);
    setIsOpenSuccessFull(false);
  };

  return (
    <div className="bg-white rounded-[10px] py-2 shadow w-[245px] h-[350px]">
      <div className="px-[10px] my-6 flex flex-col items-center">
        <img className="rounded-full w-[180px] h-[180px] object-cover" alt="" src={item.image || "/assets/images/no-photo-available.png"} />
        <h5 className="w-full text-center text-[22px] text-black font-medium text-ellipsis overflow-hidden whitespace-nowrap">{item.name}</h5>
        <p className="w-full text-center text-[22px] text-[#FC5A5A] font-semibold">
          {`${formatNumber(item.price)} VND`}
        </p>
        <div className="w-full flex justify-evenly mt-4">
          <Button
            variant="outlined"
            className={`${classes.deleteButton}`}
            onClick={() => setConfirmDialog(true)}
          >
            Delete
          </Button>
          <Button
            className={`${classes.detailButton}`}
            onClick={(e) => handleClickItem(e, item.id)}
          >
            Detail
          </Button>
        </div>
      </div>
      <Snackbar 
          open={isOpenErr} 
          autoHideDuration={3000} 
          onClose={handleClose} 
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          style={{ top: '64px' }}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {message}
          </Alert>
      </Snackbar>
      <Snackbar 
        open={isOpenSuccessFull} 
        autoHideDuration={3000} 
        onClose={handleClose} 
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        style={{ top: '64px' }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <ConfirmDelete
        title="food"
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
        handleDelete={() => handleDeleteItem(item.id)}
      />
    </div>
  );
};

export default MenuCard;
