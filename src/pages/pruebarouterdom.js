import { Box, Button, Grid, Paper } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const PruebaHome = () => {
    const navigate = useNavigate();
    const handleLogout = ()=>{
        localStorage.removeItem("token");
        navigate("/");
    }


  return (
    <Grid
      container
      sx={{
        height: "100vh",
        width: "100%",
        alignItems: "center"
      }}
    >
      <Grid item xs={12} sm={12} md={12}  component={Paper} elevation={6} square>
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
          <Button variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
} 
export default PruebaHome;