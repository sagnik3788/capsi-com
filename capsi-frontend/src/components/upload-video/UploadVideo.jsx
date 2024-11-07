import React, { useEffect, useState } from "react";
import videoIcon from "../../assets/video/video-icon-black.png";
import Image from "next/image";
import LanguagePopup from "../../layout/video/LanguagePopup";
import VideoPercentagePopup from "../../layout/video/VideoPercentagePopup";
import VideoContainer from "../video/VideoContainer";
import useAppStore from "../../store";

const UploadVideo = () => {
  const [percentage, setPercentage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [openProgress, setOpenProgress] = useState(true);
  const inputVideo = useAppStore(({ inputVideo }) => inputVideo);
  const setInputVideo = useAppStore((state) => state.setInputVideo);
  const [open, setOpen] = useState(false);
  const setInputFile = useAppStore((state) => state.setInputFile);
  const [openPercentage, setOpenPercentage] = useState(false);
  const [video, setVideo] = useState("");
  
  // New state to hold transcript data
  const [transcript, setTranscript] = useState([]);

  // Fixing formData initialization
  const [formData, setFormData] = useState({
    language: "",
    WordLimit: "true", // Set default value here
  });

  const [srtUrl, setSrtUrl] = useState(""); // Add this state for SRT URL

  const [selectedFont, setSelectedFont] = useState("della");
  const [selectedColor, setSelectedColor] = useState("#000000");

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

  const uploadVideo = async (selectedVideo) => {
    console.log("uploadVideo function called");

    if (typeof window !== "undefined") {
      if (selectedVideo) {
        console.log("Selected video:", selectedVideo.name, selectedVideo.type);

        if (
          selectedVideo.type === "video/mp4" ||
          selectedVideo.type === "video/quicktime"
        ) {
          console.log("Valid video format detected");
          const videoObject = URL.createObjectURL(selectedVideo);
          const videoElement = document.createElement("video");
          
          console.log("Loading video metadata...");
          videoElement.src = videoObject;
          
          videoElement.onerror = (e) => {
            console.error("Error loading video:", e);
          };

          videoElement.onloadedmetadata = async () => {
            console.log("Video duration:", videoElement.duration);

            if (videoElement.duration <= 120) {
              console.log("Video duration is within limits");
              setVideo(videoObject);
              sessionStorage.setItem("video", videoObject);
              setOpen(true);
              setOpenPercentage(true);
              setOpenProgress(true);

              const apiFormData = new FormData();
              apiFormData.append("video", selectedVideo);
              apiFormData.append("SelectedLang", formData.language);
              apiFormData.append("WordLimit", formData.WordLimit);

              console.log("FormData prepared:", {
                language: formData.language,
                wordLimit: formData.WordLimit
              });

              try {
                console.log("Starting API call to process-video");
                const response = await fetch("http://localhost:3004/api/process-video", {
                  method: "POST",
                  body: apiFormData,
                });

                console.log("API response received:", response.status);

                if (!response.ok) {
                  throw new Error(`Failed to process video: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                console.log("API Response data:", data);

                // Store video and transcription data
                setInputVideo({
                  url: data.inputFile,
                  transcription: data.rawData,
                });

                // Handle SRT file
                if (data.srt) {
                  console.log("SRT URL received:", data.srt);
                  setSrtUrl(data.srt);
                  sessionStorage.setItem("srtUrl", data.srt);
                  
                  // Download SRT file
                  try {
                    console.log("Starting SRT download");
                    const srtResponse = await fetch(data.srt);
                    const srtText = await srtResponse.text();
                    console.log("SRT content received, creating download");
                    
                    const blob = new Blob([srtText], { type: 'text/plain' });
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `subtitle_${Date.now()}.srt`);
                    document.body.appendChild(link);
                    link.click();
                    link.parentNode.removeChild(link);
                    window.URL.revokeObjectURL(url);
                    console.log("SRT download completed");
                  } catch (error) {
                    console.error("Error downloading SRT:", error);
                  }
                } else {
                  console.warn("No SRT URL in response");
                }

                // Save to session storage
                sessionStorage.setItem("videoUrl", data.inputFile);

              } catch (error) {
                console.error("Upload error:", error);
                alert("Error uploading video. Please try again.");
              }
            } else {
              console.warn("Video too long:", videoElement.duration);
              alert("Video length should be 2 minutes or less.");
            }
          };
        } else {
          console.warn("Invalid video format:", selectedVideo.type);
          alert("Please select a video in MP4 or MOV format.");
        }
      } else {
        console.warn("No video selected");
      }
    } else {
      console.warn("Window is undefined");
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

  // Assuming you have a function to handle language selection
  const handleLanguageChange = (selectedLanguage) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      language: selectedLanguage,
    }));
    console.log("Language selected:", selectedLanguage);
  };

  return (
    <>
      {video ? (
        <div className="relative">
          <VideoContainer
            progress={progress}
            video={video}
            srtUrl={srtUrl}
            openProgress={openProgress}
            openPercentage={openPercentage}
            percentage={percentage}
            formData={formData}
            selectedFont={selectedFont}
            selectedColor={selectedColor}
          />
        </div>
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
      <LanguagePopup
        formData={formData}
        setFormData={setFormData}
        open={open}
        handleClose={handleClose}
        onLanguageChange={handleLanguageChange} // Pass the handler to the component
      />
    </>
  );
};

export default UploadVideo;