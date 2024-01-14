'use client';

import { Delete, Edit, GridView, Search } from "@mui/icons-material";
import { Box, Button, Grid, IconButton, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ActiveViewContext } from "../store/active-view-context";
import { useContext } from "react";
import SimpleAlert from "./SimpleAlert";

export default function CategoryView() {

    const [categoryList, setCategoryList] = useState([]);

    const {handleActiveView} =useContext(ActiveViewContext);

    const [showSimpleAlert,setShowSimpleAlert] = useState(false);

    const [alertData, setAlertData] = useState({
        title: "Success",
        message: "This is sample message"
    });

    const handleConfirmDelete = id => {
        setShowSimpleAlert(false);
    };

    const handleDeleteCategory = id => {
        setAlertData({
            title: "Confirm ?",
            message: "Are you sure you want to delete ?"
        })
        setShowSimpleAlert(true);  
    }
    
    useEffect(
        ()=>{
            const token = localStorage.getItem('token');
        
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
            
            axios({
                method: "get",
                url: "http://localhost:3001/api/categories"
            }).then(response=>{
                setCategoryList(response.data);
            })

            
        }, []
    );


    return (
        <>
        {
            showSimpleAlert ? <SimpleAlert handleOkay={handleConfirmDelete} title={alertData.title} message={alertData.message} /> : null
        }
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: 30, marginTop:10 }}>
            
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                <Grid item xs={1}>
                    <GridView />
                </Grid>
                <Grid item xs={1}>
                <Typography variant="h5" component="h5">
                        Category
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth variant="outlined" InputProps={{
                        startAdornment: <InputAdornment position="start">
                            <IconButton aria-label="search categories" edge="start">
                                <Search />
                            </IconButton>
                        </InputAdornment>
                    }} />
                </Grid>
                <Grid item xs={4} textAlign="right">
                    <Button variant="contained" onClick={()=> handleActiveView("AddCategory")}>Add new</Button>
                </Grid>
            </Grid>
            <Grid container >
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell >Description</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                categoryList.map(row=> {
                                    return (<TableRow key={row.id}>
                                        <TableCell>{row.id}</TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.description}</TableCell>
                                        <TableBody>{row.isActive ? <p>Active</p> : <p>inactive</p> }</TableBody>
                                        <TableCell>
                                            <IconButton>
                                                <Edit />
                                            </IconButton>
                                            <IconButton onClick={()=>{
                                                handleDeleteCategory(row.id);
                                            }}>
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>)
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Box>
        </>
    );

};