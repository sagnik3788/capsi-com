import React, { useState } from "react";
import { BiPencil } from "react-icons/bi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import addIcon from "../../../assets/icon/add.png";
import editIcon from "../../../assets/icon/edit.png";
import deleteIcon from "../../../assets/icon/delete.png";
import Image from "next/image";

const VideoCaptionComponents = ({
  indexValue,
  setCurrentCaption,
  current,
  item,
  updateCaptionValue,
  addCaption,
  deleteCaption,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editedValue, setEditedValue] = useState(item.value);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    updateCaptionValue(editedValue);
    setEditMode(false);
  };

  const handleDeleteClick = () => {
    deleteCaption();
  };

  const handleChangeCurrent = () => {
    setCurrentCaption(indexValue);
  };

  return (
    <div
      onClick={handleChangeCurrent}
      className={`flex flex-col justify-between gap-3 border border-stone-200 rounded-md py-2 px-3 w-full cursor-pointer hover:bg-stone-100 duration-300 ${
        current === indexValue ? "bg-stone-100" : "bg-white"
      }`}
    >
      <div className="flex items-center justify-between">
        <div
          className={`px-3 pt-1.5 pb-0.5 font-semibold hover:bg-stone-900 hover:text-stone-50 duration-300 ${
            current === indexValue
              ? "bg-stone-900 text-stone-50"
              : "bg-stone-100 text-stone-800"
          } rounded-full`}
        >
          {item.timeStart} - {item.timeEnd}
        </div>
        <div className="flex items-center gap-1">
          <span
            className={` hover:bg-white duration-300 ${
              current === indexValue ? "bg-white" : "bg-stone-100"
            } p-1.5 rounded text-stone-800 cursor-pointer`}
            onClick={editMode ? handleSaveClick : handleEditClick}
          >
            {/* <BiPencil /> */}
            <Image className=" w-4" src={editIcon} alt="edit" />
          </span>
          <span
            className={` hover:bg-white duration-300 ${
              current === indexValue ? "bg-white" : "bg-stone-100"
            } p-1.5 rounded text-stone-800 cursor-pointer`}
            onClick={handleDeleteClick}
          >
            <Image className=" w-4" src={deleteIcon} alt="delete" />
            {/* <RiDeleteBin5Fill /> */}
          </span>
          <span
            className={` hover:bg-white duration-300 ${
              current === indexValue ? "bg-white" : "bg-stone-100"
            } p-1.5 rounded text-stone-800 cursor-pointer`}
            onClick={addCaption}
          >
            <Image className=" w-4" src={addIcon} alt="add" />
            {/* <IoMdAdd /> */}
          </span>
        </div>
      </div>
      <div className="w-full">
        {editMode ? (
          <input
            type="text"
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
            className="w-full text-stone-800 font-semibold py-1 px-2 rounded"
          />
        ) : (
          <span className="text-stone-800 font-semibold">{item.value}</span>
        )}
      </div>
    </div>
  );
};

export default VideoCaptionComponents;
