import { useIsMobile, useIsTablet } from '@/hooks/useMediaQuery';
import useAppStore from '@/store';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Keyframes from 'styled-components/dist/models/Keyframes';






const StyledVideo = styled.video<{ isSelected?: boolean, isMobile?: boolean, isTablet?: boolean }>`
 
  border:none;
  border-radius: 20px;
  height: ${(props) => (props.isMobile ? '200px' : props.isTablet ? '300px' : '320px')};
  max-width: 220px;
  cursor: pointer;
  transition: border-color 0.3s ease;
  
  `;

const StyledVideoContainer = styled.div<{ isSelected?: boolean, isMobile?: boolean, isTablet?: boolean }>`
  position: relative;
  width: auto;
  border:${(props) => props.isSelected ? '4px solid #6359FD' : '4px solid transparent'};
  height: ${(props) => (props.isMobile ? '200px' : props.isTablet ? '300px' : '320px')};
  border-width:${(props) => (props.isMobile ? '2px' : props.isTablet ? '3px' : '4px')};
  padding:${(props) => (props.isMobile ? '5px' : props.isTablet ? '5px' : '10px')};
  border-radius: 20px; /* Border radius for the container */
`;

const PlayIcon = styled.div<{ show?: boolean }>`
  position: absolute;
  bottom: 20px;
  right: 20px;
  padding:10px 10px 5px 10px;
  border-radius: 10px;
  background-color: white;
  cursor: pointer;
`;




const VideoBox = ({ temp, url, poster, key }: { temp: number; url: string; poster: string, key: number }) => {

    const videoRef: any = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFirstClick, setClick] = useState(0);
    const [showControls, setShowControls] = useState(false);
    const setTemplateNumber = useAppStore((state: any) => state.setTemplateNumber);
    const templateNumber = useAppStore(({ templateNumber }: any) => templateNumber);
    const isMobile = useIsMobile();
    const isTablet = useIsTablet()



    const handlePlayPause = (template: any) => {
        const video = videoRef.current;
        setClick(isFirstClick+1)
        setTemplateNumber(template)


        if (isPlaying) {
            video.pause();
        } else {
            video.play();
        }

        setIsPlaying(!isPlaying);
    };

    const handleMouseEnter = () => {
        setShowControls(true);
    };

    const handleMouseLeave = () => {
        setShowControls(false);
    };



    return (
        <StyledVideoContainer
            key={key}
            isMobile={isMobile}
            isTablet={isTablet}
            isSelected={templateNumber === temp}>

            <StyledVideo
                ref={videoRef}
                
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                isMobile={isMobile}
                isTablet={isTablet}
                isSelected={templateNumber === temp}
                muted
                loop
                controls={showControls&&isFirstClick!==0}
                poster={poster}
                preload='auto'
                onClick={() => handlePlayPause(temp)}
                onEnded={() => setIsPlaying(false)}
                // onClick={(e: any) => {
                //   e.currentTarget.play();
                //   setTemplateNumber(video.temp)

                // }}
                src={url}
            />
            {!isPlaying &&isFirstClick===0 && <PlayIcon onClick={() => handlePlayPause(temp)}>
                <Image src="/assets/playIcon.png" alt="play" width={20} height={20} />
            </PlayIcon>}
        </StyledVideoContainer>
    );
};

export default VideoBox;