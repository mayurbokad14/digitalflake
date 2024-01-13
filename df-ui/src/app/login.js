'use client';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Card, Dialog, DialogContent, DialogContentText, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {useState} from 'react';


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function LoginPage() {

    const [showPassword, setShowPasswod] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    const handleShowPassword = (event) => {

        setShowPasswod(prev => {
            return !prev;
        })
    };

    const handleForgotPassword = (event) => {
        setShowForgotPassword(prev => {
            return !prev;
        });
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Dialog
                fullWidth={true}
                maxWidth="sm"
                open={showForgotPassword}
            >
                <DialogContent>
                    <DialogContentText>
                        <Grid container justifyContent="center">
                            <Typography style={{color: "#7e4fa7"}} mt={2} sx={{fontWeight: 'bold'}}>
                                Did you forget your password?
                            </Typography>
                            <Typography>
                                <p>Enter your email address and we'll send you a link to restore password</p>
                            </Typography>
                        </Grid>

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start'
                                }}
                            >
                                
                                <Grid container spacing={1} >
                                    <Grid item xs={6}>
                                    <Typography>
                                        Email Address
                                    </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField fullWidth variant='outlined' />
                                    </Grid>
                                    <Grid container item justifyContent="center">
                                        <Button fullWidth variant='contained'>Request reset link</Button>
                                    </Grid>
                                    <Grid container item justifyContent="center">
                                        <Link href="#" variant="body2" onClick={handleForgotPassword}>
                                            Back to log in
                                        </Link>
                                    </Grid>
                                </Grid>    
                            </Box>

                    </DialogContentText>
                </DialogContent>

            </Dialog>
            
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Card variant='outlined'
                sx={{padding:4, marginTop: 20}}
                >
                <Box
                    sx={{
                        
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    

                    
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h4" >
                        <strong>digital</strong>flake
                    </Typography>

                    <Typography style={{color: "#756f6f"}}>
                        Welcome to Digitalflake Admin
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email ID"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            id="password"
                            autoComplete="current-password"
                            InputProps={{
                                endAdornment : <InputAdornment position='end' ><IconButton aria-label="toggle password visibility" edge="end" onClick={handleShowPassword}> { showPassword ? <Visibility /> : <VisibilityOff /> }  </IconButton>  </InputAdornment>
                            }}
                        />
                        <Grid container >
                            <Grid item xs container justifyContent="flex-end">
                                <Link href="#" variant="body2" onClick={handleForgotPassword}>
                                    Forgot password?
                                </Link>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Log In
                        </Button>
                        
                    </Box>
                    
                </Box>
                </Card>
            </Container>
        </ThemeProvider>
    );
}