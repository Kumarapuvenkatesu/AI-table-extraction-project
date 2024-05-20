import React, { useState, useContext } from "react";
import { Box, Typography, Stack, TextField, IconButton, Button } from "@mui/material";
import SideBar from "../Header/SideBar";
import SubLogo from "./SubLogo";
import TableExtract from '../../assets/ai-images/table-extract-img.png';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Close } from "@mui/icons-material";
import axios from "axios";
import * as FileSaver from 'file-saver';
import downloadImg from "../../assets/ai-images/table-success.png";
import { DataContext } from "../context/Context";
import { Loading } from "../Loading/Loading";

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
        console.log("drag files", files)
        if (files) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (file.type === "application/x-zip-compressed" ||
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
        // if (selectedFile) {
        //     switch (selectedFile.type) {
        //         // case "image/jpg" || "image/png" || "image/jpeg":
        //         case "image/jpg":
        //         case "image/png":
        //         case "image/jpeg":
        //             try {
        //                 const formData = new FormData();
        //                 formData.append("image", selectedFile);
        //                 const response = await axios.post('http://10.91.10.142:3002/tableExtraction', formData);
        //                 console.log("1112", response)
        //                 setResponse(response)
        //                 if (response.status === 200) {
        //                     setDownloadStatus(!downloadStatus)
        //                 }
        //             } catch (error) {
        //                 console.log(error);
        //                 toast.error("An error occurred. Please try again.");
        //                 setOpen(false)
        //             }
        //             break;
        //         case "application/x-zip-compressed":
        //             try {
        //                 const formData = new FormData();
        //                 formData.append("image", selectedFile);
        //                 const response = await axios.post("http://10.91.10.142:3002/allImgTabExt", formData
        //                     , {
        //                         responseType: 'blob'
        //                     });
        //                 console.log("resp", response.data.type)
        //                 setResponse(response)
        //                 if (response.status === 200) {
        //                     setDownloadStatus(!downloadStatus)
        //                 }
        //             } catch (error) {
        //                 toast.error("Error during download:", error);
        //                 setOpen(false)
        //             }
        //             break;
        //         case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        //             try {
        //                 const formData = new FormData();
        //                 formData.append("image", selectedFile);
        //                 const response = await axios.post("http://10.91.10.142:3002/pptFileExtraction", formData, {
        //                     responseType: 'blob'
        //                 });
        //                 console.log("data", response);
        //                 console.log("resp", response.data.type)
        //                 setResponse(response)
        //                 if (response.status === 200) {
        //                     setDownloadStatus(!downloadStatus)
        //                 }
        //             } catch (error) {
        //                 toast.error("Error during download:", error);
        //                 setOpen(false)
        //             }
        //             break;
        //         default:
        //             toast.error("Not Accepted this type of files");
        //             setOpen(false)
        //     }
        // }
    };
    const downloadData = () => {
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
        <Box ml={`${MarginLeft.widthValue + 42}px`}>
            <SideBar />
            <Box mt={"5rem"} marginRight={"3rem"}>
                <SubLogo />
                <Box display={"flex"} justifyContent={"center"} component="form" onSubmit={onSubmit} className="dropzone" sx={{ py: "5%" }}>
                    <ToastContainer position="bottom-right" />
                    {
                        downloadStatus ? (
                            <Stack textAlign={"center"} alignItems={"center"}>
                                <img src={downloadImg} alt="extract" width={"100px"} />
                                <Typography variant="h6" sx={{ color: "#006aff" }}>Extracting tables processed successfully</Typography>
                                <Typography paragraph>Please download the CSV File</Typography>
                                <Button variant="outlined" onClick={downloadData}>Download</Button>
                            </Stack>
                        ) : (
                            <>{
                                open ?
                                    <Stack>
                                        <Loading mb={4}/>
                                        <Typography paragraph mt={2}>Extracting Tables in Progress</Typography>
                                    </Stack> : <>
                                        {
                                            selectedFile ?
                                                <Stack spacing={2} sx={{ display: "flex", alignItems: "center", justifyContent: "center", py: "5%" }} >
                                                    {selectedFile.type === 'application/x-zip-compressed' || selectedFile.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation" ? null : <img src={filePreviews} alt={'Preview'} width={"300px"} />}
                                                    <Stack direction="flex" alignItems="center" justifyContent="center" className="border-width">
                                                        <Typography paragraph mb={0} mr={2}>{selectedFile?.name}</Typography>
                                                        <IconButton onClick={CloseButton}>
                                                            <Close />
                                                        </IconButton>
                                                    </Stack>
                                                    <Box className="button-display">
                                                        <Button variant="outlined" onClick={CloseButton} className="border-width">Cancel</Button>
                                                        <Button className="border-width" type="submit" variant="outlined"  >{selectedFile.type === "image/png" || selectedFile.type === "image/jpeg" || selectedFile.type === "image/jpg" ? "Convert " : "Download To Zip"}</Button>
                                                    </Box>
                                                </Stack>
                                                :
                                                <Box className="grid-position"  >
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
                                                                    Drag and drop images <br /> or <br /> PPT files which has tables
                                                                </Typography>
                                                            </Stack>
                                                        </Stack>
                                                    </Stack>
                                                    <Stack display={"flex"} alignItems={"center"} justifyContent={"center"} margin={"8px"}>
                                                        <Typography >OR</Typography>
                                                    </Stack>
                                                    <Stack display="flex" alignItems="center" padding={"62px"} height={"305px"} className="dropzone2">
                                                        <img src={TableExtract} alt="logo" />
                                                        <Stack textAlign={"center"} padding={"20px"} margin={"18px 0px 25px 0px"}>
                                                            <Typography variant="body1" className="sub-title" >
                                                                Upload the images <br /> or <br /> PPT files which has tables
                                                            </Typography>
                                                            <Button variant="outlined" sx={{ mt: 4 }} onClick={handleFileUpload}>Upload</Button>
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