'use client';
import { Category , Search } from "@mui/icons-material";
import { TableCell, Box, Grid,  Typography, TextField, InputAdornment, IconButton, Button, TableContainer, Paper, Table, TableHead, TableRow, TableBody } from "@mui/material";

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ActiveViewContext } from "../store/active-view-context";


export default function ProductView() {

    const [productList, setProductList] = useState([]);

    const {handleActiveView} = useContext(ActiveViewContext);
    
    useEffect(
        ()=>{
            const token = localStorage.getItem('token');
        
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
            
            axios({
                method: "get",
                url: "http://localhost:3001/api/products"
            }).then(response=>{
                setProductList(response.data.rows);
            })

            
        }, []
    );

    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: 30, marginTop: 10 }}>
            <Grid container rowSpacing={1} >
                <Grid item xs={1}>
                    <Category />
                </Grid>
                <Grid item xs={1}>
                    <Typography variant="h5" component="h5">
                        Product
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
                    <Button onClick={()=> handleActiveView("Addproducts")} variant="contained" > Add new </Button>
                </Grid>
            </Grid>

            <Grid container >
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                        <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Pack Size</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>MRP</TableCell>
                                <TableCell>Image</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                productList.map(row => {
                                    return (
                                        <TableRow>
                                            <TableCell>{row.id}</TableCell>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.packsize}</TableCell>
                                            <TableCell>{row.category.name}</TableCell>
                                            <TableCell>{row.MRP}</TableCell>
                                            <TableCell>
                                                <img src={`http://localhost:3001${row.image}`} style={{height:"60px"}} />
                                            </TableCell>
                                            <TableCell>{row.isActive ? "Active" : "inactive"}</TableCell>
                                        </TableRow>
                                    );
                                })
                            }
                        </TableBody>

                    </Table>
                </TableContainer>
            </Grid>
        </Box>

    );
};