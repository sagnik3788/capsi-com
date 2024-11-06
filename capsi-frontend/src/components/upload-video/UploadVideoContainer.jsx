
"use client";
import React, { useState, useEffect } from "react";
import UploadVideo from "./UploadVideo";
import Link from "next/link";

const UploadVideoContainer = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className=" min-h-8 sm:min-h-12">
        {showWelcome && (
          <div className="flex items-center justify-center px-3">
            <div className="text-stone-900 font-bold py-3 px-4 rounded-lg shadow-xl">
              🎉 welcome to Caps<span className="text-[#FF371E]">AI</span>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center items-center w-full">
        <div className="w-full max-w-md mx-auto">
          <UploadVideo />
        </div>
      </div>
      <div className="h-full flex items-end justify-center gap-3 font-medium text-stone-600 pt-10 sm:pt-14 ">
        <Link href="/terms-and-conditions">Terms & Conditions</Link>
        <Link href="/privacy-and-policy">Privacy policy</Link>
      </div>
    </div>
  );
};

export default UploadVideoContainer;