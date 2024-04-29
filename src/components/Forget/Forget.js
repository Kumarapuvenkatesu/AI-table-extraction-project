import {  TextField, Typography, Box, Button, Container } from "@mui/material"
import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';


export default function Forget() {
  const [forgetEl, setForgetEl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  return (
    <>
      <Container component="main" maxWidth="xs" >
        <ToastContainer />
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 16 }} >
                    <Typography variant="h3" textAlign={"center"}>
                        Forget
                    </Typography>
                    <TextField
                    margin="normal"
                    fullWidth
                    label="Forget"
                    type="email"
                    value={forgetEl}
                    onChange={(event) => setForgetEl(event.target.value)}
                    />
                    <Button 
                    variant="contained"
                    type="submit" 
                    fullWidth
                    className="download-button" 
                    sx={{ mt: 3, mb: 2 }} 
                    disabled
                    >
                        Forget
                    </Button>
                </Box>
        <Link to={"/login"} >LOGIN</Link>
      </Container>
    </>
  )
}
