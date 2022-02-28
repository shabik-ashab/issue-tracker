import { Grid } from "@mui/material";
import React from "react";
import AssignedToMe from "./AssignedToMe";
import MyTicket from "./MyTicket";

const Myticket = ({ myTickets,setMyTickets,tickets }) => {

  
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
          <AssignedToMe
          tickets={tickets}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Myticket;
