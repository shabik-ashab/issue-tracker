import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Ticket from './Ticket';

const MyTicket = () => {
    const [tickets,setTickets] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/tickets') 
        .then((res) => res.json())
          .then((data) => {
            setTickets(data);
          });
      }, [])
      console.log(tickets);
  return <>
    <Container >
       <Box>
       {
            tickets.map((ticket) => (
                <Box sx={{mb:1,width:"90%",border:'1px solid black',p:1}}>
                    <Typography variant='h6'>
                            {ticket.title}
                    </Typography>
                    <Typography>
                        {ticket.details}
                    </Typography>
                </Box>
            ))
        }
       </Box>

    </Container>
  </>;
};

export default MyTicket;
