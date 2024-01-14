import { ArrowBack } from "@mui/icons-material";
import { Box, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";


export default function Addproducts(){

    return(
        <Box component= "main" sx={{ flexGrow:1, p:3 , marginLeft:30 ,marginTop:10}}>
            <Grid container>
            <Grid item>
                <IconButton>
                    <ArrowBack />
                </IconButton>
            </Grid>
            <Grid item>
                <Typography variant="h5">
                    Add Product
                </Typography>
            </Grid>
        </Grid>
        <Grid container spacing={2} sx={{marginTop:2}} >
                <Grid item xs={4} >
                    <TextField fullWidth label="Category " variant="outlined" focused />
                </Grid>
                <Grid item xs={4} >
                    <TextField fullWidth label="Product Name" variant="outlined" focused />
                </Grid> 
                <Grid item xs={4} >
                    <TextField fullWidth label="Pack Size" variant="outlined" focused />
                </Grid> 
                <Grid item xs={4} >
                    <TextField fullWidth label="MRP" variant="outlined" focused />
                </Grid> 
                <Grid item xs={4} >
                    <TextField fullWidth label="Product Image" variant="outlined" focused />
                </Grid> 
                <Grid item xs={2}>
                    <FormControl fullWidth>
                        <InputLabel id="select-active-label">Status</InputLabel>
                        <Select
                        labelId="select-active-label"
                        label="Status"
                        focused
                        >
                            <MenuItem value={1}>Active</MenuItem>
                            <MenuItem value={0}>inactive</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            
        </Box>
    );

};