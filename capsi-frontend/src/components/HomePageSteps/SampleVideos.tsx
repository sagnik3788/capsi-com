import { useIsMobile, useIsTablet } from "@/hooks/useMediaQuery";
import useAppStore from "@/store";
import Image from "next/image";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import VideoBox from "./VideoBox";
import { useRouter } from "next/navigation";
import Routes from "../../../routes";
import { SampleTranscripts } from "../../constants/sampleTranscript"
const TemplatesDiv = styled.div<{ isMobile?: boolean; isTablet?: boolean }>`
  width: ${(props) =>
    props.isMobile ? "100%" : props.isTablet ? "100%" : "105%"};
  //border:1px solid black;
  display: flex;
  justify-content: center;
  gap: ${(props) =>
    props.isMobile ? "10px" : props.isTablet ? "20px" : "20px"};
  padding-left: ${(props) =>
    props.isMobile ? "0px" : props.isTablet ? "0px" : "5px"};
  margin-top: 10px;
  /* overflow-x: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none; 
  &::-webkit-scrollbar {
    display: none; 
  } 
*/
`;

const SampleVidImage = styled.img`
  height: 100px;
  border-radius: 10px;
  cursor: pointer;
  border: 3px solid transparent;
  &:hover {
    border-color: #756dff;
  }
  transition: border-color 0.3s ease;
`;

const SampleVideos = () => {
  const sampleVideo = useAppStore((state: any) => state.sampleVideo);
  const setInputVideo = useAppStore((state: any) => state.setInputVideo);
  const inputVideo = useAppStore(({ inputVideo }: any) => inputVideo);

  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const router = useRouter();



  const onVideoSelectHanlder = async (url: string, index: number, sampleNumber: any) => {
    console.log(index)
    let sampleTranscript;
    if (index == 0) {
      sampleTranscript = SampleTranscripts.Transcript0;
    }
    else if (index == 1) {
      sampleTranscript = SampleTranscripts.Transcript1
    }
    else if (index == 2) {
      sampleTranscript = SampleTranscripts.Transcript2
    }
    else if (index == 3) {
      sampleTranscript = SampleTranscripts.Transcript3
    }

    const formData = new FormData();
    //@ts-ignore
    formData.append("awsurl", url);
    try {

      const payload = {
        ...inputVideo,
        isSampleVideo: true,
        sampleNumber: sampleNumber,
        transcript: sampleTranscript,
        file: formData,
        url: url,
      };

      setInputVideo(payload);
      localStorage.setItem("previousVideo", JSON.stringify(payload))

    } catch (e) {
      console.log(e);
    } finally {
      router.push(Routes.edit.path);
    }
  };

  return (
    <TemplatesDiv isMobile={isMobile} isTablet={isTablet}>
      {sampleVideo?.map(
        (
          { thumbnail, url, sampleNumber }: { thumbnail: string; url: string; sampleNumber: any; },
          index: any
        ) => {
          return (
            <SampleVidImage
            className={`gtag_sample_video_${sampleNumber}`}
              src={thumbnail}
              key={index}
              onClick={() => onVideoSelectHanlder(url, index, sampleNumber)}
            />
          );
        }
      )}
    </TemplatesDiv>
  );
};

export default SampleVideos;
