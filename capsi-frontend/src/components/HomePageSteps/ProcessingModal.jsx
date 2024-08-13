import React, { useEffect, useState } from 'react';
import { Modal } from "@nextui-org/react";
import Loader from '../Loader/Loader';
import useAppStore from '../../store';
import { GetVideoStatus } from '../../apis/processApis';

const ProcessingModal = () => {
    const startProcessing = useAppStore((state) => state.isProcessing)
    const setIsProcessing = useAppStore((state) => state.setIsProcessing)

    const [videoStatus, setVideoStatus] = useState(
        "Ai is Creating Video"
    );

    const closeHandler = () => {
        setIsProcessing(false);
        console.log("closed");
    };

    async function checkVideoStatus() {
        try {
            const response = await GetVideoStatus();
            setVideoStatus(response.data.status);

            console.log(response);
        } catch (error) {
            console.error("Error checking video status:", error);
        }
    }

    useEffect(() => {

        if (startProcessing) {
            
            const statusCheckInterval = setInterval(async () => {
                await checkVideoStatus();
            }, 2000);

            return () => {
                clearInterval(statusCheckInterval);
            };
        }
    }, [startProcessing]);

    return (
        <Modal
            blur
            preventClose
            aria-labelledby="modal-title"
            open={startProcessing}
            onClose={closeHandler}
            css={{ height: "auto" }}
        >
            <Modal.Header
                css={{ display: "flex", flexDirection: "column" }}
            ></Modal.Header>
            <Modal.Body
                css={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Loader />
                {startProcessing && <div style={{ textAlign: "center" }}>{videoStatus}</div>}
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
        </Modal>
    );
};

export default ProcessingModal;