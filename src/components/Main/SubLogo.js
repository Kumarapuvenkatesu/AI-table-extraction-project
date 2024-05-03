import React,{useEffect,useState} from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography,  Stack } from "@mui/material";
import SubAi from '../../assets/ai-images/sub-page-header.png';
export default function SubLogo() {
    const { pathname } = useLocation();
    const [HeadindText,setheadingText]=useState()
    useEffect(() => {
        switch (pathname) {
          case '/table-extraction':
            setheadingText("Extract tabular data from images and PPt files");
            break;
          case '/math-convertor':
            setheadingText("Math Convertor from images and PPT files");
            break;
          case '/pdf-to-word':
            setheadingText("Convert PDF files to Word file");
            break;
          case '/html-generator':
            setheadingText("HTML AI Code Generator");
            break;
          default:
            setheadingText("HTML generator");
        }
      }, [pathname]);
    return (
        <Box color={"#fff"}>
            <img src={SubAi} alt="Ai Tools" width={"100%"} height={"167"}/>
            <Stack className='image-position-sub' width={900}>
               <Typography paragraph mb={0}> Our Ai Tools can help you better!</Typography> 
               <Typography variant="h4"> {HeadindText}</Typography>
            </Stack>
        </Box>
    )
}