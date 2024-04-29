import { Box, Typography,Stack,TableContainer,Table,TableHead,TableRow,TableCell } from "@mui/material";

export default function RecentFiles(){
    return(
        <Box>
        <Stack>
          <Typography variant="h5" style={{ borderBottom: "1px solid grey", padding: "10px" }} >Recent Files</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>File Name</TableCell>
                  <TableCell>File Type</TableCell>
                  <TableCell>Date and Time</TableCell>
                </TableRow>
              </TableHead>
              {/* <TableBody>
                <TableRow>
                  <TableCell>{data1.selectedFileEl.name}</TableCell>
                  <TableCell>{data1.selectedFileEl.type}</TableCell>
                  <TableCell>{data1.selectedFileEl!==null && `${new Date().toDateString()}, ${new Date().toLocaleTimeString()}`}</TableCell>
                </TableRow>
              </TableBody> */}
            </Table>
          </TableContainer>
        </Stack>
      </Box>
    )
}