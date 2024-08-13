"use client";

import { useState } from "react";
import Button from "../../common/Button";
import LoginFooter from "../LoginFooter";
import TextField from "../TextField";
import Link from "next/link";

export default function UpdatePassword() {
  const [form, setForm] = useState({
    enter_password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center mt-14 md:mt-24 lg:mt-16 mx-4">
      <div className="p-10 border-2 border-tertiary shadow-md shadow-gray-200 rounded-lg md:w-[60%] lg:w-[28%]">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <h3 className="text-center font-semibold text-xl md:text-2xl">
            Update Your New Password
          </h3>

          <div>
            <label className="block mb-1 font-semibold">Enter Password</label>
            <TextField
              name="enter_password"
              type="password"
              placeholder="Enter Password"
              value={form.enter_password}
              onChange={handleChange}
              customStyles="w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Confirm Password</label>
            <TextField
              name="confirm_password"
              type="password"
              placeholder="Confirm Password"
              value={form.confirm_password}
              onChange={handleChange}
              customStyles="w-full"
            />
          </div>

          <div className="w-full">
            <Link href="/" className=" w-fit h-fit">
              <Button
                type="submit"
                name="Save and Continue"
                wfull={true}
                onClick={() => {}}
              />
            </Link>
          </div>
        </form>

        <LoginFooter />
      </div>
    </div>
  );
}
