import { TextField, Button, CircularProgress, Alert,Box } from "@mui/material";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Link, useLocation, useHistory, NavLink } from "react-router-dom";
import React, { useState } from "react";
import useAuth from '../hooks/useAuth';

const Register = () => {
    const [loginData, setLoginData] = useState({});
    const location = useLocation();
    const history = useHistory();
    const redirect_uri = location.state?.from || "/";
  
    const {  registerUser, isLoading, authError, user } =
      useAuth();
    const {signInUsingGoogle} = useAuth();
  
    const handleGoogleLogin = () => {
      signInUsingGoogle(location, history);
    };
    const handleOnBlur = (e) => {
      const field = e.target.name;
      const value = e.target.value;
      const newLoginData = { ...loginData };
      newLoginData[field] = value;
      setLoginData(newLoginData);
    };
    const handleLoginSubmit = (e) => {
      if (loginData.password !== loginData.password2) {
        alert("Your password did not match");
        return;
      }
      registerUser(loginData.email, loginData.password, loginData.name, history);
      e.preventDefault();
    };
    return (
        <div>
             <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={4} sx={{ ml: 24, mt: 20 }}>
            <form onSubmit={handleLoginSubmit} >
            <TextField required id="standard-basic" label="Name" variant="standard"
            sx={{width:'70%',mb:4}}
            onBlur={handleOnBlur}
            />
            <TextField required id="standard-basic" label="Email" variant="standard"
            sx={{width:'70%',mb:4}}
            onBlur={handleOnBlur}
            />
             <TextField type="password" id="standard-basic" label="Password" variant="standard"
            sx={{width:'70%',mb:4}}
            onBlur={handleOnBlur}
            />
             <TextField type="password" id="standard-basic" label="Confirm Password" variant="standard"
            sx={{width:'70%',mb:4}}
            onBlur={handleOnBlur}
            />
             <Button
                  sx={{ width: "65%", mb:2 }}
                  type="submit"
                  variant="contained"
                >
                  Register
                </Button>
            </form>
            <Button
                  sx={{ width: "65%" }}
                  className="mb-3 mt-2"
                  variant="contained"
                  onClick={handleGoogleLogin}
                >
                  google
                </Button>
        </Grid>
        <Grid item xs={6}>
          
        </Grid>
        
      </Grid>
    </Box>
        </div>
    )
}

export default Register
