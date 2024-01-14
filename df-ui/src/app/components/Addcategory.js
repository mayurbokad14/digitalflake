
import { ArrowBack } from "@mui/icons-material"
import { Box, Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useState } from "react"

import axios from "axios";
import SimpleAlert from "./SimpleAlert";

import { useContext, useEffect } from "react";
import { ActiveViewContext } from "../store/active-view-context";

export default function AddCategory() {

    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);
    const [isActive, setIsActive] = useState(false);

    const [showSimpleAlert, setShowSimpleAlert] = useState(false);

    const {handleActiveView} = useContext(ActiveViewContext);

    const [alertData, setAlertData] = useState({
        title: "Success",
        message: "This is sample message"
    });

    const handleName = (e) => {
        const name = e.target.value;
        setName(name);
    };

    const handleDescription = e => {
        const description = e.target.value;
        setDescription(description);
    };

    const handleIsActive = e => {
        const val = e.target.value;
        setIsActive(val === "1" || val === 1);
    };

    useEffect(() => {
        // Check if the user is already logged in (token exists)
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, []);

    const submitCategory = async (categoryData) => {
        try {
            // Replace 'http://localhost:3000' with your actual server URL
            const apiUrl = 'http://localhost:3001/api/category';

            // Make a POST request to create a new category
            const response = await axios.post(apiUrl, categoryData);

            // Handle the response (you can customize this based on your needs)
            console.log('Category created successfully:', response.data);

            setAlertData({
                title: "success",
                message: "Category created successfully:"
            });
            
            setShowSimpleAlert(true);

            return response.data; // You may return the created category data if needed
        } catch (error) {
            // Handle errors (you can customize this based on your needs)
            console.error('Error creating category:', error);

            setAlertData({
                title: "Failed",
                message: "Error creating category"
            });

            setShowSimpleAlert(true);

            throw error; // You may choose to throw the error for further handling
        }
    };



    const addNewCategory = e => {

        const payload = { name, description, isActive };

        submitCategory(payload);
        //setShowSimpleAlert(true);
    };

    const closeAlert = e => {
        setShowSimpleAlert(false);
    };

    return (
        <>
        {
            showSimpleAlert ? <SimpleAlert handleOkay={closeAlert} title={alertData.title} message={alertData.message} /> : null
        }
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: 30, marginTop: 10 }}>
            <Grid container >
                <Grid item>
                    <IconButton onClick={()=> handleActiveView("Category")}>
                        <ArrowBack />
                    </IconButton>
                </Grid>
                <Grid item>
                    <Typography variant="h5">
                        Add Category
                    </Typography>
                </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ marginTop: 2 }} >
                <Grid item xs={4} >
                    <TextField fullWidth label="Category Name" variant="outlined" focused onChange={handleName} />
                </Grid>
                <Grid item xs={4} >
                    <TextField fullWidth label="Description" variant="outlined" focused onChange={handleDescription} />
                </Grid>
                <Grid item xs={2}>
                    <FormControl fullWidth>
                        <InputLabel id="select-active-label">Status</InputLabel>
                        <Select
                            labelId="select-active-label"
                            label="Status"
                            focused
                            onChange={handleIsActive}
                        >
                            <MenuItem value={1}>Active</MenuItem>
                            <MenuItem value={0}>inactive</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container direction="row" xs={10} justifyContent="right" alignContent="flex-end">
                <Grid container spacing={6} direction="row-reverse" justifyContent="right" alignItems="float-right" xs={6} marginTop={80}>
                    <Grid item xs={4}>
                        <Button variant="contained" sx={{ borderRadius: 5 }} fullWidth onClick={addNewCategory}>
                            Save
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button onClick={()=> handleActiveView("Category")} variant="outlined" sx={{ borderRadius: 5 }} fullWidth>
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </Grid>


        </Box>
        </>
    )
};