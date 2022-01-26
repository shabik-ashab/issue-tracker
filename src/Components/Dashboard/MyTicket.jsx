import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Ticket from './Ticket';
import useAuth from '../../hooks/useAuth';

const MyTicket = () => {
    const [tickets,setTickets] = useState([]);
    const {user} = useAuth();
    

    useEffect(() => {
        fetch('http://localhost:5000/tickets') 
        .then((res) => res.json())
          .then((data) => {
            setTickets(data);
          });
      }, [])
      // filter ticket assign to current user       
      const myTicket = tickets.filter((t) => t.email == user.email);

  return <>
    <Container >
       <Box>
       {
            myTicket.map((ticket) => (
                <Box sx={{mb:1,width:"90%",border:'1px solid #546e7a',p:1}}>
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
