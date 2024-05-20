import React, { useState, useContext } from 'react';
import Drawer from '@mui/material/Drawer';
import { Stack, Toolbar, List, ListItemButton, ListItemText, Box, Typography } from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';
import { useMediaQuery } from "@mui/material";
import AI from "../../assets/ai-images/ai-logo.png";
import DashboardImg from "../../assets/ai-images/dashboard.png";
import ApplicationImg from "../../assets/ai-images/applications.png";
import AssestImg from "../../assets/ai-images/assets.png";
import SettingImg from "../../assets/ai-images/settings.png";
import MenuImg from "../../assets/ai-images/menu.png";
import TableImg from "../../assets/ai-images/table-submenu.png";
import MathImg from "../../assets/ai-images/math-submenu.png";
import PdfImg from "../../assets/ai-images/pdf-word-submenu.png";
import HtmlImg from "../../assets/ai-images/html-gen-submenu.png";
import MainHeader from "../Header/MainHeader";
import { DataContext } from "../context/Context"

const drawerWidth = 240;
const fixedWidth = 118;
export default function SideBar() {
  const RequiredWidth = useContext(DataContext)
  const [open, setOpen] = useState(false);
  const isScreenLarge = useMediaQuery('(min-width:1024px)');
  const showSubHeader = () => {
    setOpen(!open);
  }
  if (open === true) {
    RequiredWidth.setWidthValue(drawerWidth + fixedWidth)
  } else if (open === false) {
    RequiredWidth.setWidthValue(fixedWidth)
  }
  const subHeadingText = [
    {
      text: "Table Extracter",
      icon: () => <img src={TableImg} alt="Table" />,
      path: "/table-extraction",
    },
    {
      text: "Math Convertor",
      icon: () => <img src={MathImg} alt="Math" />,
      path: "/math-convertor",
    },
    {
      text: "PDF to Word",
      icon: () => <img src={PdfImg} alt="PDF" className='margin-right-extra'/>,
      path: "/pdf-to-word",
    },
    {
      text: "HTMLGenerator",
      icon: () => <img src={HtmlImg} alt="HTML" className='margin-nill'/>,
      path: "/html-generator",
    },
  ];

  return (
    <>
      <MainHeader />
      <Drawer
        sx={{
          width: fixedWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: fixedWidth,
            color: "#fff",
            backgroundColor: '#006aff',
          },
        }}
        variant="permanent"
        anchor="left"
        open={isScreenLarge}
        position="fixed"
      >
        <Stack
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            height: "100%"
          }}
        >
          <Toolbar sx={{ position: "fixed", background: "#fff", justifyContent: "center" }} id="menu" onClick={showSubHeader}>
            <img src={MenuImg} alt="menu" />
          </Toolbar>
          <Stack className="content-center" >
            <ListItemButton disableRipple>
              <img src={AI} alt='ai-logo' width={"49px"} />
            </ListItemButton>
            <Box sx={{ marginTop: "2rem" }}>
              <List className='text-center content-center'>
                <ListItemButton component={NavLink} to="/" disableRipple >
                  <img src={DashboardImg} alt='Dashboard' width={"39px"}/>
                </ListItemButton>
                {/* <ListItemText primary="DASHBOARD" /> */}
                <Typography paragraph mt={2} >DASHBOARD</Typography>
              </List>
              <List className='text-center content-center' onClick={showSubHeader}>
                <ListItemButton disableRipple className={`${open ? 'bg-gray-200' : ''}`}>
                  <img src={ApplicationImg} alt='application' width={"39px"}/>
                </ListItemButton>
                <Typography paragraph mt={2}>APPLICATION</Typography>
              </List>
              <List className='text-center content-center' >
                <ListItemButton component={NavLink} to="/assets" disableRipple>
                  <img src={AssestImg} alt='assests' width={"39px"}/>
                </ListItemButton>
                <Typography paragraph mt={2}>ASSETS</Typography>
              </List>
            </Box>
          </Stack>
          <List className='text-center content-center'>
            <ListItemButton className='content-center' disableRipple>
              <img src={SettingImg} alt='settings' width={"39px"}/>
              <Typography paragraph mt={2} color={"#fff"}>SETTINGS</Typography>
            </ListItemButton>
          </List>
        </Stack>
      </Drawer>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#cce3f7',
            zIndex: 1,
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Box className="content-center sub-header">
          {subHeadingText.map((item, index) => (
            <List key={index} sx={{ cursor: "Pointer" }}>
              <ListItemButton
                component={NavLink}
                to={item.path}
                id='sub-head'
              >
                <item.icon width={"49px"} className="img-gap" />
                <ListItemText primary={item.text} />
              </ListItemButton>
            </List>
          ))}
        </Box>
      </Drawer>
    </>
  )
}