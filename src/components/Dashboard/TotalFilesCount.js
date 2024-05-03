import { Box,Stack,Typography,List,ListItemButton,ListItemText } from "@mui/material";
import AssestImg from '../../assets/ai-images/my-asset-doc.png';
import TotalImg from '../../assets/ai-images/total-converted.png';
import TableImg from '../../assets/ai-images/table-extract.png';
import PdfImg from '../../assets/ai-images/pdf-dashboard.png'
export default function TotalFilesCount(){
    const Totalfiles = [
        { number: 90, title: 'My Asset Documents', icon: () => <img src={AssestImg} alt="assest" /> },
        { number: 110, title: 'Total Converted files', icon: () => <img src={TotalImg} alt="Total" /> },
        { number: 35, title:'Image to Table Extracted' , icon: () => <img src={TableImg} alt="table" /> },
        {number:75,title:'PDF to Word Documents', icon: () => <img src={PdfImg} alt="word" />}
      ];
    return(
            <Box display="flex" justifyContent="space-between" alignContent="center" >
            {Totalfiles.map((item, index) => (
              <Stack
                key={index}
                direction="row"
                justifyContent={"center"}
                alignItems="center"
                sx={{  height: "145px", width: "350px" }}
              >
                <Stack sx={{ background: "#006aff", padding: "20px" }} m={1}  >
                  <item.icon width={"49px"}  />
                </Stack>
                <Stack direction="column" m={2}>
                  <Typography variant="h5" sx={{ fontSize: "2.5rem", fontWeight: "700" }}>{item.number}</Typography>
                  <Typography className="text-font">{item.title}</Typography>
                </Stack>
              </Stack>
            ))}
        </Box>
    )
}