"use client";

import { useState } from "react";

import TextField from "../TextField";
import Button from "../../common/Button";
import { useRouter } from "next/navigation";
import LoginFooter from "../LoginFooter";
import Link from "next/link";

export default function ResetPassword() {
  const [form, setForm] = useState({
    email: "",
    password: "",
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
    <div className="flex justify-center mt-14 md:mt-24 lg:mt-20 mx-4">
      <div className="p-10 border-2 border-tertiary shadow-md shadow-gray-200 rounded-lg md:w-[60%] lg:w-[28%]">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <h3 className="text-center font-semibold text-xl md:text-2xl">
              Reset Password
            </h3>

            <p className="mt-2 text-center text-secondary text-sm md:text-base">
              Submit your email, and verify it via a
            </p>
            <p className="text-center text-secondary text-sm md:text-base">
              otp sent to your mail address
            </p>
          </div>

          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <TextField
              name="email"
              type="email"
              placeholder="Enter Email Address"
              value={form.email}
              onChange={handleChange}
              customStyles="w-full"
            />
          </div>

          <div className="w-full">
            <Link href="/verify-email" className=" w-fit h-fit">
              <Button
                type="submit"
                name="Verify"
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
