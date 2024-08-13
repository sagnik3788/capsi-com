import React from "react";
import Dialog from "@mui/material/Dialog";
// import { useMediaQuery } from "@mui/material";

const VideoPercentagePopup = ({
  percentage,
  openPercentage,
  handleClosePercentage,
}) => {
  // const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Dialog
      open={openPercentage}
      onClose={handleClosePercentage}
      // fullScreen={isMobile}
    >
      <div className="flex justify-center items-center h-48 w-72 bg-white">
        <div className="relative w-40 h-40">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full rounded-full border-2 border-gray-200"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <circle
                className="fill-transparent stroke-current text-[#FF371E] stroke-2"
                cx="18"
                cy="18"
                r="17"
                strokeWidth="2"
                strokeDasharray={`${percentage}, 100`}
              />
            </svg>
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-semibold">{percentage}%</span>
            <span className="text-xs text-stone-600">
              {percentage < 90 ? "Generating Captions..." : "Almost done..."}
            </span>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default VideoPercentagePopup;
