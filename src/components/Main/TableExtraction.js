import React from "react";
import { Box, Typography, AppBar, Toolbar } from "@mui/material";
import SideBar from "../Header/SideBar";
import SubLogo from "./SubLogo";

export default function TableExtraction() {
    return (
        <Box >
            <SideBar/>
            <Box >
                <SubLogo/>
                <Box border={"1px solid red"}>
                    <Box component="form">
                        <Typography>
                            hello
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}