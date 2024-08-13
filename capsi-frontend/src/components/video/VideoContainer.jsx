"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import videoIcon from "../../assets/video/video-icon.png";
import Image from "next/image";
import VideoCaptionComponents from "./common/VideoCaptionComponents";
import Slider from "@mui/material/Slider";
import fontDella from "../../assets/video/font_della.png";
import fontGilroy from "../../assets/video/font_gilroy.png";
import fontClashD from "../../assets/video/font_clashD.png";
import fontClashG from "../../assets/video/font_clashG.png";
import fontWorksans from "../../assets/video/font_worksans.png";
import fontThiccboi from "../../assets/video/font_thiccboi.png";
// import rgbImage from "../../assets/uploadvideo/rgb.png";

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

const VideoContainer = ({
  percentage,
  openPercentage,
  progress,
  video,
  openProgress,
  formData,
}) => {
  const [currentCaption, setCurrentCaption] = useState(0);
  const videoOptionSession = sessionStorage.getItem("videoOption");
  const [captioncount, setCaptioncount] = useState([
    {
      id: 1,
      timeStart: "0.00",
      timeEnd: "0.15",
      value: "Success is everywhere",
    },
    {
      id: 2,
      timeStart: "0.16",
      timeEnd: "0.31",
      value: "Success is everywhere",
    },
    {
      id: 3,
      timeStart: "0.32",
      timeEnd: "0.47",
      value: "Success is everywhere",
    },
    {
      id: 4,
      timeStart: "0.48",
      timeEnd: "1.03",
      value: "Success is everywhere",
    },
    {
      id: 5,
      timeStart: "1.04",
      timeEnd: "1.19",
      value: "Success is everywhere",
    },
    {
      id: 6,
      timeStart: "1.20",
      timeEnd: "1.35",
      value: "Success is everywhere",
    },
  ]);
  const [color, setColor] = useState("");

  const updateCaptionValue = (index, newValue) => {
    const updatedCaptioncount = [...captioncount];
    updatedCaptioncount[index].value = newValue;
    setCaptioncount(updatedCaptioncount);
  };

  const addCaption = (index) => {
    const newTimeEnd = parseFloat(captioncount[index].timeEnd) + 0.15;

    const newCaptionId = captioncount[index].id + 1;

    const updatedCaptions = captioncount.map((caption, idx) => {
      if (idx === index) {
        return caption;
      } else if (idx > index) {
        return {
          ...caption,
          id: caption.id + 1, // Increment the ID for subsequent captions
        };
      }
      return caption; // Leave the preceding captions unchanged
    });

    const newCaption = {
      id: newCaptionId,
      timeStart: newTimeEnd.toFixed(2), // Ensure the new timeStart is greater than the previous timeEnd
      timeEnd: (newTimeEnd + 0.15).toFixed(2), // Adjust this value as needed
      value: "New Caption",
    };

    setCaptioncount([
      ...updatedCaptions.slice(0, index + 1), // Insert new caption after the clicked index
      newCaption,
      ...updatedCaptions.slice(index + 1),
    ]);
    console.log(captioncount);
  };

  const deleteCaption = (index) => {
    const updatedCaptioncount = captioncount.filter((_, i) => i !== index);
    const reindexedCaptions = updatedCaptioncount.map((caption, idx) => ({
      ...caption,
      id: idx + 1,
    }));
    setCaptioncount(reindexedCaptions);
  };

  const handleOptionClick = (item) => {
    sessionStorage.setItem("videoOption", item);
  };

  const [selectedFont, setSelectedFont] = useState("della");

  const handleSelectFont = (item) => {
    setSelectedFont(item);
  };

  return (
    <div className=" w-80 sm:w-[600px] md:w-[650px] lg:w-[900px]">
      <div
        className={` pb-5 ${
          video ? "flex" : "hidden"
        } items-center justify-center gap-10 text-sm sm:text-base`}
      >
        {formData.language && (
          <>
            <div className=" hidden md:flex justify-around items-center gap-3 bg-stone-200 rounded-full py-2 px-2 sm:px-2 sm:min-w-72">
              {addOptions?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleOptionClick(item)}
                  className={` py-1.5 px-4 ${
                    item === videoOptionSession
                      ? "bg-white shadow rounded-full font-semibold text-stone-900"
                      : " font-medium text-stone-800"
                  }  cursor-pointer`}
                >
                  {item}
                </div>
              ))}
            </div>
            <div className=" hidden md:flex items-center gap-2">
              <Link
                href=""
                className=" py-2 px-4 rounded-full text-stone-700 bg-white border border-stone-300 font-medium"
              >
                Upload new
              </Link>
              <Link
                href=""
                className=" flex items-center gap-1.5 py-2 px-4 rounded-full text-white bg-stone-900 border border-stone-800 font-semibold"
              >
                <Image src={videoIcon} alt="video" className=" w-4" />
                <span>Export</span>
              </Link>
            </div>
          </>
        )}
      </div>

      <div
        className={` grid ${
          formData.language && " md:grid-cols-2 "
        } gap-4 justify-center items-center`}
      >
        <div className="flex items-center justify-center">
          <div className={`  relative w-fit `}>
            <video
              className="mx-auto h-[320px] sm:h-[564px] w-[200px] sm:w-[317px] w-full px-1 sm:px-0 object-cover rounded-3xl"
              controls
            >
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <div
              className={` ${
                openPercentage ? " flex " : "hidden"
              } absolute top-1/3 left-4 right-4 justify-center items-center h-48 w-72 bg-white rounded-2xl`}
            >
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
                    {percentage < 90
                      ? "Generating Captions..."
                      : "Almost done..."}
                  </span>
                </div>
              </div>
            </div>

            {/* <div
              className={` ${
                openProgress ? " flex" : "hidden"
              } absolute top-1/2 left-4 right-4`}
            >
              <div className=" flex items-center justify-center flex-col w-full">
                <div className=" w-full rounded-full bg-red-400 bg-opacity-70">
                  <div
                    className={`bg-red-500 text-xs font-semibold text-white text-center p-1 leading-none rounded-full transition-all duration-300`}
                    style={{ width: `${progress}%` }}
                  >
                    {progress}%
                  </div>
                </div>
                <span className=" text-center text-white font-bold">
                  Uploading...
                </span>
              </div>
            </div> */}
          </div>
        </div>
        {formData.language && (
          <>
            <div className=" flex md:hidden justify-around items-center gap-3 bg-stone-200 rounded-full py-2 px-2 sm:px-0 sm:min-w-72">
              {addOptions?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleOptionClick(item)}
                  className={`${
                    item === videoOptionSession
                      ? "bg-white shadow py-1.5 px-4 rounded-full font-semibold text-stone-900"
                      : " font-medium text-stone-800"
                  }  cursor-pointer`}
                >
                  {item}
                </div>
              ))}
            </div>
            <div className=" flex flex-col gap-2 overflow-y-scroll border border-stone-300 rounded-3xl max-h-96 sm:max-h-[564px] w-full p-5">
              {videoOptionSession === "Style" ? (
                <>
                  {/* <div className=" bg-stone-200 flex items-center gap-4 rounded-full py-1 pr-4 pl-1 w-fit">
                <div className=" bg-white px-4 py-1.5 font-semibold rounded-full cursor-pointer">
                  Position
                </div>
                <div className=" font-medium cursor-pointer">Size</div>
              </div>
              <div className=" text-stone-700 font-medium flex items-center gap-1 pb-2">
                <p>Y</p>
                <Slider
                  defaultValue={50}
                  aria-label="Default"
                  valueLabelDisplay="auto"
                />
                <p>-Y</p>
              </div> */}

                  <div className=" grid grid-cols-2 gap-5">
                    <div
                      className={` cursor-pointer border-4 p-0.5 rounded-md ${
                        selectedFont === 0
                          ? " border-stone-900 "
                          : " border-white "
                      }`}
                      onClick={() => handleSelectFont(0)}
                    >
                      <Image src={fontDella} alt="fontDella" />
                    </div>
                    <div
                      className={` cursor-pointer border-4 p-0.5 rounded-md ${
                        selectedFont === 1
                          ? " border-stone-900 "
                          : " border-white "
                      }`}
                      onClick={() => handleSelectFont(1)}
                    >
                      <Image src={fontGilroy} alt="fontGilroy" />
                    </div>
                    <div
                      className={` cursor-pointer border-4 p-0.5 rounded-md ${
                        selectedFont === 2
                          ? " border-stone-900 "
                          : " border-white "
                      }`}
                      onClick={() => handleSelectFont(2)}
                    >
                      <Image src={fontClashD} alt="fontClashD" />
                    </div>
                    <div
                      className={` cursor-pointer border-4 p-0.5 rounded-md ${
                        selectedFont === 3
                          ? " border-stone-900 "
                          : " border-white "
                      }`}
                      onClick={() => handleSelectFont(3)}
                    >
                      <Image src={fontClashG} alt="fontClashG" />
                    </div>
                    <div
                      className={` cursor-pointer border-4 p-0.5 rounded-md ${
                        selectedFont === 4
                          ? " border-stone-900 "
                          : " border-white "
                      }`}
                      onClick={() => handleSelectFont(4)}
                    >
                      <Image src={fontWorksans} alt="fontWorksans" />
                    </div>
                    <div
                      className={` cursor-pointer border-4 p-0.5 rounded-md ${
                        selectedFont === 5
                          ? " border-stone-900 "
                          : " border-white "
                      }`}
                      onClick={() => handleSelectFont(5)}
                    >
                      <Image src={fontThiccboi} alt="fontThiccboi" />
                    </div>
                  </div>
                </>
              ) : videoOptionSession === "Shade" ? (
                <div className=" space-y-3">
                  <div
                    className="h-14 w-full rounded-md bg-white flex items-center justify-center"
                    style={{
                      backgroundImage: "",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      textAlign: "center",
                    }}
                  >
                    <input
                      type="color"
                      color="#000000"
                      className="h-14 w-full rounded-xl bg-white flex items-center justify-center"
                      onChange={(e) => setColor(e.target.value)}
                      value={color}
                      style={{
                        backgroundImage: "",
                      }}
                    />
                  </div>

                  <div className=" pt-2 grid grid-cols-2 gap-5">
                    <div
                      className={` bg-[#267825] w-full h-14 rounded-md cursor-pointer ${
                        color === "#267825" && " border-4 border-stone-400 "
                      } `}
                      onClick={() => setColor("#267825")}
                    ></div>
                    <div
                      className={` bg-[#FFD02B] w-full h-14 rounded-md cursor-pointer ${
                        color === "#FFD02B" && " border-4 border-stone-400 "
                      } `}
                      onClick={() => setColor("#FFD02B")}
                    ></div>
                    <div
                      className={` bg-[#683AB7] w-full h-14 rounded-md cursor-pointer ${
                        color === "#683AB7" && " border-4 border-stone-400 "
                      } `}
                      onClick={() => setColor("#683AB7")}
                    ></div>
                    <div
                      className={` bg-[#2094F3] w-full h-14 rounded-md cursor-pointer ${
                        color === "#2094F3" && " border-4 border-stone-400 "
                      } `}
                      onClick={() => setColor("#2094F3")}
                    ></div>
                    <div
                      className={` bg-[#FF5722] w-full h-14 rounded-md cursor-pointer ${
                        color === "#FF5722" && " border-4 border-stone-400 "
                      } `}
                      onClick={() => setColor("#FF5722")}
                    ></div>
                    <div
                      className={` bg-[#00BCD4] w-full h-14 rounded-md cursor-pointer ${
                        color === "#00BCD4" && " border-4 border-stone-400 "
                      } `}
                      onClick={() => setColor("#00BCD4")}
                    ></div>
                    <div
                      className={` bg-[#000000] w-full h-14 rounded-md cursor-pointer ${
                        color === "#000000" && " border-4 border-stone-400 "
                      } `}
                      onClick={() => setColor("#000000")}
                    ></div>
                    <div
                      className={` bg-[#795648] w-full h-14 rounded-md cursor-pointer ${
                        color === "#795648" && " border-4 border-stone-400 "
                      } `}
                      onClick={() => setColor("#795648")}
                    ></div>
                    <div
                      className={` bg-[#DC372A] w-full h-14 rounded-md cursor-pointer ${
                        color === "#DC372A" && " border-4 border-stone-400 "
                      } `}
                      onClick={() => setColor("#DC372A")}
                    ></div>
                    <div
                      className={` bg-[#4050B5] w-full h-14 rounded-md cursor-pointer ${
                        color === "#4050B5" && " border-4 border-stone-400 "
                      } `}
                      onClick={() => setColor("#4050B5")}
                    ></div>
                    <div
                      className={` bg-[#607D8B] w-full h-14 rounded-md cursor-pointer ${
                        color === "#607D8B" && " border-4 border-stone-400 "
                      } `}
                      onClick={() => setColor("#607D8B")}
                    ></div>
                    <div
                      className={` bg-[#FF9800] w-full h-14 rounded-md cursor-pointer ${
                        color === "#FF9800" && " border-4 border-stone-400 "
                      } `}
                      onClick={() => setColor("#FF9800")}
                    ></div>
                  </div>
                </div>
              ) : (
                <>
                  {captioncount?.map((item, index) => (
                    <VideoCaptionComponents
                      key={index}
                      indexValue={index}
                      setCurrentCaption={setCurrentCaption}
                      current={currentCaption}
                      item={item}
                      updateCaptionValue={(newValue) =>
                        updateCaptionValue(index, newValue)
                      }
                      addCaption={() => addCaption(index)}
                      deleteCaption={() => deleteCaption(index)} // Pass the deleteCaption function
                    />
                  ))}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VideoContainer;

const addOptions = ["Captions", "Style", "Shade"];
const templateThemes = {
  0: {
    Theme:
      "Style: Default,Della,18,&H0000ffff,&H00FFFFFF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,1,1.5,2,10,10,60,0",
  },
  1: {
    Theme:
      "Style: Default,Gilroy,18,&H00FFFFFF,&H00FFFFFF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,0,0,2,10,10,60,0",
  },
  2: {
    Theme:
      "Style: Default,ClashD,20,&H00FFFFFF,&H00FFFFFF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,2,0,2,10,10,60,0",
  },
  3: {
    Theme:
      "Style: Default,ClashG,18,&H00000000,&H00000000,&H0001DBFF,&H00A805A7,0,0,0,0,100,100,0,0,3,4,0,2,10,10,60,128",
  },
  4: {
    Theme:
      "Style: Default,WorkSans,25,&H00FFFFFF,&H00FFFFFF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,2,0,2,28,28,67,0",
  },
  5: {
    Theme:
      "Style: Default,ThiccBoi,120,&H00FFFFFF,&H00FFFFFF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,0.5,5.5,2,28,28,400,0",
  },
};
