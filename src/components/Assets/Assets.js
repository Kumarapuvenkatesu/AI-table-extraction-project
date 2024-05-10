import React,{useEffect} from "react";
import { Box, Typography, AppBar, Toolbar } from "@mui/material";
import SideHeader from "../Header/SideBar";
import Cookies from "js-cookie";

export default function Assets() {
    useEffect(() => {
        const jwtToken = Cookies.get("token");
        if (jwtToken === undefined) {
          window.location.href = "/login"
        }
      }, [undefined])
    return (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"100vh"}>
            <SideHeader />
            <Box >
                <Typography variant="h4" style={{ color: "#1b386e" }}>Assets</Typography>
            </Box>
        </Box>
    )
}