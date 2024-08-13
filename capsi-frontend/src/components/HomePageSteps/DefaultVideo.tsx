import { useIsMobile, useIsTablet } from '../../hooks/useMediaQuery';
import React from 'react';
import styled from 'styled-components';

const StyledVideo = styled.img<{ isSelected?: boolean, isMobile?: boolean, isTablet?: boolean }>`
  object-fit: contain;
  /* border:1px solid black; */
  border-radius: 20px;
  width:fit-content;
  height: ${(props) => (props.isMobile ? '180px' : props.isTablet ? '350px' : '350px')};
  margin:${(props) => (props.isMobile ? 'auto' : props.isTablet ? 'auto' : '0px')};
  cursor:default;
  transition: border-color 0.3s ease;
  
  `;

const DefaultVideo = () => {

    const isMobile = useIsMobile();
    const isTablet = useIsTablet()



    return (
        <div style={{
            //  border: '1px solid black',
            display: 'flex',
            flexDirection:isMobile? 'column-reverse':'column',
            width:'min-content',
            justifyContent: 'center',
            alignItems: 'left',
            paddingTop:'5px',
}}>
            <h1 style={{
                fontSize: isMobile?'20px':'40px',
                textAlign: 'center',
                fontWeight: 'bolder',
                // border: '1px solid black',
            }}>Create stunning <span style={{ color:'#756dff'}}>captions</span> in seconds</h1>

            <StyledVideo

                isMobile={isMobile}
                isTablet={isTablet}
                src={'/assets/demovideo.gif'}
            />
        </div>
    );
};

export default DefaultVideo;