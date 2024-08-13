import React from "react";
import editImage from "../../assets/projects/edit-img.png";
import downloadImage from "../../assets/projects/download-img.png";
import deleteImage from "../../assets/projects/delete-img.png";
import Image from "next/image";

const Project = ({ heroImage, title, onDelete }) => {
  return (
    <div className="flex gap-2 pb-3">
      <div className="flex justify-between items-center gap-6">
        <div>
          <Image
            src={heroImage}
            alt="hero"
            width={56}
            height={70}
            className=" w-14 "
          />
        </div>
        <div className=" flex items-start justify-between w-full">
          <div className=" flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-7 ">
            <div className="w-[180px] font-bold">
              <span>{title}</span>
            </div>
            <div className=" flex gap-2 items-center">
              <div className="">
                <button className="flex items-center px-4 text-sm py-0.5 sm:py-1 space-x-2 border bg-[#F0F0F0] rounded-3xl">
                  <Image src={editImage} alt="edit" className=" w-3 " />
                  <span className="">Edit</span>
                </button>
              </div>
              <div>
                <button className="flex items-center px-4 text-sm py-0.5 sm:py-1 space-x-2 border bg-[#F0F0F0] rounded-3xl">
                  <Image src={downloadImage} alt="download" className=" w-3 " />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>
          <div className=" flex sm:hidden items-center text-[#727272]  text-sm font-semibold">
            <div>
              <button className="flex items-center ml-2" onClick={onDelete}>
                <Image src={deleteImage} alt="delete" className=" w-5 " />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className=" hidden sm:flex items-center text-[#727272]  text-sm font-semibold">
        <div>
          <button className="flex items-center ml-2" onClick={onDelete}>
            <Image src={deleteImage} alt="delete item" className=" w-5 " />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Project;
