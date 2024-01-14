
import { ArrowBack } from "@mui/icons-material"
import { Box, Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"

export default function AddCategory(){

    return(
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: 30, marginTop:10 }}>
            <Grid container >
                <Grid item>
                    <IconButton>
                        <ArrowBack />
                    </IconButton>
                </Grid>
                <Grid item>
                    <Typography variant="h5">
                        Add Category
                    </Typography>
                </Grid>
            </Grid>

            <Grid container spacing={2} sx={{marginTop:2}} >
                <Grid item xs={4} >
                    <TextField fullWidth label="Category Name" variant="outlined" focused />
                </Grid>
                <Grid item xs={4} >
                    <TextField fullWidth label="Description" variant="outlined" focused />
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
            <Grid container direction="row" xs={10} justifyContent="right" alignContent="flex-end">
            <Grid container spacing={2} direction="row-reverse" justifyContent="right" xs={6} >
                <Grid item xs={4}>
                    <Button variant="contained" sx={{borderRadius:5 }} fullWidth >
                        Save
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    <Button variant="outlined" sx={{borderRadius:5}} fullWidth>
                        Cancel
                    </Button>
                </Grid>
            </Grid>
            </Grid>
            

        </Box>
    )
};