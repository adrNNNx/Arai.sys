import { Box, Button, Grid, Paper } from '@mui/material';
import React from 'react'

const PruebaHome = () => {
    const handleLogout = ()=>{
        localStorage.removeItem("token");
    }


  return (
    <Grid container>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1>Home</h1>
          <Button variant="contained" onClick={handleLogout}>Logout</Button>
        </Box>
      </Grid>
    </Grid>
  );
} 
export default PruebaHome;