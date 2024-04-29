import { Box,Stack,Typography } from "@mui/material";
import EpubImg from '../../assets/ai-images/epub.png';
import AltImg from '../../assets/ai-images/alt-tag.png';
import WebPageImg from '../../assets/ai-images/web-page.png';
import CSSImge from '../../assets/ai-images/css-gen.png';

export default function NewTools(){
    const AnotherTools = [
        {
          icon:() => <img src={EpubImg} alt="epub" />,
          Text: "EPUB Generator"
        },
        {
          icon:() => <img src={AltImg} alt="alt" />,
          Text: "Alt Tag Generator"
        },
        {
          icon:() => <img src={WebPageImg} alt="webpage" />,
          Text: "Web Page Generator"
        },
        {
          icon:() => <img src={CSSImge} alt="generator" />,
          Text: "CSS Generator"
        },
        {
            icon:() => <img src={EpubImg} alt="epub" />,
            Text: "EPUB Generator"
          },
          {
            icon:() => <img src={AltImg} alt="alt" />,
            Text: "Alt Tag Generator"
          },
      ]
    return(
        <Stack component={"div"}>
        <Typography variant="h6" my={2}>All Applications</Typography>
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"flex-end"} >
          {
            AnotherTools.map((item, index) => (
              <Stack key={index} direction={"column"} justifyContent={"center"} alignItems={"center"} sx={{ cursor: "pointer" }}>
                <Stack sx={{  padding: "16px", borderRadius: "14px", mb: "4px" }}>
                  {/* {item.icon} */}
                  <item.icon width={"49px"} className="img-gap" />
                </Stack>
                <Stack >
                  <Typography paragraph sx={{fontSize:"1.1rem"}} >{item.Text}</Typography>
                </Stack>
              </Stack>
            ))
          }
        </Box>
      </Stack>
    )
}