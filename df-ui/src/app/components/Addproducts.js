import { ArrowBack } from "@mui/icons-material";
import { Box, Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";

import { ActiveViewContext } from "../store/active-view-context";
import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import SimpleAlert from "./SimpleAlert";

export default function Addproducts() {

    const [categoryList, setCategoryList] = useState([]);

    const {handleActiveView} = useContext(ActiveViewContext);

    const [name, setName] = useState(null);
    const [packsize, setPacksize] = useState(null);
    const [categoryId, setCategoryId] = useState(null);
    const [MRP, setMRP] = useState(0);
    const [image, setIamge] = useState(null);
    const [isActive, setIsActive] = useState(false);

    const [showSimpleAlert, setShowSimpleAlert] = useState(false);

    const [alertData, setAlertData] = useState({
        title: "Success",
        message: "This is sample message"
    });

    const fileInputRef = useRef(null);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handlePacksizeChange = (event) => {
        setPacksize(event.target.value);
    };

    const handleCategoryIdChange = (event) => {
        setCategoryId(event.target.value);
    };

    const handleMRPChange = (event) => {
        setMRP(parseFloat(event.target.value)); // Assuming MRP is a numeric value
    };

    const handleImageChange = (event) => {
        setImage(event.target.value);
    };

    const handleIsActiveChange = (e) => {
        const val = e.target.value;
        setIsActive(val === "1" || val === 1);
    };



    useEffect(
        () => {
            const token = localStorage.getItem('token');
        
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
            
            axios({
                method: "get",
                url: "http://localhost:3001/api/categories"
            }).then(response => {
                setCategoryList(response.data);
            })


        }, []
    );

    const handleCloseAlert = e => {
        setShowSimpleAlert(false);
    };

    const submitProduct = async (productData) => {
        try {

            //name,packsize,categoryId,MRP,image,isActive

            const formData = new FormData();
            formData.append("name",productData.name);
            formData.append("packsize",productData.packsize);
            formData.append("categoryId",productData.categoryId);
            formData.append("MRP",productData.MRP);
            formData.append("isActive",productData.isActive);

            // Append the file from the file input ref
            if (fileInputRef.current && fileInputRef.current.files.length > 0) {
                formData.append('image', fileInputRef.current.files[0]);
            }


            const apiUrl = 'http://localhost:3001/api/product';

            const response = await axios.post(apiUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(`Product added successfully:`, response.data);

            setAlertData({
                title: "success",
                message: "product created successfully:"
            });

            setShowSimpleAlert(true);

            return response.data; // You may return the created/updated product data if needed
        } catch (error) {
            // Handle errors (you can customize this based on your needs)
            console.error('Error submitting/updating product:', error);

            setAlertData({
                title: "Failed",
                message: "Error creating product"
            });

            setShowSimpleAlert(true);

            throw error; // You may choose to throw the error for further handling
        }
    };

    const addNewProduct = e => {
        const payload = {name,packsize,categoryId,MRP,image,isActive};
        submitProduct(payload);
    };

    return (
        <>
        {
            showSimpleAlert ? <SimpleAlert handleOkay={handleCloseAlert} title={alertData.title} message={alertData.message} /> : null
        }
            <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: 30, marginTop: 10 }}>
                <Grid container>
                    <Grid item>
                        <IconButton onClick={()=>handleActiveView("Products")} >
                            <ArrowBack />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <Typography variant="h5">
                            Add Product
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ marginTop: 2 }} >
                    <Grid item xs={4} >
                        <FormControl fullWidth>
                            <InputLabel id="select-category-label">Category</InputLabel>
                            <Select
                                labelId="select-category-label"
                                label="Category"
                                focused
                                onChange={handleCategoryIdChange}
                            >
                                {
                                    categoryList.map(row => {
                                        return <MenuItem value={row.id} key={row.id}>{row.name}</MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4} >
                        <TextField onChange={handleNameChange} fullWidth label="Product Name" variant="outlined" focused />
                    </Grid>
                    <Grid item xs={4} >
                        <TextField onChange={handlePacksizeChange} fullWidth label="Pack Size" variant="outlined" focused />
                    </Grid>
                    <Grid item xs={4} >
                        <TextField onChange={handleMRPChange} fullWidth label="MRP" variant="outlined" focused />
                    </Grid>
                    <Grid item xs={4} >
                        <TextField inputRef={fileInputRef}  fullWidth type={"file"} inputProps={{accept:"image/*"}} label="Product Image" variant="outlined" focused />
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl fullWidth>
                            <InputLabel id="select-active-label">Status</InputLabel>
                            <Select
                                labelId="select-active-label"
                                label="Status"
                                focused
                                onChange={handleIsActiveChange}
                            >
                                <MenuItem value={1}>Active</MenuItem>
                                <MenuItem value={0}>inactive</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container direction="row" xs={10} justifyContent="right" alignContent="flex-end">
                    <Grid container spacing={6} direction= "row-reverse" justifyContent="right" alignItems="float-right" xs={6} marginTop={70}>
                        <Grid item xs={4}>
                            <Button variant="contained" sx={{borderRadius:5}} fullWidth onClick={addNewProduct}>
                                Save
                            </Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button onClick={()=>handleActiveView("Products")}   variant="outlined" sx={{ borderRadius: 5 }} fullWidth>
                                Cancel
                            </Button>
                        </Grid>
                     </Grid>
                </Grid>
            </Box>
        </>
    );

};