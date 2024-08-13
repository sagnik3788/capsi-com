import { useIsMobile, useIsTablet } from '@/hooks/useMediaQuery';
import useAppStore from '@/store';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import VideoBox from './VideoBox';



const TemplatesDiv = styled.div<{isMobile?:boolean,isTablet?:boolean}>`
  width:${(props)=>(props.isMobile?'100%':props.isTablet?'100%':'100%')};
  //border:1px solid black;
  display: flex;
  gap: 20px;
  padding-left: ${(props)=>(props.isMobile?'0px':props.isTablet?'0px':'5px')};
  margin-top: 10px;
  overflow-x: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none; 
  &::-webkit-scrollbar {
    display: none; /* For Chrome, Safari and Opera */
  }

`;




const Templates = () => {

    const templateVideos=useAppStore((state:any) => state.templateVideos);
    const isMobile=useIsMobile();
    const isTablet=useIsTablet();

    return (
        <TemplatesDiv isMobile={isMobile} isTablet={isTablet}>
          {
            templateVideos.map(({temp,url,poster}:{temp:number,url:string,poster:string}, index:any) => {

              return <VideoBox temp={temp} url= {url} poster={poster} key={index}/>
            })}


        </TemplatesDiv>
    );
};

export default Templates;