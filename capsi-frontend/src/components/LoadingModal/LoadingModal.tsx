import React, { useState,useEffect } from 'react'
import { Modal,Text} from "@nextui-org/react";
import LinearProgress from '@mui/material/LinearProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme({
  palette: {
    secondary: {
      main: '#756DFF',
    },
  },
});
const LoadingModal = ({ loading, progress, setProgress,burnVideo }: { loading: boolean; progress: number; setProgress: any,burnVideo:boolean}) => {

  useEffect(() => {
    if (loading) {
      const timer = setInterval(() => {
        setProgress((prevProgress: any) => (prevProgress >= 90 ? prevProgress : prevProgress + 1));
      }, 500);
  
      return () => {
        clearInterval(timer);
      };
    }
  }, [loading]);
 
  return (
    <div>
         <Modal
         preventClose
        aria-labelledby="modal-title"
        open={loading}
      >
        <Modal.Header>
        <img style={{width:"100px",height:"100px",objectFit:"cover"}} src='/Stars.gif'/>
        </Modal.Header>
        <Text id="modal-title" size={20}>
          {burnVideo ?"Generating video with captions":"Ai is transcribing your video" }
        </Text>
        <Modal.Body >
         <ThemeProvider theme={theme}>
       <LinearProgress style={{height:"15px",borderRadius:"8px"}} variant="determinate" color='secondary' value={progress} />
       </ThemeProvider>
        </Modal.Body>
        <Modal.Footer>          
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default LoadingModal