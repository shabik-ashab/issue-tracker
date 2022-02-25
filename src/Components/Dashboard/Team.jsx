import { Grid } from "@mui/material";
import React from "react";

import DashboardSk from "../Skeleton/DashboardSk";

const Team = ({ users }) => {
  return (
    <>
      team
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}></Grid>
        <Grid item md={6} xs={12}></Grid>
      </Grid>
    </>
  );
};

export default Team;
