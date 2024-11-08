import Link from "next/link";
import Button from "../common/Button";
import videoIcon from "../../assets/video/video-icon.png";
import Image from "next/image";
// import UploadVideoButton from "../UploadVideoButton";

export default function Hero() {
  return (
    <div>
      <div className="flex justify-center">
        <div className="bg-pink-100 py-1 px-6 rounded-l-full rounded-r-full ">
          <div className="w-fit bg-gradient-to-r bg-clip-text text-transparent from-[#D100D5] via-[#FF9820] to-[#FF371E]">
            #made by GenZ for GenZ creators
          </div>
        </div>
      </div>
      <div className="mt-5 font-extrabold">
        <h1 className="text-3xl md:text-5xl lg:text-6xl text-slate-800 text-center">
          Instantly Craft Your Reels
        </h1>
        <h1 className="lg:mt-5 text-3xl md:text-5xl lg:text-6xl text-slate-800 text-center">
          with{" "}
          <span className="bg-gradient-to-r bg-clip-text text-transparent from-[#D100D5] via-[#FF9820] to-[#FF371E]">
            AI Brilliance! <span className=" text-5xl mb-1">✨</span>
          </span>
        </h1>
      </div>

      <div className="mt-5 lg:mt-10 flex justify-center">
        <div className=" md:text-lg text-secondary text-center px-5">
          <p>
            Unleash the potential of your content and captivate your audience
            like never
          </p>{" "}
          <p>before. Capsi-com  where creativity meets enhancement, making</p>{" "}
          <p> your videos unforgettable.</p>
        </div>
      </div>

      <div className="mt-10 flex justify-center items-center gap-6">
        <div className="hidden lg:block">
          <Button buttonType={1} name={"View Tutorial"} />
        </div>
        <Link className=" w-fit h-fit" href="/upload-video">
          <Button name={"Create video for free"}>
            <Image src={videoIcon} alt="Video Icon" className=" w-6 py-0.5" />
          </Button>
        </Link>
      </div>
      {/* <UploadVideoButton/> */}
    </div>
  );
}
