
import { Box, Grid, Typography } from "@mui/material";
import sitelogo from "../DF_Icon-200x200.png";

export default function HomeView(){

    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: 30, marginTop:10 }}>
            <Grid
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{marginTop:"10%"}}
            >
                <img src={sitelogo.src} style={{width: "48px"}} />
                <Typography variant="h4" component="h2" sx={{ flexGrow : 4}}>
                <strong>digital</strong>flake
                </Typography>
                <Typography variant="h6" >
                Welcome to Digitalflake Admin
                </Typography>
            </Grid>
        </Box>
    )
};