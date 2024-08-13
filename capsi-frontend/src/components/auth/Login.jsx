"use client";

import { useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import TextField from "./TextField";
import Button from "../common/Button";
import googleIcon from "../../assets/auth/googleIcon.svg";
import { useRouter } from "next/navigation";
import LoginFooter from "./LoginFooter";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Login({ type, api }) {
  const router = useRouter();

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
  const path = usePathname();
  console.log("path ", path);
  const handleSignIn = (provider) => {
    signIn(provider, { callbackUrl: `/` });
  };

  return (
    <div className="flex justify-center mt-44 mx-4">
      <div className="p-7 sm:p-10 border-2 border-tertiary shadow-md shadow-gray-300 rounded-lg sm:w-[450px] md:w-[60%] lg:w-[500px]">
        <div className="text-center mb-4 text-2xl font-bold text-gray-700">
          It’s <span className="text-green-500">Free</span> to try 👍
        </div>
        <div className="text-center mb-4 text-lg text-gray-700">
          No credit card required & <br />
          No water mark. Click below to get started.
        </div>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex justify-center">
            <button
              onClick={() => handleSignIn("google")}
              className="border border-[#1F87FC] rounded-full flex gap-2 hover:opacity-80 bg-[#1F87FC] text-white font-bold px-8 sm:px-12 py-3 duration-300"
            >
              <Image
                src={googleIcon}
                className=" bg-white rounded-full p-0.5"
                alt="Google Icon"
                width={20}
                height={20}
              />
              Continue with Google
            </button>
          </div>
        </form>

        <LoginFooter />
      </div>
    </div>
  );
}