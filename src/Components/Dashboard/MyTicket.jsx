import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Ticket from "./Ticket";
import useAuth from "../../hooks/useAuth";
import { Grid } from "@mui/material";

const MyTicket = ({ success }) => {
  const [tickets, setTickets] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const url = `http://localhost:5000/tickets?email=${user.email}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setTickets(data));
  }, [success]);

  const handledelete = (id) => {
    const confirmBox = window.confirm("Do you want to delete this ticket");
    if (confirmBox === true) {
      const url = `http://localhost:5000/tickets/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            alert("deleted sucessfully");
            const remaining = tickets.filter((pd) => pd._id !== id);
            setTickets(remaining);
          }
        });
    }
  };
  
  return (
    <>
      <Container display='flex' sx={{justifyContent: 'center' }}>
        <Box sx={{width: "100%"}}>
        <Typography textAlign="center"  sx={{mb:5,mt:2}} variant='h3'>
        My Tickets
    </Typography>
          {tickets.map((ticket) => (
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
                  <Typography>{ticket.details}</Typography>
                </Grid>
                
                <Grid item xs={2}>
                <Button
                    onClick={() => handledelete(ticket._id)}
                    variant="outlined"
                    color="error"
                    sx={{
                      mt:1
                    }}
                  >
                    Delete
                  </Button>
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
