import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import Select from "react-select";
import Button from "../../components/common/Button";
import { SvgIcon } from "@mui/material";
const LanguagePopup = ({ formData, setFormData, open, handleClose }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const handleChangeOption = (selectedOption) => {
    setSelectedLanguage(selectedOption);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (selectedLanguage) {
      setFormData({
        ...formData,
        language: selectedLanguage.value,
      });
      handleClose(); // Close the dialog after updating the formData
    }
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form
          onSubmit={onSubmit}
          className=" flex flex-col gap-4 bg-white rounded-xl py-2 px-6"
        >
          <div className=" w-full mt-2">
            <h1 className=" text-stone-800 font-bold mb-1">Select Language</h1>
            <Select
              id="language"
              name="language"
              className=" w-full"
              value={selectedLanguage}
              onChange={handleChangeOption}
              options={language}
              required
            />
          </div>
          {/* <button
            type="submit"
            className=" py-2 rounded-full bg-stone-900 text-white font-medium hover:opacity-80 duration-300"
          >
            Proceed
          </button> */}
          <Button
            name={"Proceed"}
            onClick={onSubmit}
            wfull={true}
            disabled={!selectedLanguage}
          />
          <div className="mb-2 text-sm sm:text-base">
            <span className="text-black font-medium"> </span>
            <span className="text-stone-700"></span>
          </div>
          <div className="mb-2 text-sm sm:text-base">
            <span className="text-black text-1xl font-extrabold">Note:- </span>
            <span className="text-stone-700">
              the language which you will select will apply on captions choose
              it correctly according to the video you have uploaded
            </span>
          </div>
        </form>
      </Dialog>
    </React.Fragment>
  );
};

export default LanguagePopup;

export const language = [
  { value: "Hindi", label: "🇮🇳 Hindi" },
  { value: "English", label: "🇺🇸 English" },
];
