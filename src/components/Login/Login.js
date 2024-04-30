import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Container, TextField, Typography, Button } from "@mui/material";
import MainHead from "../Header/MainHeader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie";
import axios from "axios";


export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState('');
    const submitDetails = async (e) => {
        e.preventDefault();
        try {
          //  const response = await loginUrl(email, password)
          const response = await axios.post("http://10.91.10.142:3002/login", { email, password });
          // const response =await axios.post("http://localhost:3001/login",{email,password});
          console.log("response loginpage extract", response);
          if (response.data.status === "success") {
            localStorage.setItem("LoginDetails", JSON.stringify(response.data));
            Cookies.set("token", response.data.token1, { expires: 1 })
            if (response.data.role) {
              navigate("/")
              console.log("user shows")
            }
          }
          else {
           // toast.error(response.data)
            toast.error(response.data.message)
          }
        } catch (error) {
          toast.error(error)
        }
      };
      useEffect(() => {
        const jwtToken = Cookies.get('token');
        if (jwtToken !== undefined) {
          window.location.href = '/';
        }
      }, []);
    return (
        <>
            <MainHead/>
            <ToastContainer />
            <Container component="main" maxWidth="xs" sx={{marginTop:"5rem"}} >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: "center"
                    }}>
                    <Box component="form" onSubmit={submitDetails} sx={{ mt: 1 }}>
                        <Typography variant="h4" textAlign={'center'}>
                            Login
                        </Typography>
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Email Address"
                            autoComplete="off"
                            type={"email"}
                            required
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            label="password"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <Link variant="span" to="/forget">
                            Forget password?
                        </Link>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth sx={{ mt: 3, mb: 2, }}
                            className='download-button'
                        >
                            Login
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>
    )
}