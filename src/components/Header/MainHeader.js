import React, { useState, useEffect, useContext,lazy } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Stack, Menu, MenuItem } from "@mui/material";
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from "@mui/material";
import { AccountCircleOutlined, Email, Phone } from '@mui/icons-material';
import { DataContext } from "../context/Context";
import Cookies from "js-cookie";
import IMG from "../../assets/straive-logo.png";
import LogoutIcon from '@mui/icons-material/Logout';

export default function TextHeader() {
  const jwtToken = Cookies.get("token");
  const data = useContext(DataContext);
  const [text, setText] = useState('');
  const { pathname } = useLocation();
  const [anchorEl, setAnchorEl] = useState(null); 
  const open=anchorEl!==null;
  useEffect(() => {
    switch (pathname) {
      case '/':
        setText("Dashboard");
        break;
      case '/table-extraction':
        setText("Table Extracter");
        break;
      case '/math-convertor':
        setText("Math Convertor");
        break;
      case '/pdf-to-word':
        setText("PDF to Word");
        break;
      case '/assets':
        setText("Assets");
        break;
      case '/html-generator':
        setText("HTML generator");
        break;
      default:
        setText("HTML generator");
    }
  }, [pathname]);
  const isScreenLarge = useMediaQuery('(min-width:1024px)');
  const handleMenu = (event) => { 
    setAnchorEl(event.currentTarget);
  };
  const handleClose=()=>{
    setAnchorEl(null)
  }
  const removeToken=()=>{
    Cookies.remove("token");
    window.location.href="/login";
  }
  return (
    <>
      {
        jwtToken === undefined ?
          <AppBar className='header' position="fixed"  >
            <Toolbar direction={"column"}>
              <Stack direction={"row"} sx={{ flexGrow: 1, alignItems: "center" }}>
                <img src={IMG} alt="logo" style={{ height: "30px" }} />
                <Typography sx={{ color: "#fff" }} variant='h4' >
                  | Extract Tables
                </Typography>
              </Stack>
              <Stack direction="row" spacing={4} mr={5} >
                <Stack component="a" spacing={1} href="mailto:contact@straive.com" direction={"row"} justifyContent={"center"} alignItems={"center"} >
                  <Email color="warning" /><Typography color={"#fff"}>contact@straive.com</Typography>
                </Stack>
                <Stack component="a" spacing={1} href="tel:+1522999888" direction={"row"} justifyContent={"center"} alignItems={"center"} >
                  <Phone color="warning" /><Typography color={"#fff"}>+1 522 999 888</Typography>
                </Stack>
              </Stack>
            </Toolbar>
          </AppBar>
          :
          <AppBar
            className="main-header"
            position="fixed"
            sx={{
              width: `calc(100% - ${data.widthValue}px)`,
              ml: `${data.widthValue}px`,
              // width:{isScreenLarge},
              // ml:{isScreenLarge}
            }}
          >
            <Toolbar sx={{ justifyContent: "space-between" }}>
              <Typography variant="h5" noWrap sx={{ marginLeft: "20px", fontWeight: "550", color: "#000000" }}>
                {text}
              </Typography>
              <IconButton size="large" onClick={handleMenu} >
                <AccountCircleOutlined />
                <Button >Welcome</Button>
              </IconButton>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={removeToken}>
                <LogoutIcon/> <Button >Sign Out</Button> 
                </MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
      }
    </>

  )
}