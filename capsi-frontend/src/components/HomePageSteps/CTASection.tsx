import React from 'react';
// import UploadVideoButton from './UploadVideoButton';
import SampleVideos from './SampleVideos';
import { useIsMobile, useIsTablet } from "../../hooks/useMediaQuery";

const CTASection = () => {
    const isMobile = useIsMobile();
    const isTablet = useIsTablet();

    return (
        <div style={{
            // border: '1px solid black',

            display: 'flex',flexDirection:'column',justifyContent: 'center',alignItems:'center',
        }}>
            {/* <UploadVideoButton/> */}
            <div style={{marginTop:isMobile?'10px':'20px',fontSize:isMobile?'14px':'16px'}}>Don&apos;t have a video?
                Try one of these:</div>
                <SampleVideos/>
        </div>
    );
};

export default CTASection;