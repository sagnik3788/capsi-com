"use client";
import UploadArrow from "../icons/UploadArrow";
import { Button, Text } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { useSession } from "next-auth/react";
import useAppStore from "../store";
import { useIsMobile, useIsTablet } from "../hooks/useMediaQuery";
import Routes from "../../routes";
// import LoadingModal from "../LoadingModal/LoadingModal";

const UploadDiv = styled.div`
  display: flex;
  width: ${(props) => (props.isMobile ? '200px' : props.isTablet ? '200px' : '200px')};
  height: ${(props) => (props.isMobile ? '30px' : props.isTablet ? '50px' : '50px')};
  padding: 10px 51px;
  justify-content: center;
  align-items: center;
  gap: ${(props) => (props.isMobile ? '10px' : props.isTablet ? '20px' : '20px')};
  margin-top: ${(props) => (props.isMobile ? '20px' : props.isTablet ? '40px' : '40px')};
  flex-shrink: 0;
  font-size: 16px;
  color: white;
  border-radius: 20px;
  background: #756dff;
  border: 2px solid #756dff;
  /* lg */
  &:hover{

      box-shadow: 0px 8px 11px -4px rgba(45, 54, 67, 0.1),
      0px 20px 24px -4px rgba(45, 54, 67, 0.1);
    }
  cursor: pointer;
  transition: border-color 0.3s ease;
  transition: box-shadow 0.3s ease;
  &:hover {
    border: 2px solid #756dff;
  }

`;


const LineBreak = styled.span`
  
`
const UploadVideoButton = () => {
    const setInputVideo = useAppStore((state) => state.setInputVideo)
    const inputFile=useAppStore((state)=>state.inputFile);
    const inputVideo = useAppStore(({ inputVideo }) => inputVideo)
    const setInputFile=useAppStore((state)=>state.setInputFile)
    const isMobile = useIsMobile();
    const isTablet = useIsTablet();
    const router = useRouter();

 
    const onUploadFile = async (e) => {
        const file = e.target.files[0];
        console.log("test");
        
        console.log("Selected File:", file);
        
        if (file) {
            setInputFile(file);
            const formData = new FormData();
            //@ts-ignore
            formData.append("video", file);
            //@ts-ignore
            console.log(formData.video)
            try {

                const videoURL = URL.createObjectURL(file);
                const payload = {
                    ...inputVideo,
                    isSampleVideo: false,
                    sampleNumber:null,
                    transcript:[],
                    file: formData,
                    url: videoURL,
                }
                
                setInputVideo(payload);

            } catch (e) {
                console.log(e);
            } finally {

                router.push(Routes.edit.path);

            }

        }
    }


    return (
        <label htmlFor="videoUpload">
            <div style={{
                width: 'fit-content',
                //border: '2px solid #756dff', 
                cursor: 'pointer',
                height: isMobile ? '120px' : '250px',
                padding: isMobile ? '10px' : '20px',
                borderRadius: '20px',
                boxShadow: isMobile ? 'none' : '0px 8px 11px -4px rgba(45, 54, 67, 0.1),0px 20px 24px -4px rgba(45, 54, 67, 0.1)',

            }}>
                <div >

                    <UploadDiv isMobile={isMobile} isTablet={isTablet}>
                        {/* Your existing content */}
                        <UploadArrow />
                        Upload Your Video
                    </UploadDiv>
                </div>
                <input
                    type="file"
                    name="videoUpload"
                    id="videoUpload"
                    className="gtag_upload_video_input"
                    accept="video/*"
                    style={{ display: "none" }}
                    onChange={onUploadFile}
                />
                <Text weight={"normal"} css={{ color: "#737373", textAlign: 'center', mt: isMobile ? '10px' : '50px' }} size={isMobile ? 11 : 14}>
                    Max 90s, MP4, MOV formats & <LineBreak><br /></LineBreak>
                    1:1, 4:5, 9:16 ratio accepted
                </Text>
                
            </div>
        </label>
    );
};

export default UploadVideoButton;