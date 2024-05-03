import React,{useContext} from "react";
import { Box } from "@mui/material";
import SideBar from "../Header/SideBar";
import SubLogo from "./SubLogo";
import { DataContext } from "../context/Context";

export default function HtmlGenerator() {
    const MarginLeft = useContext(DataContext);
    return (
        <Box ml={`${MarginLeft.widthValue+42}px`}>
            <SideBar/>
            <Box marginRight={"3rem"} marginTop={""}>
                <SubLogo/>
            </Box>
        </Box>
    )
}