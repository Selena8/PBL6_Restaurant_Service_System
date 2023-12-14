import React, { useEffect, useReducer } from 'react'
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Box, DialogActions, DialogContent, Divider, Grid } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import TextFieldCustom from '@/components/TextField';
import { capitalize, hasNumber } from '@/utils/parse.util'
// @ts-ignore
import { isEmail, isEmpty } from "validator";

interface AddEmployeeModalProps {
    open: boolean;
    onClose: () => void;
}

const AddEmployeeModal = (props: AddEmployeeModalProps) => {
    //props
    const { onClose, open } = props;

    // useReducer
    const [state, setState] = useReducer(
      (prevState : any, newState: any) => ({
        ...prevState,
        ...newState,
      }),
      {
        name: '',
        email: '',
        address: '',
        phone: '',
        errName: '',
        errorEmail: '',
        errorPhone: '',
        errAddress: ''
      }
    )

    const {name, email, address, phone, errName, errEmail, errPhone, errAddress} = state

    // useEffect
    useEffect(() => {
      if(!open) {
        setState({
          errName: '',
          errPhone: '',
          errEmail: '',
          errAddress: ''
        });
      }
    }, [open])

    //Handle form
    const handleChangeValue = (e: any) => {
      const { name, value } = e.target;
      setState({
        [name]: value,
        [`err${capitalize(name)}`]: ''
      });
    }

    const handleClick = () => {
      validateInput()
    }

    //Function
    const validateInput = () => {
      // const phoneError = !isEmpty(phone) ? validatePhoneNumber(phone) ? '' : 'Invalid phone number' : 'Phone is empty';
      const emailError = !isEmpty(email) ? !isEmail(email) ? 'Please enter a valid email address' : '' : 'Email is empty';
      const nameError = !isEmpty(name) ? !hasNumber(name) ? '' : 'Invalid name' : 'Name is empty'
      const addressError = isEmpty(address) ? 'Address is empty' : ''
    
      setState({
        errName: nameError,
        // errPhone: phoneError,
        errEmail: emailError,
        errAddress: addressError
      });
    }
  

    return (
      <Dialog 
        onClose={onClose} 
        open={open}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "900px",  // Set your width here
            },
          },
        }}
      >
        <DialogTitle sx={{textAlign: "center"}}>ADD EMPLOYEE</DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container alignItems="center">
            <Grid item xs={3}>
                <Box className="relative">
                    <img width="100%" src="/assets/images/user-1.jpg" />
                    <label htmlFor="contained-button-file" className="absolute right-[140px] bottom-[4px] cursor-pointer">
                        <input
                          accept="image/*"
                          id="contained-button-file"
                          multiple
                          type="file"
                          style={{display: "none"}}
                          // onChange={handleUploadClick}
                        />
                        <CameraAltIcon/>
                    </label>
                </Box>
            </Grid>
            <Grid item xs={9} className='w-full px-4'>
                <Box className="flex gap-4">
                    <Box className="w-[50%]">
                      <TextFieldCustom
                        fullWidth={true}
                        type='text'
                        label='Name'
                        name='name'
                        value={name}
                        onChange={handleChangeValue}
                      />
                      <p className="ml-[15px] my-[8px] text-[red]">{errName}</p>
                    </Box>
                    <Box className="w-[50%]">
                      <TextFieldCustom
                        fullWidth={true}
                        type='text'
                        label='Address'
                        name='address'
                        value={address}
                        onChange={handleChangeValue}
                      />
                      <p className="ml-[15px] my-[8px] text-[red]">{errAddress}</p>
                    </Box>
                </Box>
                <Box className="flex gap-4">
                    <Box className="w-[50%]">
                      <TextFieldCustom
                        fullWidth={true}
                        type='text'
                        label='Email'
                        name='email'
                        value={email}
                        onChange={handleChangeValue}
                      />
                      <p className="ml-[15px] mt-[8px] text-[red]">{errEmail}</p>
                    </Box>
                    <Box className="w-[50%]">
                      <TextFieldCustom
                        fullWidth={true}
                        type='text'
                        label='Phone'
                        name='phone'
                        value={phone}
                        onChange={handleChangeValue}
                      />
                      <p className="ml-[15px] mt-[8px] text-[red]">{errPhone}</p>
                    </Box>
                </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
        <Button variant="contained" color="success" className="bg-[#D9D9D9] hover:bg-[#D9D9D9] hover:opacity-90 text-black" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="success" className="bg-green-700 w-[100px]" onClick={handleClick}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    );
}

export default AddEmployeeModal
