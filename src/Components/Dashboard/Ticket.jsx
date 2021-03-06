import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import useAuth from "../../hooks/useAuth";
import MyTicket from "./MyTicket";
import Select from "@mui/material/Select";

const Ticket = ({ success, setSuccess, myTickets, setMyTickets }) => {
  const { user, currentUser } = useAuth();

  const [urgency, setUrgency] = React.useState("");

  const dt = new Date();
  const stringDt = dt.toDateString();

  const initialInfo = {
    name: user.displayName,
    email: user.email,
    team: currentUser.team,
    date: stringDt,
  };
  const [newData, setNewData] = useState(initialInfo);

  const handleChange = (e) => {
    setUrgency(e.target.value);
    const field = e.target.name;
    const value = e.target.value;
    const newFormData = { ...newData };
    newFormData[field] = value;
    setNewData(newFormData);
  };

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newFormData = { ...newData };
    newFormData[field] = value;
    setNewData(newFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(false);
    fetch("https://sleepy-lowlands-62924.herokuapp.com/tickets", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          console.log(data);
          e.target.reset();
          setSuccess(true);
        }
      });
    e.preventDefault();
  };

  return (
    <>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Box>
              <Typography textAlign="center" variant="h3" sx={{ mt: 2, mb: 4 }}>
                create ticket
              </Typography>

              <Box display="flex" sx={{ justifyContent: "center" }}>
                <form onSubmit={handleSubmit}>
                  {success && (
                    <Alert sx={{ mb: 2, width: "40vh" }} severity="success">
                      Ticket Created successfully
                    </Alert>
                  )}
                  <Box sx={{ width: "40vh", mb: 3 }}>
                    <FormControl variant="standard" sx={{ width: "40vh" }}>
                      <InputLabel>Urgency Level</InputLabel>
                      <Select
                        name="urgency"
                        value={urgency}
                        onChange={handleChange}
                        label="Urgency Level"
                      >
                        <MenuItem value={"Normal"}>Normal</MenuItem>
                        <MenuItem value={"Urgent"}>Urgent</MenuItem>
                        <MenuItem value={"Critical"}>Critical</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <TextField
                    sx={{
                      width: "40vh",
                      mb: 3,
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
                      width: "40vh",
                      mb: 3,
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
                      width: "40vh",
                      mb: 3,
                    }}
                    name="title"
                    label="ticket title"
                    variant="standard"
                    onBlur={handleOnBlur}
                  />
                  <br />
                  <TextField
                    sx={{
                      width: "40vh",
                      mb: 3,
                    }}
                    label="ticket details"
                    multiline
                    rows={4}
                    variant="standard"
                    name="details"
                    onBlur={handleOnBlur}
                  />
                  <br />

                  <Button type="submit" variant="outlined">
                    Submit
                  </Button>
                </form>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <MyTicket myTickets={myTickets} setMyTickets={setMyTickets} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Ticket;
