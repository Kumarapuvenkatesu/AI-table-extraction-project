import React, { useContext,useEffect } from "react";
import { Box } from "@mui/material";
import SideBar from "../Header/SideBar";
import DashboardImage from "./DashboardImage";
import TotalFilesCount from "./TotalFilesCount";
import NewTools from "./NewTools";
import { DataContext } from "../context/Context";
import RecentFiles from "./RecentFiles";
import Cookies from "js-cookie";
import dashboardImg from "../../assets/Ai-Application/table-extracter/01.png";

export default function Dashboard() {
  const MarginLeft = useContext(DataContext);
  useEffect(() => {
    const jwtToken = Cookies.get("token");
    if (jwtToken === undefined) {
      window.location.href = "/login"
    }
  }, [undefined])
  return (
    <Box ml={`${MarginLeft.widthValue+42}px`}>
      <SideBar />
      {/* <img src={dashboardImg}/> */}
      <Box mt={"5rem"} marginRight={"3rem"}>
        <DashboardImage />
        <TotalFilesCount />
        <NewTools />
        <RecentFiles/>
      </Box>
    </Box>
  );
}
