import React, { useState } from "react";
import { Box, Typography, Stack, TextField, IconButton, Button } from "@mui/material";
import SideBar from "../Header/SideBar";
import SubLogo from "./SubLogo";
import TableExtract from '../../assets/ai-images/table-extract-img.png';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Close } from "@mui/icons-material";
import axios from "axios";
import * as FileSaver from 'file-saver';

export default function TableExtraction() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [filePreviews, setFilePreviews] = useState([]);
    const [open, setOpen] = useState(false);
    const [response, setResponse] = useState([]);
    const [downloadStatus, setDownloadStatus] = useState(false);
    const handleFileUpload = () => {
        document.getElementById("fileInput").click();
    }
    const handleDragFiles = (event) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        console.log("drag files", files)
        if (files) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if(file.type === "application/x-zip-compressed" ||
                    file.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
                    /image\/(jpeg|png|jpg|jpg)/.test(file.type))
                // &&
                // (file.size <= 1024 * 1024)
                {
                    setSelectedFile(file);
                    toast.success("File uploaded");
                    displayImagePreviews(file)
                } else {
                    toast.warning(
                        "Please drop (PNG or ZIP or PPTX) files up to 1MB each",
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
        console.log("files", files)
        if (files) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if
                    (file.type === "application/x-zip-compressed" ||
                    file.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
                    /image\/(jpeg|png|jpg|jpg)/.test(file.type))
                // &&
                // (file.size <= 1024 * 1024)
                {
                    setSelectedFile(file);
                    toast.success("File uploaded", {
                        autoClose: 1000
                    });
                    displayImagePreviews(file)
                } else {
                    alert("Not Accepted this Type ");
                    //   toast.warning(
                    //     "Please Upload (PNG or ZIP or PPTX) files up to 1MB each",
                    //   );
                }
            }
        }
    };
    const displayImagePreviews = (file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            setFilePreviews(event.target.result);
        };
        reader.readAsDataURL(file);
    };
    const CloseButton = () => {
        setSelectedFile(null)
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        setOpen(true)
        if (selectedFile) {
            switch (selectedFile.type) {
                // case "image/jpg" || "image/png" || "image/jpeg":
                case "image/jpg":
                case "image/png":
                case "image/jpeg":
                    try {
                        const formData = new FormData();
                        formData.append("image", selectedFile);
                        const response = await axios.post('http://10.91.10.142:3002/tableExtraction', formData);
                        console.log("1112", response)
                        setResponse(response)
                        if (response.status === 200) {
                            setDownloadStatus(!downloadStatus)
                        }
                    } catch (error) {
                        console.log(error);
                        toast.error("An error occurred. Please try again.");
                        setOpen(false)
                    }
                    break;
                case "application/x-zip-compressed":
                    try {
                        const formData = new FormData();
                        formData.append("image", selectedFile);
                        const response = await axios.post("http://10.91.10.142:3002/allImgTabExt", formData
                            , {
                                responseType: 'blob'
                            });
                            console.log("resp", response.data.type)
                        setResponse(response)
                        if (response.status === 200) {
                            setDownloadStatus(!downloadStatus)
                        }
                    } catch (error) {
                        toast.error("Error during download:", error);
                        setOpen(false)
                    }
                    break;
                case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
                    try {
                        const formData = new FormData();
                        formData.append("image", selectedFile);
                        const response = await axios.post("http://10.91.10.142:3002/pptFileExtraction", formData, {
                            responseType: 'blob'
                        });
                        console.log("data",response);
                        console.log("resp", response.data.type)
                        setResponse(response)
                        if (response.status === 200) {
                            setDownloadStatus(!downloadStatus)
                        }
                    } catch (error) {
                        toast.error("Error during download:", error);
                        setOpen(false)
                    }
                    break;
                default:
                    toast.error("Not Accepted this type of files");
                    setOpen(false)
            }
        }
    };
    const downloadData =  () => {
        switch (response.type || response.data.type) {
            case 'application/zip':
              const blobZip = new Blob([response.data], { type: 'application/zip' });
              const urlZip = window.URL.createObjectURL(blobZip);
              const linkZip = document.createElement('a');
              linkZip.href = urlZip;
              linkZip.setAttribute('download', 'my_download_file.zip');
              linkZip.click();
              break;
              case 'application/json':
                const blobPpt = new Blob([response.data], { type: 'application/zip' });
                const urlPpt = window.URL.createObjectURL(blobPpt);
                const linkPpt = document.createElement('a');
                linkPpt.href = urlPpt;
                linkPpt.setAttribute('download', 'my_download_file.zip');
                linkPpt.click();
                break;
            default:
                const blob = new Blob([response.data], { type: 'text/csv' });
                FileSaver.saveAs(blob, 'my_download_file.csv');
                // setImageSrc(null)
          }setDownloadStatus(!downloadStatus);
          setOpen(false);
          toast.success("File downloaded and data extracted successfully", { autoClose: 1000 });
          setSelectedFile(null);
    }
    return (
        <Box display={"flex"} justifyContent={"center"} component="form" onSubmit={onSubmit} >
            <ToastContainer position="bottom-right" />
            {
                downloadStatus ? (
                    <Stack textAlign={"center"}>
                    <Typography variant="h6" sx={{ color: "#68e043" }}>Extracting tables processed successfully</Typography>
                        <Typography paragraph>Please download the CSV File</Typography>
                        <Button variant="outlined" onClick={downloadData}>Download</Button>
                    </Stack>
                ) :(
                    <>
                     {
                selectedFile ?
                    <Stack spacing={2} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <img src={filePreviews} alt={'Preview'} width={"300px"} />
                        <Stack direction="row" alignItems="center" justifyContent="space-around" className="name-background">
                            <Typography paragraph mb={0} mr={2}>{selectedFile?.name}</Typography>
                            <IconButton onClick={CloseButton}>
                                <Close />
                            </IconButton>
                        </Stack>
                        <Box direction={"row"} justifyContent={"space-between"}>
                            <Button variant="outlined" onClick={CloseButton}>Cancel</Button>
                            <Button type="submit" variant="outlined"  >{selectedFile.type === "image/png" || selectedFile.type === "image/jpeg" || selectedFile.type === "image/jpg" ? "Convert " : "Download To Zip"}</Button>
                        </Box>
                    </Stack>
                    :
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
                            <img src={TableExtract} alt="logo" />
                            <Stack textAlign={"center"} padding={"20px"} margin={"18px 0px 25px 0px"}>
                                <Typography variant="body1" className="sub-title" >
                                    Please drag and drop images <br /> or <br /> PPt files which has tables
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
            }
                    </>
                )
            }
           
        </Box>
    )
}