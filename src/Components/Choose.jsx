import { Button, Container, Typography,TextField, CircularProgress  } from "@mui/material";
import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useHistory } from "react-router-dom";
import core from '../images/core.svg'
import SelectTeam from "./SelectTeam";

const Choose = () => {
  const { logOut, user,isLoading } = useAuth();
  const [success, setSuccess] = React.useState(false);
  const [loginData, setLoginData] = React.useState({
    email:user.email,
  });
  

  const history = useHistory();

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

  const handleTeamConfirm = () =>{
    
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
  console.log(loginData);
  // console.log(success);
  return (
    <Container>

      <Grid container spacing={2}>
        <Grid item xs={6}>
        <Typography variant="h4">
                Please select your role, {user.displayName}
            </Typography>
            {
              !success && <Box sx={{ width: 220, mt: 6 }}>
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
                  <Box sx={{mt:3}}>
                    <Typography>
                    Create a team
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
                {
                  role == "dev" &&
                  <Box sx={{mt:3}}>
                    <Typography>
                    choose a team
                  </Typography>
                  <SelectTeam />
                  </Box>
                }
                <Box sx={{ flexDirection: 'row',mt:3 }}>
                <Button sx={{mr:2 }} onClick={handleTeamConfirm} variant="contained">
              confirm
            </Button>
            <Button onClick={()=>logOut(history)} variant="contained">
              logout
            </Button>
            </Box>
              </FormControl>
              {isLoading && <CircularProgress />}
            </Box>
            }
        </Grid>
        <Grid item xs={6}>
        <Box className="core-img">
          <img src={core} />
        </Box>
          
          
        </Grid>
      </Grid>
    </Container>
  );
};

export default Choose;
