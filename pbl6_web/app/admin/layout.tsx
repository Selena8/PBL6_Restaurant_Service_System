"use client"
import SideBar from '@/components/Sidebar';
import { localStorageClient } from '@/utils/localStorage';
import { Backdrop, Box, CircularProgress, StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material';
import React, {ReactNode, useEffect, useState} from 'react';
import { Provider, useDispatch } from "react-redux";
import { AppDispatch, store } from "@/store";
import { getUserDetail } from "@/store/apps/auth";
import { useRouter } from "next/navigation";

type Props = {
    children: ReactNode
}

const Layout = (props: Props) => {
    const [open, setOpen] = useState(true);
    const dispatch = useDispatch<AppDispatch>();
    const token = localStorageClient.getItem("userToken");
    const [isClient, setIsClient] = useState(false)
    const router = useRouter()
    const theme = createTheme();
    const [loading, setLoading] = useState(false) 

    useEffect(() => {
      setIsClient(true)
    }, [])

    useEffect(() => {
      if (token) {
        dispatch(getUserDetail({token}))
      } else {
        setLoading(true);
        router.push('/signin');
      }
    }, [token]);

    const handleClose = () => {
      setLoading(false);
    };

    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <StyledEngineProvider injectFirst>
            {
                isClient && token ? (
                  <div className='w-full h-full' style={{marginTop: "64px"}}>
                <SideBar open={open} setOpen={setOpen}/>
                <Box 
                  component="main" 
                  sx={{ 
                    flexGrow: 1, 
                    p: 3, 
                    backgroundColor: "#F0F1F6!important", 
                    marginLeft: open ? "240px" : "64px",
                    height: "100%"
                  }}>
                  {props.children}
                </Box>
              </div>
                ) : (
                  <Backdrop
                    sx={{ color: '#FE724C', background: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                    onClick={handleClose}
                  >
                    <CircularProgress color="inherit" />
                  </Backdrop>
                )
              }
          </StyledEngineProvider>
        </ThemeProvider>
        
      </Provider>
    );
};

export default Layout;