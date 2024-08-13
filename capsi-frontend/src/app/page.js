"use client";

import { useEffect } from "react";
import CardSection1 from "../components/home/CardSection1";
import CardSection2 from "../components/home/CardSection2";
import CardSection3 from "../components/home/CardSection3";
import Footer from "../components/home/Footer";
import Hero from "../components/home/Hero";
import ImageList from "../components/home/ImageList";
import { useSession } from "next-auth/react";
import { getCookie, setCookie } from "../utils/cookieUtil";
import { createAccessToken } from "../apis/userApis";
// import UploadVideoButton from "../components/UploadVideoButton";

export default function Home() {
  const { data: session } = useSession();
  // console.log("session", session);
  useEffect(() => {
    // console.log("home session creation....");
    const fetchData = async () => {
      const accessToken = getCookie("accessToken");
      const sessionId = getCookie("sessionId");
      if (session && !accessToken) {
        const body = {
          iss: "https://accounts.google.com",
          azp: process.env.NEXT_CLIENT_ID,
          aud: process.env.NEXT_CLIENT_ID,
          email: session.user?.email,
          email_verified: true,
          name: session.user?.name,
          picture: session.user?.image,
          sessionId: sessionId,
          identity: "google",
          ref: "/",
          role: "consumer",
          context: "app",
        };

        // console.log("calling api");
        const loginData = await createAccessToken(body);

        const accessToken = loginData?.result?.accessToken?.id;

        setCookie("accessToken", accessToken);
        console.log("login token created");
      }
    };

    fetchData();
  }, [session]);
  return (
    <div className="">
      <div className="md:mx-24 lg:mx-32 mb-16">
        <header className="mt-20 flex flex-col justify-center items-center">
          <Hero />
          {/* <UploadVideoButton /> */}
          <ImageList />
        </header>
        <div className="mt-10 flex flex-col lg:gap-16 gap-8" id="features">
          <CardSection1 />
          <CardSection2 />
          <CardSection3 />
        </div>
      </div>
      <Footer />
    </div>
  );
}