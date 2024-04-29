import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";

export default function NotFound() {
    return (
        <Box height={"100vh"}>
            <Box component={"div"}  >
                <Stack className="fileupload-row text-center">
                    <Typography variant="h3" >NotFound</Typography>
                    <Typography paragraphed>There is no content</Typography>
                    <Button href="/">
                        Dashboard
                    </Button>
                </Stack>
            </Box>
        </Box>
    )
}