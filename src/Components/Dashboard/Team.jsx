import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import useAuth from "../../hooks/useAuth";


const Team = ({ users }) => {
    const {currentUser} = useAuth();
    const teamUsers = users.filter((u) => u.team == currentUser.team);
    
  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
        <Typography  sx={{mb:5,mt:2,ml:1}} variant='h5'>
          Team Members 
         </Typography>
         <Box>
              {
                    teamUsers.map((user) => (
                        <Box sx={{backgroundColor: "#e0e0e0",m:1,p:2,width:'50%'}}>
                            {user.displayName}
                            <Typography>
                              Role: {user.role}
                            </Typography>
                        </Box>
                    ))
              }  
         </Box>
        </Grid>
        <Grid item md={6} xs={12}>

        </Grid>
      </Grid>
    </>
  );
};

export default Team;
