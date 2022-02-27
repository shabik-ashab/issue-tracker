import { Grid } from "@mui/material";
import React from "react";
import AssignedToMe from "./AssignedToMe";
import MyTicket from "./MyTicket";

const Myticket = ({ myTickets,setMyTickets }) => {

  
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
         <MyTicket 
          myTickets={myTickets}
          setMyTickets={setMyTickets}
         />
        </Grid>
        <Grid item xs={6}>
          <AssignedToMe />
        </Grid>
      </Grid>
    </>
  );
};

export default Myticket;
