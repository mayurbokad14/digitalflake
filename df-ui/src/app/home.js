'use client';

import {MenuItem, Menu, AppBar, Avatar, Box, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import React, {useState} from 'react';
import sitelogo from "./DF_Icon-200x200.png";
import CssBaseline from '@mui/material/CssBaseline';
import DFAppDrawer from "./components/DFAppDrawer";


export default function HomePage(){

    const settings = ['Logout'];
    const [anchorElUser, setAnchorElUser] = useState(null);


    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
        
            <AppBar position="static" sx={{padding:0, margin:0, zIndex: (theme) => theme.zIndex.drawer + 1}} >
                <Toolbar>
                    <img src={sitelogo.src} style={{width:"48px"}} />
                    <Typography variant="h5" component="h5" sx={{flexGrow: 1}}>
                        
                        <strong>digitial</strong>flake
                    </Typography>

                    <Box sx={{flexGrow: 0 }}>
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
                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">{setting}</Typography>
                            </MenuItem>
                        ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            <DFAppDrawer />
        </Box>
    );
}