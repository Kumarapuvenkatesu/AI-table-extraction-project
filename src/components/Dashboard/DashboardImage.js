import React, { useContext } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MicIcon from '../../assets/ai-images/mic.png';
import SendIcon from '../../assets/ai-images/send.png';
import imgs from '../../assets/ai-images/header-img.png';

export default function DashboardImage() {
    return (
        // <Box className="dasboard-image" height={"100vh"} mt={"5rem"} ml={`${MarginLeft.widthValue+42}px`}  >
        <Box  height={300} className="relative-position">
            <img src={imgs} className='img-size'/>
            <Stack className='image-position' width={900}>
                <Typography variant="h2" color={"#fff"}>How can I help you today ?</Typography>
                <Paper
                    component="form"
                    sx={{ borderRadius: '20px', }}
                    className='dashboard-image dasboard-image-background'
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Enter your prompt here"
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <img src={MicIcon} alt='mic' />
                    </IconButton>
                    <span style={{ color: "gray", margin: "1px" }}>|</span>
                    {/* <Divider sx={{ height: 28, m: 0.5 }} style={{color:"red"}} orientation="vertical" /> */}
                    <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                        <img src={SendIcon} alt='sendIcon' />
                    </IconButton>
                </Paper>
            </Stack>
        </Box>
    )
}