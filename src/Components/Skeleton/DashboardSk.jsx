import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { Box, Grid } from '@mui/material';

const DashboardSk = () => {
  return (
    <>
    <Grid sx={{mt:5,ml:4}} container spacing={2}>
  <Grid item md={3} xs={8}>
  <Skeleton width={180} variant="text" />
  <Skeleton variant="circular" width={40} height={40} />
  <Box sx={{mt:10}}>
  <Skeleton width={140} variant="text" />
  <Skeleton width={140} variant="text" />
  <Skeleton width={140} variant="text" />
  <Skeleton width={140} variant="text" />
  </Box>
  </Grid>
  <Grid item md={7} xs={4}>
  <Skeleton width={80} variant="text" />
  <Skeleton width={100} variant="text" />
  <Box sx={{mt:4}}> 
  <Grid container spacing={4}>
  <Grid item md={6} xs={8}>
  <Skeleton variant="rectangular" width={380} height={450} />
  </Grid>
  <Grid item md={6} xs={4}>
  <Skeleton variant="rectangular" width={380} height={450} />
  </Grid>
 
</Grid>
  </Box>

  </Grid>
</Grid>
     
    </>
  )
}

export default DashboardSk