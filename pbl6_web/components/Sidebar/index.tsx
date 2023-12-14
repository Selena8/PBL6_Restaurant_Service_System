"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import Link from 'next/link'
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HistoryIcon from "@mui/icons-material/History";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import CategoryIcon from '@mui/icons-material/Category';
import TableBarIcon from '@mui/icons-material/TableBar';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { IconLogo, IconUser, NameLogo } from "@/components/icons";
import { Popover } from "@mui/material";
import { localStorageClient } from "@/utils/localStorage";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from "@/store";
import { resetToken } from "@/store/apps/auth";
interface SideBarProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}
interface Map {
  [key: string]: string | undefined
}

const listItems = [
  {
    pathname: '/admin/dashboard',
    name: "DashBoard",
    icon: <DashboardIcon />,
  },
  {
    pathname: '/admin/menu',
    name: "Menu",
    icon: <MenuIcon />,
  },
  {
    pathname: '/admin/category',
    name: "Category",
    icon: <CategoryIcon />,
  },
  {
    pathname: '/admin/orderhistory',
    name: "Order History",
    icon: <HistoryIcon />,
  },
  {
    pathname: '/admin/users',
    name: "Users",
    icon: <ManageAccountsIcon />,
  },
  {
    pathname: '/admin/staffworkinghour',
    name: "Staff's Working Hour",
    icon: <CalendarMonthIcon />,
  },
  {
    pathname: '/admin/staffworklog',
    name: "Staff's Requestation",
    icon: <QueryBuilderIcon />,
  },
  {
    pathname: '/admin/table',
    name: "Table",
    icon: <TableBarIcon />,
  }

];

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  marginBottom: "32px",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "#fff",
  width: "100%",
  color: "#FE724C",
  fontWeight: "bold",
  boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  backgroundColor: "#0F172B",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": {
      ...openedMixin(theme),
      backgroundColor: "#0F172B",
      color: "#fff",
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": {
      ...closedMixin(theme),
      backgroundColor: "#0F172B",
      color: "#fff",
    },
  }),
}));

const commonTypographyStyles = {
    padding: "8px 24px",
    cursor: "pointer",
    '&:hover': {
        backgroundColor: "#FE724C",
        color: "#fff",
    },
};

const titleMappings: Map = {
  dashboard: 'Dashboard',
  menu: 'Menu',
  category: 'Category',
  staff: 'Staff',
  orderhistory: 'Order History',
  staffworkinghour: 'Staff Working Hour',
  staffworklog: 'Staff\'s Requestation',
  admin: 'Dashboard',
  profile: 'My Profile',
  table: 'Table'
};

export default function SideBar({open, setOpen}: SideBarProps) {
  const currentPage = usePathname();
  const pathSegments = currentPage?.split('/');
  const lastSegment = pathSegments.length <= 3 ? pathSegments?.[pathSegments.length - 1] : pathSegments?.[pathSegments.length - 2] ?? null;
  
  const { userInfo } = useSelector(
    (state: any) => state.auth
  );
  
  const theme = useTheme();
  const [openPopup, setOpenPopup] = useState(false) 
  const [title, setTitle] = useState("")

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const dispatch = useDispatch<AppDispatch>()

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSignOut = () => {
    localStorageClient.removeItem("userToken")
    dispatch(resetToken())
  }

  useEffect(() => {
    if(lastSegment) {
      const newTitle = (str: string) => titleMappings[lastSegment] || "MENU"
      setTitle(newTitle); 
    }
  }, [lastSegment]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar className="justify-between">
            <Box className="flex items-center gap-4">
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                    marginRight: 5,
                    ...(open && { display: "none" }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <IconButton
                    onClick={handleDrawerClose}
                    sx={{
                    ...(!open && { display: "none" }),
                    }}
                >
                    {theme.direction === "rtl" ? (
                    <ChevronRightIcon />
                    ) : (
                    <ChevronLeftIcon />
                    )}
                </IconButton>
                <Typography className="uppercase" variant="h6" noWrap component="div">
                    {title}
                </Typography>
            </Box>
          <Box sx={{display: "flex", gap: "8px"}}>
            <Typography variant="body1" sx={{color: "black", display: "flex", alignItems: "center"}}>{userInfo.email || ""}</Typography>
            <img src={userInfo.avatar || "/assets/images/user-1.jpg"} alt="" style={{cursor: "pointer", borderRadius: "50%"}} width={40} onClick={() => setOpenPopup(!openPopup)}/>
            <Popover
              open={openPopup}
              anchorEl={anchorEl}
              onClose={() => setOpenPopup(false)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              sx={{
                "& .MuiPopover-paper": {
                    top: "63px!important",
                    right: "10px",
                    left: "unset!important",
                  },
              }}
            >
                <Typography sx={commonTypographyStyles}>
                  <Link href="/admin/profile" onClick={() => setOpenPopup(false)}>My profile</Link>
                </Typography>
                <Typography sx={commonTypographyStyles}>
                  <Link href="/signin" onClick={() => handleSignOut()}>Sign out</Link>
                </Typography>
            </Popover>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Box className="flex w-[80%] gap-2">
            <img src={IconLogo} alt="icon-logo" />
            <img src={NameLogo} alt="name-logo" />
          </Box>
        </DrawerHeader>
        <Divider />
        <List>
          {listItems.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <Link href={item.pathname}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "#fff",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
