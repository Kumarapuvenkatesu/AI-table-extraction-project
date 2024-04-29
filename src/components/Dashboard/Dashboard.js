import React, { useContext } from "react";
import { Box } from "@mui/material";
import SideBar from "../Header/SideBar";
import DashboardImage from "./DashboardImage";
import TotalFilesCount from "./TotalFilesCount";
import NewTools from "./NewTools";
import { DataContext } from "../context/Context";
import RecentFiles from "./RecentFiles";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  const MarginLeft = useContext(DataContext);
  return (
    <Box ml={`${MarginLeft.widthValue+42}px`}>
      <SideBar />
      <Box mt={"5rem"} marginRight={"3rem"}>
        <DashboardImage />
        <TotalFilesCount />
        <NewTools />
        <RecentFiles/>
      </Box>
    </Box>
  );
}
