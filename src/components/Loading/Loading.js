import { CircularProgress, Stack } from "@mui/material";

export const Loading = () => {
    return (
        <Stack width={"100%"} height={"100%"} justifyContent={"center"} alignItems={"center"}>
            <CircularProgress color="info" />
        </Stack>
    )
}