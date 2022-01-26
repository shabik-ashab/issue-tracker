import { Box, Button, Container,Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { TextField } from '@mui/material';
import useAuth from '../../hooks/useAuth';


const Ticket = () => {
    const { user } = useAuth();

    const initialInfo = { name: user.displayName, email: user.email };
    const [newData, setNewData] = useState(initialInfo);

    const handleOnBlur = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newFormData = { ...newData };
        newFormData[field] = value;
        setNewData(newFormData);
      };
      console.log(newData);
    const handleSubmit = (e) =>{
      e.preventDefault();
    }
  return <>
     <Container>
     <Grid container spacing={2}>
  <Grid item xs={12} md={6}>
  <Box > 
  <Typography 	textAlign="center" variant="h3" sx={{mt:3,mb:5}}>
            create ticket
 </Typography>
 <form onSubmit={handleSubmit} >
   <TextField
            sx={{
                width:'40vh',
                mb:3
            }}
          
          label="Name"
          defaultValue={user.displayName}
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        />
        <br />
        <TextField
            sx={{
                width:'40vh',
                mb:3
            }}
        
          label="Email"
          defaultValue={user.email}
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        />
        <br />
        <TextField
            sx={{
                width:'40vh',
                mb:3
            }}
            name="title"
          label="ticket title"
          variant="standard"
          onBlur={handleOnBlur}
        />
        <br />
        <TextField
        sx={{
          width:'40vh',
          mb:3
      }}
          label="ticket details"
          multiline
          rows={4}
          variant="standard"
          name="details"
          onBlur={handleOnBlur}
        />
        <br />
        <Button type="submit" variant="outlined">Submit</Button>
   </form>

 </Box>
  </Grid>
  <Grid item  xs={12} md={6}>
    ok
  </Grid>
 
</Grid>
     </Container>
      </>;
};

export default Ticket;
