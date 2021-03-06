import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";

const MyTicket = ({ myTickets, setMyTickets }) => {
  const reverseTicket = myTickets.slice().reverse();

  const handledelete = (id) => {
    const confirmBox = window.confirm("Do you want to delete this ticket");
    if (confirmBox === true) {
      const url = `https://sleepy-lowlands-62924.herokuapp.com/tickets/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            alert("deleted sucessfully");
            const remaining = myTickets.filter((pd) => pd._id !== id);
            setMyTickets(remaining);
          }
        });
    }
  };

  return (
    <>
      <Container display="flex" sx={{ justifyContent: "center" }}>
        <Box sx={{ width: "100%" }}>
          <Typography textAlign="center" sx={{ mb: 5, mt: 2 }} variant="h3">
            My Tickets
          </Typography>
          {reverseTicket.map((ticket) => (
            <Box
              key={ticket._id}
              sx={{ mb: 1, width: "100%", border: "1px solid #546e7a", p: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={9}>
                  <Box display="flex" sx={{ alignContent: "center" }}>
                    <Typography variant="h6">{ticket.title} </Typography>
                    {ticket.urgency == "Urgent" && (
                      <Box display="flex" sx={{ ml: 1, mt: 0.5 }}>
                        <Typography sx={{}}>{ticket.urgency}</Typography>
                        <Box
                          sx={{
                            width: "1vh",
                            height: "1vh",
                            borderRadius: "50%",
                            backgroundColor: "#f57c00",
                            mt: 0.6,
                            ml: 0.2,
                          }}
                        ></Box>
                      </Box>
                    )}
                    {ticket.urgency == "Normal" && (
                      <Box display="flex" sx={{ ml: 1, mt: 0.5 }}>
                        <Typography sx={{}}>{ticket.urgency}</Typography>
                        <Box
                          sx={{
                            width: "1vh",
                            height: "1vh",
                            borderRadius: "50%",
                            backgroundColor: "#4caf50",
                            mt: 0.6,
                            ml: 0.2,
                          }}
                        ></Box>
                      </Box>
                    )}
                    {ticket.urgency == "Critical" && (
                      <Box display="flex" sx={{ ml: 1, mt: 0.5 }}>
                        <Typography sx={{}}>{ticket.urgency}</Typography>
                        <Box
                          sx={{
                            width: "1vh",
                            height: "1vh",
                            borderRadius: "50%",
                            backgroundColor: "#f44336",
                            mt: 0.6,
                            ml: 0.2,
                          }}
                        ></Box>
                      </Box>
                    )}
                  </Box>
                  {ticket.assign && (
                    <Typography sx={{ fontSize: ".6em" }}>
                      Assigned To: {ticket.assign}
                    </Typography>
                  )}

                  <Typography>{ticket.details}</Typography>
                </Grid>

                <Grid item xs={3}>
                  <Typography sx={{ fontSize: ".6em" }}>
                    Created: {ticket.date}
                  </Typography>
                  <Button
                    onClick={() => handledelete(ticket._id)}
                    variant="outlined"
                    color="error"
                    sx={{}}
                  >
                    Delete
                  </Button>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default MyTicket;
