import { CircularProgress, Stack } from "@mui/material";

export const Loading = () => {
    return (
        <Stack  justifyContent={"center"} alignItems={"center"}>
            <CircularProgress color="info" />
        </Stack>
    )
}