import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link, Route, Switch } from 'react-router-dom';
import { useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
import useAuth from "../../hooks/useAuth";
import AssignTicketDetails from './AssignTicketDetails';


const Team = ({ users,tickets }) => {
    const {currentUser} = useAuth();
    const teamUsers = users.filter((u) => u.team == currentUser.team);
    const teamTickets = tickets.filter((t) => t.team  == currentUser.team);

    const [locationId,setLocationId] =  useState(false);

    const ticketCount = teamTickets.length;

    const reverseTicket = teamTickets.slice().reverse();
    

    const progress = teamTickets.map((e) => e.progress);

    let Progresscount = 0;
    for(let i in progress){
       
         if(progress[i] == "Complete"){
                Progresscount++; 
                console.log(Progresscount);   
            }
        // console.log(ticket.progress);
    
    }
    const result = Math.round((Progresscount/ ticketCount) * 100);

    let { path, url } = useRouteMatch();

      const handleDetails = () => {
        setLocationId(true);
      }

      const handleGoBack = () => {
        setLocationId(false);
      }
console.log(url);
  return (
    <>
      <Grid container spacing={4}>
         
        <Grid item md={4} xs={12}>
            <Box>
            <Box sx={{backgroundColor: "#e0e0e0",m:1,p:2,width:'70%'}} >
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
                        <Box sx={{backgroundColor: "#e0e0e0",m:1,p:2,width:'90%'}}>
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
            {
                locationId ?
                <Switch>
                <Route path={`${path}/:id`}>
                   <AssignTicketDetails 
                   handleGoBack={handleGoBack}
                   tickets={tickets}
                   />
                </Route>
              </Switch>
                :
                <Box>
       <Typography textAlign="center"  sx={{mb:5,mt:2}} variant='h3'>
        Team Tickets
        </Typography>


                 {reverseTicket.map((ticket) => (
                    <Box
                      sx={{ mb: 1, width: "100%", border: "1px solid #546e7a", p: 1 }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={9}>
                         <Box display="flex" sx={{alignContent: 'center'}}>
                         <Typography  variant="h6">{ticket.title} </Typography>
                          {
                            ticket.urgency == 'Urgent' && 
                            <Box display="flex" sx={{ml:1,mt:.5}} >
                              <Typography sx={{  }} >
                               {ticket.urgency}
                            </Typography>
                            <Box sx={{
                              width:'1vh',
                              height:'1vh',
                              borderRadius:'50%',
                              backgroundColor:"#f57c00",
                              mt:.6,
                              ml:.2
                              
                            }}>
        
                            </Box>
                            </Box>
                          }
                           {
                            ticket.urgency == 'Normal' && 
                            <Box display="flex" sx={{ml:1,mt:.5}} >
                              <Typography sx={{  }} >
                               {ticket.urgency}
                            </Typography>
                            <Box sx={{
                              width:'1vh',
                              height:'1vh',
                              borderRadius:'50%',
                              backgroundColor:"#4caf50",
                              mt:.6,
                              ml:.2
                              
                            }}>
        
                            </Box>
                            </Box>
                          }
                           {
                            ticket.urgency == 'Critical' && 
                            <Box display="flex" sx={{ml:1,mt:.5}} >
                              <Typography sx={{  }} >
                               {ticket.urgency}
                            </Typography>
                            <Box sx={{
                              width:'1vh',
                              height:'1vh',
                              borderRadius:'50%',
                              backgroundColor:"#f44336",
                              mt:.6,
                              ml:.2
                              
                            }}>
        
                            </Box>
                            </Box>
                          }
                         </Box>
                         <Typography sx={{fontSize:'.6em'}}>
                            Created By: {ticket.name}
                           </Typography>
                         {
                           ticket.assign &&
                           <Typography sx={{fontSize:'.6em'}}>
                            Assigned To: {ticket.assign}
                           </Typography>
                         }
                        
                          <Typography>{ticket.details}</Typography>
                        </Grid>
                        
                        <Grid item xs={3}>
                        <Typography sx={{fontSize:'.6em'}}>
                           Created: {ticket.date}
                         </Typography>
                         <Link to={`${url}/${ticket._id}`}>
                        <Button
                            // onClick={() => handledelete(ticket._id)}
                            variant="outlined"
                            color="primary"
                            size="small"
                            onClick={handleDetails}
                            sx={{
                              
                            }}
                          >
                            Add comments
                          </Button>
                          </Link>
                         
                        </Grid>
                      </Grid>
                    </Box>
                  ))}
       </Box>
            }
       
            
        </Grid>
      </Grid>
    </>
  );
};

export default Team;
