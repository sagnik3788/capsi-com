import React, { useEffect, useState } from "react";
import videoIcon from "../../assets/video/video-icon-black.png";
import Image from "next/image";
import LanguagePopup from "../../layout/video/LanguagePopup";
import VideoPercentagePopup from "../../layout/video/VideoPercentagePopup";
import VideoContainer from "../video/VideoContainer";
import useAppStore from "../../store";

const UploadVideo = () => {
  const [percentage, setPercentage] = useState(0); // Initialize percentage state to 0
  const [progress, setProgress] = useState(0);
  const [openProgress, setOpenProgress] = useState(true);
  const inputVideo = useAppStore(({ inputVideo }) => inputVideo);
  const setInputVideo = useAppStore((state) => state.setInputVideo);
  const [open, setOpen] = useState(false);
  const setInputFile = useAppStore((state) => state.setInputFile);
  const [openPercentage, setOpenPercentage] = useState(false);
  const [video, setVideo] = useState("");

  const [formData, setFormData] = useState({
    language: "",
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleClosePercentage = () => {
    setOpenPercentage(false);
  };

  const handleCloseProgress = () => {
    setOpenProgress(false);
  };

  const handleVideoChange = (event) => {
    const selectedVideo = event.target.files[0];
    uploadVideo(selectedVideo);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const selectedVideo = event.dataTransfer.files[0];
    uploadVideo(selectedVideo);
  };

  const uploadVideo = (selectedVideo) => {
    if (typeof window !== "undefined") {
      if (selectedVideo) {
        if (
          selectedVideo.type === "video/mp4" ||
          selectedVideo.type === "video/quicktime"
        ) {
          const videoObject = URL.createObjectURL(selectedVideo);
          const videoElement = document.createElement("video");
          videoElement.src = videoObject;
          videoElement.onloadedmetadata = () => {
            if (videoElement.duration <= 120) {
              console.log(videoObject);
              setVideo(videoObject);
              sessionStorage.setItem("video", videoObject);
              setOpen(true);
              setOpenPercentage(true);
              setOpenProgress(true);
            } else {
              alert("Video length should be 2 minutes or less.");
            }
          };
        } else {
          alert("Please select a video in MP4 or MOV format.");
        }
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (video) {
      const interval = setInterval(() => {
        setPercentage((prevPercentage) =>
          prevPercentage >= 100 ? 0 : prevPercentage + 1
        );
      }, 100);

      if (percentage === 100) {
        setTimeout(() => {
          handleClosePercentage();
        }, 100);
      }

      return () => clearInterval(interval);
    }
  }, [percentage, video]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 1
      );
    }, 200);

    if (progress === 100) {
      setTimeout(() => {
        handleCloseProgress();
      }, 200);
    }

    return () => clearInterval(interval);
  }, [progress]);

  return (
    <>
      {video ? (
        <VideoContainer
          progress={progress}
          video={video}
          openProgress={openProgress}
          openPercentage={openPercentage}
          percentage={percentage}
          formData={formData}
        />
      ) : (
        <div
          className={`${
            video ? "py-12" : "py-14"
          } flex flex-col gap-6 items-center justify-center w-80 sm:w-[500px]`}
        >
          <div className="text-center space-y-2 ">
            <h1 className="font-semibold text-3xl">Upload your video</h1>
            <p className="text-secondary">
              Upload size limit 2min or less, ensure that video you upload shall
              match the selected language{" "}
            </p>
          </div>
          <div className="mt-2 w-full">
            <label htmlFor="video" className="w-full cursor-pointer">
              <div
                className={`flex justify-center rounded-lg border border-dashed border-gray-900/25 px-3 sm:px-6 ${
                  video ? "py-10" : "py-20"
                } bg-slate-50 w-full`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <div className="text-center">
                  <div className="flex items-center justify-center">
                    <Image src={videoIcon} className=" w-16" alt="video" />
                  </div>
                  <div className="mt-4 flex leading-6 text-gray-800 font-semibold text-lg sm:text-xl">
                    <p className="pr-1">Drag and drop video or</p>
                    <input
                      id="video"
                      name="video"
                      type="file"
                      accept="video/mp4,video/quicktime"
                      className="sr-only"
                      onChange={handleVideoChange}
                      required
                    />
                    <span className="relative cursor-pointer rounded-md bg-white font-semibold text-[#FF371E] focus-within:outline-none hover:text-[#ff5640]">
                      <span> browse</span>
                    </span>
                  </div>
                  <p className="text-sm mt-1 text-gray-600">
                    MP4, MOV formats accepted.
                  </p>
                </div>
              </div>
            </label>
          </div>
        </div>
      )}
      {/* <VideoPercentagePopup
        openPercentage={openPercentage}
        handleClosePercentage={handleClosePercentage}
        percentage={percentage}
      /> */}
      <LanguagePopup
        formData={formData}
        setFormData={setFormData}
        open={open}
        handleClose={handleClose}
      />
    </>
  );
};

export default UploadVideo;
