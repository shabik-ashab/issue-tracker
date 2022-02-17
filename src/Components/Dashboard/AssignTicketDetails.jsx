import { Container, Grid, Typography, FormControl, Select, MenuItem, InputLabel, Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import useAuth from '../../hooks/useAuth';
import { Box } from '@mui/material';
import { NavLink } from 'react-router-dom';


const AssignTicketDetails = ({handleGoBack,tickets}) => {
    const {user} = useAuth();
    const [loading,setLoading] = useState(false);
    const [success,setSuccess] = useState(false);
    const [loginData, setLoginData] = React.useState({
        assign:user.displayName,
     });
     const initialInfo = { name: user.displayName, email: user.email};
     const [newData, setNewData] = useState(initialInfo);

    const { id } = useParams();

    const ticket = tickets.find((t) => t._id == id);
    console.log(ticket);

    const handleChange = (e) => {

        const id = e.target.id;
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
      };

      const handleOnBlur = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newFormData = { ...newData };
        newFormData[field] = value;
        setNewData(newFormData);
      };
      const handleConfirm = (_id) => {
        //   e.preventDefault();
        const url = `http://localhost:5000/tickets/${_id}`;
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

      const handleSubmit = (id) =>{
        
        setLoading(true);
       
        const comment ={
            ...newData,
            id
        }
        
        fetch('http://localhost:5000/comments', {
              method: 'POST',
              headers: {
                  'content-type': 'application/json'
              },
             body: JSON.stringify(comment),
          })
              .then(res => res.json())
              .then(data => {
                  if (data.insertedId) {
                      setSuccess(true);
                      setLoading(false);
                  }
              })
        
      }
      
  return (
    <>
   <Typography textAlign="center"  sx={{mb:5,mt:2}} variant='h3'>
    Ticket Details 
 </Typography>
    
    <Container>
   
            <Grid container spacing={2}>
  <Grid item xs={6}>
 <Button sx={{textDecoration:"underline"}} onClick={handleGoBack} >Go Back </Button>
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
                     <Typography sx={{fontSize:'.6em'}}>
                         Created: {ticket.date}
                    </Typography>
                    <Typography>
                        {ticket.details}
                    </Typography>
  </Grid>
  <Grid item xs={6}>
  <FormControl  variant="standard" sx={{ pb: 1, minWidth: 100 }}>
             <InputLabel >Progress status</InputLabel>
              <Select
              
                value={loginData.progress}
                label="Assign to"
                onChange={handleChange}
                name="progress"
               //  onBlur={handleOnBlur}
              >
               
                     <MenuItem value="Working On">Working On</MenuItem>
                     <MenuItem value="Complete">Complete</MenuItem>
                 
              </Select>
         
              <Button sx={{mt:2}} onClick={() => handleConfirm()} variant="outlined">confirm</Button>
    
            </FormControl>
  </Grid>
</Grid>

 {/* comment  */}
                    
 <TextField
              sx={{
                  mt:2
              }} 
              label="Add a comment..."
              name="comment"
              multiline
              variant="filled"
              onBlur={handleOnBlur}
            />
            <Button onClick={() => handleSubmit()} sx={{mt:3,ml:2}} type="submit" variant="outlined">Add Comment</Button>

                   
    </Container>
    </>
  )
}

export default AssignTicketDetails