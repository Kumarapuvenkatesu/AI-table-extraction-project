import React, { useState,useContext } from "react";
import { Box, Typography, Stack, TextField, IconButton, Button } from "@mui/material";
import SideBar from "../Header/SideBar";
import SubLogo from "./SubLogo";
import PdfImg from '../../assets/ai-images/pdf-thumb.png';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Close } from "@mui/icons-material";
import axios from "axios";
import * as FileSaver from 'file-saver';
import downloadImg from "../../assets/ai-images/word-thumb.png";
import { DataContext } from "../context/Context";

export default function TableExtraction() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [filePreviews, setFilePreviews] = useState([]);
    const [open, setOpen] = useState(false);
    const [response, setResponse] = useState([]);
    const [downloadStatus, setDownloadStatus] = useState(false);
    const MarginLeft = useContext(DataContext);
    const handleFileUpload = () => {
        document.getElementById("fileInput").click();
    }
    const handleDragFiles = (event) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        console.log("drag files", files);
        if (files) {
            for (let i = 0; i < files.length; i++) {
              const file = files[i];
              if (
                (
                  file.type === "application/pdf")
                //   &&
                // (file.size <= 1024 * 1024)
              ) {
                setSelectedFile(file);
                toast.success("File uploaded");
                displayImagePreviews(file)
              } else {
                toast.warning(
                  "Please drag PDF files up to 1MB each",
                );
              }
            }
          }
       
    };
    const handleDragOver = (event) => {
        event.preventDefault();
    };
    const onFileChange = (e) => {
        const files = e.target.files;
        console.log("files", files);
        if (files) {
            for (let i = 0; i < files.length; i++) {
              const file = files[i];
              if (
                (file.type === "application/pdf")
              ) {
                setSelectedFile(file);
                toast.success("File uploaded", {
                  autoClose: 1000
                });

                displayImagePreviews(file)
              } else {
                alert("Not Accepted This Type ");
                //   toast.warning(
                //     "Please Upload (PNG or ZIP or PPTX) files up to 1MB each",
                //   );
              }
            }
          }
      
    };
    // const displayImagePreviews = (file) => {
    //     const reader = new FileReader();
    //     reader.onload = (event) => {
    //         setFilePreviews(event.target.result);
    //     };
    //     if (file && file.length > 0) {
    //         const file = file[0];
    //         reader.readAsDataURL(file);
    //       }
    // };\
    const displayImagePreviews = (files) => {
        const reader = new FileReader();
        console.log("fsf",reader)
        reader.onload = (event) => {
            setFilePreviews(event.target.result);
        };
        if (files && files.length > 0) {
            const file = files[0];
           
            if (file.type === 'application/pdf') {
                // Convert the PDF file to a data URL
                reader.readAsDataURL(file);
                console.log("");
            } else {
                // Handle other file types or show an error message
            }
        }
    };
    
    const CloseButton = () => {
        setSelectedFile(null)
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        setOpen(true)
       
    };
    const downloadData =  () => {
    }
    return (
        <Box ml={`${MarginLeft.widthValue+42}px`}>
        <SideBar/>
        <Box  mt={"5rem"} marginRight={"3rem"}>
            <SubLogo/>
        <Box display={"flex"} justifyContent={"center"}  component="form" onSubmit={onSubmit} className="dropzone"  sx={{py:"5%"}}>
            <ToastContainer position="bottom-right" />
            {
                downloadStatus ? (
                    <Stack textAlign={"center"} alignItems={"center"}>
                        <img src={downloadImg} alt="extract" width={"100px"}/>
                    <Typography variant="h6" sx={{ color: "#006aff" }}>Extracting tables processed successfully</Typography>
                        <Typography paragraph>Please download the CSV File</Typography>
                        <Button variant="outlined" onClick={downloadData}>Download</Button>
                    </Stack>
                ) :(
                    <>{
                        open ? 
                        <Typography>hello</Typography>:<>
                          {
                selectedFile ?
                    <Stack spacing={2} sx={{ display: "flex", alignItems: "center", justifyContent: "center",py:"5%" }} >
                        <img src={filePreviews} alt={'Preview'} width={"300px"} />
                        <Stack direction="flex" alignItems="center" justifyContent="center" className="border-width">
                            <Typography paragraph mb={0} mr={2}>{selectedFile?.name}</Typography>
                            <IconButton onClick={CloseButton}>
                                <Close />
                            </IconButton>
                        </Stack>
                        <Box className="button-display">
                            <Button variant="outlined" onClick={CloseButton } className="border-width">Cancel</Button>
                            <Button className="border-width" type="submit" variant="outlined"  >{selectedFile.type === "image/png" || selectedFile.type === "image/jpeg" || selectedFile.type === "image/jpg" ? "Convert " : "Download To Zip"}</Button>
                        </Box>
                    </Stack>
                    :
                    
                    <Box className="grid-position"   >
                    <Stack
                        className="dropzone1"
                        onClick={handleFileUpload}
                        onDrop={handleDragFiles}
                        onDragOver={handleDragOver}
                        justifyContent={"center"}
                    >
                        <TextField
                            id="fileInput"
                            type="file"
                            onChange={onFileChange}
                            accept="image/*,.zip, .pptx"
                            style={{ display: "none" }}
                            multiple
                        /> 
                        <Stack display="flex" alignItems="center" padding={"30px"} margin={"18px 30px"} height={"305px"}>
                            <img src={PdfImg} alt="logo" />
                            <Stack textAlign={"center"} padding={"20px"} margin={"18px 0px 25px 0px"}>
                                <Typography variant="body1" className="sub-title" >
                                    Please drag and drop images <br /> or <br /> PPT files which has tables
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack display={"flex"} alignItems={"center"} justifyContent={"center"} margin={"8px"}>
                        <Typography >OR</Typography>
                    </Stack>
                    <Stack display="flex" alignItems="center" padding={"62px"} height={"305px"}  className="dropzone2">
                            <img src={PdfImg} alt="logo" />
                            <Stack textAlign={"center"} padding={"20px"} margin={"18px 0px 25px 0px"}>
                                <Typography variant="body1" className="sub-title" >
                                    Please Upload the images <br /> or <br /> PPT files which has tables
                                </Typography>
                                <Button variant="outlined" sx={{mt:4}} onClick={handleFileUpload}>Upload</Button>
                            </Stack>
                        </Stack>
                    </Box>
            }</>
                    }
                   
                    </>
                )
            }
           
        </Box>
        </Box>
        </Box>
    )
}