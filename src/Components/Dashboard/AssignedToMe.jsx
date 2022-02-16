import { Container, Grid, Typography, FormControl, Select, MenuItem, InputLabel, Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'


const AssignedToMe = () => {
    const {user} = useAuth();
    const [tickets, setTickets] = useState([]);
    const [loginData, setLoginData] = React.useState({
       assign:user.displayName,
    });

    const handleChange = (e) => {

        const id = e.target.id;
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
      };

    useEffect(() => {
        const url = `http://localhost:5000/tickets`;
        fetch(url)
          .then((res) => res.json())
          .then((data) => setTickets(data));
      }, []);

      const handleConfirm = (id) => {
        //   e.preventDefault();
        const url = `http://localhost:5000/tickets/${id}`;
        fetch(url, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(loginData),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount === 1) {
              alert("changed sucessfully");
            }
            // alert("");
          })
          .finally();
      }

      const assignTicket = tickets.filter((ticket) => ticket.assign == user.displayName);
      console.log(loginData);
  return (
    <>
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
                
                <Grid item xs={4}>
                <Typography sx={{fontSize:'.6em'}}>
                   Created: {ticket.date}
                 </Typography>
                 <FormControl  variant="standard" sx={{ pb: 1, minWidth: 100 }}>
         
         <InputLabel >Progress status</InputLabel>
          <Select
          
            value={loginData.progress}
            label="Assign to"
            onChange={handleChange}
            name="progress"
            id={ticket._id}
           //  onBlur={handleOnBlur}
          >
           
                 <MenuItem value="Working On">Working On</MenuItem>
                 <MenuItem value="Complete">Complete</MenuItem>
             
          </Select>
     
          
        </FormControl>

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
                    {ticket.progress}
                <Button sx={{mt:2}} onClick={() => handleConfirm(ticket._id)} variant="outlined">confirm</Button>
                </Grid>
              </Grid>
            </Box>
          ))}

    </Container>
    </>
  )
}

export default AssignedToMe