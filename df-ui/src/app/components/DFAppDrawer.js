'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Category, GridView, Home } from '@mui/icons-material';

export default function DFAppDrawer() {
    const drawerWidth = 240;

    const [pageSelected,setPageSelected] = React.useState("Home");

    const pageIcons = {
        Home : <Home />,
        Category : <GridView />,
        Products : <Category />
    }

    const handlePageChange = (text) => {
        setPageSelected(prev=> {
            return text;
        });
    };

    return (
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {["Home","Category","Products"].map((text, index) => (
                            <ListItem key={text} disablePadding  >
                                <ListItemButton selected={text === pageSelected} onClick={(e) => handlePageChange(text)}>
                                    <ListItemIcon>
                                        {pageIcons[text]}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    
                </Box>
            </Drawer>
    );
}