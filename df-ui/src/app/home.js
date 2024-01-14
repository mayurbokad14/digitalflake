'use client';

import { MenuItem, Menu, AppBar, Avatar, Box, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import React, { useState } from 'react';
import sitelogo from "./DF_Icon-200x200.png";
import CssBaseline from '@mui/material/CssBaseline';
import DFAppDrawer from "./components/DFAppDrawer";
import CategoryView from "./components/CategoryView";
import HomeView from "./components/Homeview";
import AddCategory from "./components/Addcategory";
import Addproducts from "./components/Addproducts";
import ProductView from "./components/ProductView";
import { ActiveViewContext } from "./store/active-view-context";
import { UserLoggedIn } from "./store/active-view-context";
import { useContext } from "react";
import SimpleAlert from "./components/SimpleAlert";


export default function HomePage() {

    const settings = ['Logout'];
    const [anchorElUser, setAnchorElUser] = useState(null);

    const {handleLoginState} = useContext(UserLoggedIn);


    const logoutUser = ()=>{
        localStorage.removeItem('token');
        handleLoginState(true);
    };

    const [activeView, setActiveView] = useState("Home");

    const viewMap = {
        "Home" : <HomeView />,
        "Category" : <CategoryView />,
        "AddCategory" : <AddCategory />,
        "Addproducts" : <Addproducts />,
        "Products" : <ProductView />
    };

    const [alertData, setAlertData] = useState({
        title: "Success",
        message: "This is sample message"
    });

    const [showSimpleAlert, setShowSimpleAlert] = useState(false);

    const handleLogout = ()=> {
        setAlertData({
            title: "Confirm ?",
            message: "Are you sure you want to logout ?"
        });
        setShowSimpleAlert(true);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleActiveView = (str) => {

        setActiveView(str);
    };

    const ctxVal = {
        activeView: activeView,
        handleActiveView: handleActiveView
    };


    return (
        <ActiveViewContext.Provider value={ctxVal}>

        {
            showSimpleAlert ? <SimpleAlert handleCancel={()=>setShowSimpleAlert(false)} showCancel={true} handleOkay={()=>logoutUser()} title={alertData.title} message={alertData.message} /> : null
        }
        
        <Box >
            <CssBaseline />

            <AppBar position="fixed" sx={{ padding: 0, margin: 0, zIndex: (theme) => theme.zIndex.drawer + 1 }} >
                <Toolbar>
                    <img src={sitelogo.src} style={{ width: "48px" }} />
                    <Typography variant="h5" component="h5" sx={{ flexGrow: 1 }}>

                        <strong>digitial</strong>flake
                    </Typography>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleLogout}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            <DFAppDrawer handleActiveView={handleActiveView} />
            {
                viewMap[activeView]
            }
        </Box>
        </ActiveViewContext.Provider>
    );
}