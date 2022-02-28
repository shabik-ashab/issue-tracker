import { Grid } from "@mui/material";
import React from "react";
import AssignedToMe from "./AssignedToMe";
import MyTicket from "./MyTicket";

const Myticket = ({ myTickets,setMyTickets,tickets,setConfirm }) => {

  
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
          setConfirm={setConfirm}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Myticket;
