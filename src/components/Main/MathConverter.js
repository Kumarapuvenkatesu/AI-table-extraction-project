import React from "react";
import { Box, Typography, AppBar, Toolbar } from "@mui/material";
import SideBar from "../Header/SideBar";
import SubLogo from "./SubLogo";

export default function MathConverter() {
    return (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"100vh"}>
          <SideBar/>
            <Box >
                <SubLogo/>
            </Box>
        </Box>
    )
}