import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

const AssignTicket = () => {
    const {currentUser} = useAuth();

    const [tickets, setTickets] = useState([]);
    const [users,setUsers] = useState([]);
  
    // const [deadline,setDeadline] = React.useState({
    //   deadline:new Date(),
    // });
    const [loginData, setLoginData] = React.useState({
       
      });

    useEffect(() => {
        const url = `http://localhost:5000/tickets`;
        fetch(url)
          .then((res) => res.json())
          .then((data) => setTickets(data));
      }, []);

     


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

      useEffect(() => {
        const url = `http://localhost:5000/users?email=${currentUser.team}`;
        fetch(url)
          .then((res) => res.json())
          .then((data) => setUsers(data));
      }, []);

      const handleChange = (e) => {

        const id = e.target.id;
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
      };
      // const handleDateChange = (e) => {

      //   // const id = e.target.id;
      //   const field = e.target.name;
      //   const value = e.target.value;
      //   const newLoginData = { ...loginData };
      //   newLoginData[field] = value;
      //   setDeadline(newLoginData);
      // };
  // console.log(loginData);
//   console.log(tickets);

  const handleConfirm = (id) => {
    console.log(loginData);
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

// const [value, setValue] = React.useState(new Date());
//    console.log(value);  
  return <div>

{tickets.map((ticket) => (
            <Box
             key={ticket._id}
              sx={{ mb: 1, width: "100%", border: "1px solid #546e7a", p: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={3}>
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
                  Created By {ticket.name}
                 </Typography>
                  <Typography>{ticket.details}</Typography>
                </Grid>
                <Grid tem xs={3}>
               {/* <Box sx={{p:2}}>
               <LocalizationProvider dateAdapter={AdapterDateFns}>
 <form>
 <DatePicker
    label="Basic example"
    value={value.deadline}
    id={ticket._id}
    name="deadline"
    onChange={(newValue) => {
      let obj = {...value}
      obj = {
        deadline:newValue,
        id:ticket._id
      }
      obj[i].selected = !this.state.obj[i].selected
      setValue({obj});
    }}
    
    renderInput={(params) => <TextField {...params} />}
  />
 </form>
</LocalizationProvider>
               </Box> */}

               
                </Grid>
                <Grid item xs={4}>
                {
               ticket.assign ?
               <Typography>
                Already assigned To: { ticket.assign}
             </Typography>
             :
             <Box sx={{p:1}}>

             <Grid container spacing={2}>
            
<Grid item xs={6}>

<FormControl  fullWidth>
         
         <InputLabel >Assign To</InputLabel>
          <Select
          
            value={loginData.assign}
            label="Assign to"
            onChange={handleChange}
            name="assign"
            id={ticket._id}
           //  onBlur={handleOnBlur}
          >
            {
                users.map((user) => (
                 <MenuItem value={user.displayName}>{user.displayName}</MenuItem>
                ))
            }
          </Select>
     
          
        </FormControl>
</Grid>
<Grid item xs={6}>
<Button sx={{mt:1}} onClick={() => handleConfirm(ticket._id)} variant="outlined">confirm</Button>
</Grid>

</Grid>

            
              </Box>
           }
               
                </Grid>
                <Grid item xs={2}>
                <Typography sx={{fontSize:'.6em'}}>
                   Created: {ticket.date}
                 </Typography>
                <Button
                    onClick={() => handledelete(ticket._id)}
                    variant="outlined"
                    color="error"
                    sx={{
                      
                    }}
                  >
                    Delete
                  </Button>
                 
                </Grid>
            
              </Grid>
            </Box>
          ))}
  </div>;
};

export default AssignTicket;
