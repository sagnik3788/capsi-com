import heroImage1 from "../../assets/home/heroImage1.png";
import heroImage2 from "../../assets/home/heroImage2.png";
import heroImage3 from "../../assets/home/heroImage3.png";
import heroImage4 from "../../assets/home/heroImage4.png";
import Image from "next/image";

export default function ImageList() {
  return (
    <div className="mt-16 flex justify-center gap-2 sm:gap-5 sm:w-[100%] md:w-[130%] lg:w-[80%] px-2 md:px-0">
      <div className="hidden lg:block  bg-white w-20 blur-xl translate-x-16 -translate-y-0 h-[28rem]"></div>
      <div className="mt-10">
        <Image
          src={heroImage1}
          alt="Image"
          width={200}
          height={0}
          className="w-[12.5rem]"
        />
      </div>
      <div>
        <Image
          src={heroImage2}
          alt="Image"
          width={200}
          height={0}
          className="w-[12.5rem]"
        />
      </div>
      <div className="mt-10">
        <Image
          src={heroImage3}
          alt="Image"
          width={200}
          height={0}
          className="w-[12.5rem]"
        />
      </div>
      <div>
        <Image
          src={heroImage4}
          alt="Image"
          width={200}
          height={0}
          className="w-[12.5rem]"
        />
      </div>
      <div className="hidden lg:block bg-white w-20 blur-xl -translate-x-16 -translate-y-8 h-[28rem]"></div>
    </div>
  );
}
