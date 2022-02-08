import { Button, Container, Typography,TextField, CircularProgress  } from "@mui/material";
import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Link, NavLink, useHistory } from "react-router-dom";
import core from '../images/core.svg'
import SelectTeam from "./SelectTeam";
import Header from "./Header";

const Choose = () => {
  const { logOut, user,isLoading,users } = useAuth();
  const [success, setSuccess] = React.useState(false);
  const [loginData, setLoginData] = React.useState({
    email:user.email,
  });
  

  const history = useHistory();

  const [role, setRole] = React.useState("");
 
  const handleChange = (e) => {
    setRole(e.target.value);
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
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
                    history.replace('/dash')
                }
            })

  }
  const userInfo = users.find((currentUser) => currentUser.email == user.email);
  
  return (
    <>
     <Header/>
    
    <Container>
     <Grid container spacing={2}>
      {    userInfo?.role ?
          <Grid item xs={6}>
            <Box sx={{mt:5}}>
            <Typography variant="h4">
              Hello {user.displayName},<br />
             You have already choose a role
               </Typography> 
               <Typography sx={{mt:3}}>
                 <span>Go to </span>
                 <Link to="/dash">
                      Dasboard
                 </Link>
                 <span> Or 
                 <Button onClick={()=>logOut(history)} >
                  logout
                 </Button>
                 </span>
               </Typography>
            </Box>

          </Grid>
         :        
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
                   label="Role"
                   onChange={handleChange}
                   name="role"
                  //  onBlur={handleOnBlur}
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
                   <Box sx={{ flexDirection: 'row',mt:3 }}>
                 <Button sx={{mr:2 }} onClick={handleTeamConfirm} variant="contained">
               confirm
             </Button>
             <Button onClick={()=>logOut(history)} variant="contained">
               logout
             </Button>
             </Box>
                   </Box>
                   
                 }
                 {
                   role == "dev" &&
                   <Box sx={{mt:3}}>
                     <Typography>
                     choose a team
                   </Typography>
                   <SelectTeam
                   loginData = {loginData}
                   />
                   </Box>
                 }
                 
               </FormControl>
               {isLoading && <CircularProgress />}
             </Box>
             }
         </Grid>
      }
       <Grid item xs={6}>
       <Box className="core-img">
         <img src={core} />
       </Box>
         
         
       </Grid>
     </Grid>
   </Container>
    </>
  );
};

export default Choose;
