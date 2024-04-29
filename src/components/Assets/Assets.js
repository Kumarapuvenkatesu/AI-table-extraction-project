import React from "react";
import { Box, Typography, AppBar, Toolbar } from "@mui/material";
import SideHeader from "../Header/SideBar";

export default function Assets() {
    return (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"100vh"}>
            <SideHeader />
            <Box >
                <Typography variant="h4" style={{ color: "#1b386e" }}>Assets</Typography>
            </Box>
        </Box>
    )
}