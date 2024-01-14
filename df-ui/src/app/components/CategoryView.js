'use client';

import { Delete, Edit, GridView, Search } from "@mui/icons-material";
import { Box, Button, Grid, IconButton, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CategoryView() {

    const [categoryList, setCategoryList] = useState([]);
    
    useEffect(
        ()=>{
            axios({
                method: "get",
                url: "http://localhost:3001/categories"
            }).then(response=>{
                setCategoryList(response.data);
            })

            
        }, []
    );

    return (
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
                <Grid item xs={2}>
                    <Button variant="contained">Add new</Button>
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
                                            <IconButton>
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
    );

};