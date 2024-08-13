"use client";
import React, { useState } from "react";
import Button from "../common/Button";
import Image from "next/image";
import Link from "next/link";
import Projects from "./Projects";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import videoIcon from "../../assets/video/video-icon.png";
import deleteIcon from "../../assets/icon/deleteIcon.png";
import heroImg from "../../assets/home/heroImage1.png";

const ProjectContainer = () => {
  const [projects, setProjects] = useState([
    {
      heroImage: heroImg,
      title: "Focus on the present Future will be good",
    },
    {
      heroImage: heroImg,
      title: "Focus on the present Future will be good",
    },
    {
      heroImage: heroImg,
      title: "Focus on the present Future will be good",
    },
  ]);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  const deleteProject = (index) => {
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);
    setProjects(updatedProjects);

    setShowDeleteSuccess(true);
    setTimeout(() => {
      setShowDeleteSuccess(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center min-h-full">
      <div className=" min-h-20">
        {showDeleteSuccess && (
          <div className="flex items-center justify-center px-3">
            <div className="text-stone-900 flex gap-4 items-center font-bold py-3 px-4 rounded-lg shadow-xl">
              <Image src={deleteIcon} className=" mb-1" alt="delete" />
              <p>Project Deleted successfully</p>
            </div>
          </div>
        )}
      </div>
      <div>
        <div className="flex justify-between pt-2">
          <div className="flex justify-between sm:justify-start items-center gap-2 min-w-[280px]">
            <div className="font-extrabold text-2xl w-full">My Projects</div>
            <div className=" w-full min-w-[80px]">
              <FormControl size="small" fullWidth>
                <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                <Select label="filter">
                  <MenuItem value={1}>Recent</MenuItem>
                  <MenuItem value={2}>Old</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className=" hidden sm:flex">
            <Link className=" w-fit h-fit" href="/upload-video">
              <Button customStyle={" text-sm "} name={"Create New"}>
                <Image
                  src={videoIcon}
                  alt="Delete Icon"
                  className=" w-4 py-0.5"
                />
              </Button>
            </Link>
          </div>
        </div>
        <div>
          <div className="py-10">
            {projects.map(({ heroImage, title }, i) => (
              <React.Fragment key={i}>
                {i !== 0 && <hr className="pt-3" />}
                <Projects
                  heroImage={heroImage}
                  title={title}
                  onDelete={() => deleteProject(i)}
                />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center place-items-end h-full mt-5 gap-5 text-sm font-light">
        <Link
          href={"/terms-and-conditions"}
          className="hover:text-secondary duration-300"
        >
          Terms & Conditions
        </Link>
        <div className="h-[6px] w-[6px] rounded-full bg-[#727272]"></div>
        <Link
          href={"/privacy-and-policy"}
          className="hover:text-secondary duration-300"
        >
          Privacy Policy
        </Link>
      </div>
    </div>
  );
};

export default ProjectContainer;
