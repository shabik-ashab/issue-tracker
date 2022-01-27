import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Ticket from "./Ticket";
import useAuth from "../../hooks/useAuth";
import { Grid } from "@mui/material";

const MyTicket = ({ success }) => {
  const [tickets, setTickets] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetch("http://localhost:5000/tickets")
      .then((res) => res.json())
      .then((data) => {
        setTickets(data);
      });
  }, [success]);
  // filter ticket assign to current user
  const myTicket = tickets.filter((t) => t.email == user.email);
  console.log(myTicket);

  return (
    <>
      <Container display='flex' sx={{justifyContent: 'center' }}>
        <Box sx={{width: "100%"}}>
        <Typography textAlign="center"  sx={{mb:5,mt:2}} variant='h3'>
        My Tickets
    </Typography>
          {myTicket.map((ticket) => (
            <Box
              sx={{ mb: 1, width: "100%", border: "1px solid #546e7a", p: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={8}>
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
                  <Typography>{ticket.details}</Typography>
                </Grid>
                
                <Grid item xs={2}>

                </Grid>
              </Grid>
            </Box>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default MyTicket;
