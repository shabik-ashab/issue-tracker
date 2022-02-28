import { Container, Grid, Typography, FormControl, Select, MenuItem, InputLabel, Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import useAuth from '../../hooks/useAuth';
import { Box } from '@mui/material';
import AddComment from './AddComment';


const AssignTicketDetails = ({handleGoBack,tickets}) => {
    const {user} = useAuth();
   
   
    // const dt = new Date();
    // const stringDt = dt.toDateString();
    const [loginData, setLoginData] = useState({
        assign:user.displayName,
     });

    

    const { id } = useParams();

    const ticket = tickets.find((t) => t._id == id);


    const handleChange = (e) => {

        const id = e.target.id;
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
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

      console.log(ticket);
      
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
             

              
              {
                ticket.progress == "Working On" && 
                <>
                 <InputLabel >Progress status</InputLabel>
                 <Select
               
               value={loginData.progress}
               label="Assign to"
               onChange={handleChange}
               name="progress"
               id={ticket._id}
              //  onBlur={handleOnBlur}
             >
            
                        <MenuItem value="Complete">Complete</MenuItem>
              
             </Select>
             <Button sx={{mt:2}} onClick={() => handleConfirm(ticket._id)} variant="outlined">confirm</Button>
                </>
               
}
{
            ticket.progress == null &&
            <>
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
             <Button sx={{mt:2}} onClick={() => handleConfirm(ticket._id)} variant="outlined">confirm</Button>
            </>
             
              }
               
             
            
    
            </FormControl>
  </Grid>
</Grid>

 {/* comment  */}
                    
 <AddComment
 user={user}
 id = {ticket._id}
 />     
    </Container>
    </>
  )
}

export default AssignTicketDetails