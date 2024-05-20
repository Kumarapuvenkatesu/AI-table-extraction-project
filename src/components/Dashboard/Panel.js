import React, { useContext, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import SideBar from "../Header/SideBar";
import DashboardImage from "./DashboardImage";
import TotalFilesCount from "./TotalFilesCount";
import NewTools from "./NewTools";
import { DataContext } from "../context/Context";
import RecentFiles from "./RecentFiles";
import Cookies from "js-cookie";
import dashboardImg from "../../assets/Ai-Application/table-extracter/01.png";
import TableExtraction from "../Main/TableExtraction";
import { Outlet } from "react-router-dom";

export default function Panel() {
 
  return (
 
        <Box mt={"5rem"} marginRight={"3rem"}>
          <DashboardImage />
          <TotalFilesCount />
          <NewTools />
          <RecentFiles/>
        </Box>
  );
}
