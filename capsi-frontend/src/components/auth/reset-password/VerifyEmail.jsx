"use client";

import { useState } from "react";
import Button from "../../common/Button";
import LoginFooter from "../LoginFooter";
import OtpInput from "react-otp-input";
import Link from "next/link";

export default function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center mt-14 md:mt-24 lg:mt-28 mx-4">
      <div className="p-10 border-2 border-tertiary shadow-md shadow-gray-200 rounded-lg md:w-[60%] lg:w-[28%]">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <h3 className="text-center font-semibold text-xl md:text-2xl">
              Verify Email Address
            </h3>

            <p className="mt-2 text-center text-secondary text-sm md:text-base">
              Check your inbox you might have
            </p>
            <p className="text-center text-secondary text-sm md:text-base">
              received an email
            </p>
          </div>

          <div className=" w-full">
            <label className="block mb-1 font-semibold">Enter OTP</label>
            {/* Pending */}
            <input
              type="text"
              placeholder="OTP"
              className=" border border-stone-300 rounded py-2 px-4 text-stone-700 focus:outline-none w-full"
            />
            {/* <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              renderSeparator={<span>{"  "}</span>}
              renderInput={(props) => <input className=" " {...props} />}
              skipDefaultStyles={true}
            /> */}
          </div>

          <div className="w-full">
            <Link href="/update-password" className=" w-fit h-fit">
              <Button
                type="submit"
                name="Verify"
                wfull={true}
                onClick={() => {}}
              />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
