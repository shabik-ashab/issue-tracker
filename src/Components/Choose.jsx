import { Button, Container, Typography,TextField  } from "@mui/material";
import React from "react";
import useAuth from "../hooks/useAuth";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Choose = () => {
  const { logOut, user } = useAuth();
  const [success, setSuccess] = React.useState(false);
  const [loginData, setLoginData] = React.useState({
    email:user.email,
  });
    
  const [role, setRole] = React.useState("");
 
  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  };

  const handleConfirm = () =>{
    
    fetch('http://localhost:5000/users/role', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
           body: JSON.stringify(loginData),
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    console.log(data);
                    setSuccess(true);
                }
            })

  }

  return (
    <Container>

      <Grid container spacing={2}>
        <Grid item xs={6}>
        <Typography variant="h4">
                Please select your role, {user.displayName}
            </Typography>
            <Box sx={{ width: 220, mt: 6 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                label="Age"
                onChange={handleChange}
                name="role"
                 onBlur={handleOnBlur}
              >
                <MenuItem value={"manager"}>Project manager</MenuItem>
                <MenuItem value={"dev"}>Developer</MenuItem>
              </Select>
              {
                role == "manager" &&
                <Box>
                  <Typography>
                  manager
                </Typography>
                <TextField
                 required
                   id="filled-required"
                  label="Required"
                 variant="filled"
                 name="team"
                 onBlur={handleOnBlur}
                />
                </Box>
              }
              <Button sx={{mt:3}} onClick={handleConfirm} variant="contained">
            confirm
          </Button>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={6}>
        
          <Button onClick={logOut} variant="contained">
            logout
          </Button>
          
        </Grid>
      </Grid>
    </Container>
  );
};

export default Choose;
