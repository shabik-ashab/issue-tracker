import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import useAuth from "../../hooks/useAuth";


const Team = ({ users,tickets }) => {
    const {currentUser} = useAuth();
    const teamUsers = users.filter((u) => u.team == currentUser.team);
    const teamTickets = tickets.filter((t) => t.team  == currentUser.team)

    const ticketCount = teamTickets.length;
    

    const progress = teamTickets.map((e) => e.progress);

    let Progresscount = 0;
    for(let i in progress){
       
         if(progress[i] == "Complete"){
                Progresscount++; 
                console.log(Progresscount);   
            }
        // console.log(ticket.progress);
    
    }
    const result = Math.round((Progresscount/ ticketCount) * 100)
  return (
    <>
      <Grid container spacing={2}>
         
        <Grid item md={6} xs={12}>
            <Box>
            <Box sx={{backgroundColor: "#e0e0e0",m:1,p:2,width:'40%'}} >
               All Tickets: {ticketCount}
               <Typography>
                Completed:  {Progresscount}
               </Typography>
               <Typography>
                Completion Rate: {result} %
               </Typography> 
              
            </Box>
            </Box>
        <Typography  sx={{mb:2,mt:2,ml:1}} variant='h5'>
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
