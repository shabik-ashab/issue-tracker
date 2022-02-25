import { Container, Grid, Typography, FormControl, Select, MenuItem, InputLabel, Button, TextField, Alert } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { Link, Route, Switch } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import useAuth from '../../hooks/useAuth'
import AssignTicketDetails from './AssignTicketDetails';
import { useLocation } from 'react-router-dom';


const AssignedToMe = () => {
    const {user} = useAuth();
   
    const [tickets, setTickets] = useState([]);
    const [locationId,setLocationId] =  useState("");
    const [confirm,setConfirm] = useState(false);
    
    useEffect(() => {
        const url = `http://localhost:5000/tickets`;
        fetch(url)
          .then((res) => res.json())
          .then((data) => setTickets(data));
      }, [confirm]);

      let { path, url } = useRouteMatch();
      const location = useLocation();
      const locatioId = location.pathname.slice(16,20);

      const handleDetails = () => {
        setLocationId(locatioId);
      }

      const handleGoBack = () => {
        setLocationId("");
        setConfirm(true)
      }

      const assignTicket = tickets.filter((ticket) => ticket.assign == user.displayName);
  return (
    <>
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
        <Container>
        <Typography textAlign="center"  sx={{mb:5,mt:2}} variant='h3'>
            Assigned Ticket 
        </Typography>
        {assignTicket.map((ticket) => (
                <Box
                  sx={{ mb: 1, width: "100%", border: "1px solid #546e7a", p: 1 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={5}>
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
                      <Typography>{ticket.details}</Typography>
                      
    
                    </Grid>
                    {/* choose progres  */}
                    <Grid item xs={4}>
                    <Typography sx={{fontSize:'.6em'}}>
                       Created: {ticket.date}
                     </Typography  >
                     {
                          ticket.progress == "Working On" &&
                          <Alert severity="info">Already working on </Alert>

                     }
                     {
                          ticket.progress == "Complete" &&
                          <Alert severity="success">issue is resolved!</Alert>
                     }
                     {
                         !ticket.progress &&
                         <Alert severity="warning"> Ticket need  attention!</Alert>
                     }
    
                    {/* <Button
                        onClick={() => handledelete(ticket._id)}
                        variant="outlined"
                        color="error"
                        sx={{
                          
                        }}
                      >
                        Delete
                      </Button> */}
                     
                    </Grid>
                    <Grid item xs={3}>
                       
                   
                    <Link to={`${url}/${ticket._id}`}>
                    <Button onClick={handleDetails} sx={{mt:2}} variant="outlined">details</Button>
                    </Link>
                    </Grid>
                  </Grid>
                  
                </Box>
              ))}
        </Container>
    }
   
   
    </>
  )
}

export default AssignedToMe