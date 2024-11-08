import Image from "next/image";
import { FaFacebook, FaTwitter, RiInstagramFill } from "../common/Icons";
import logo from "../../assets/logo2.png";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex flex-col gap-8 bg-[#1D1C20] text-white py-20">
      <button className="flex justify-center">
        <Image width={100} height={100} src={logo} alt="Image" />
      </button>

      <h1 className="hidden lg:block text-center text-3xl">
        Save around hundreds of hours with Capsi-com
      </h1>

      <h1 className="lg:hidden text-center text-2xl">
        Add some AI vibe to your reel
      </h1>

      <div className="flex justify-center items-center gap-5">
        <IconButton>
          <FaFacebook />
        </IconButton>
        <IconButton>
          <RiInstagramFill />
        </IconButton>
        <IconButton>
          <FaTwitter />
        </IconButton>
      </div>

      <div className="flex justify-center items-center gap-5 text-sm font-light">
        <Link
          href={"/terms-and-conditions"}
          className="hover:text-secondary duration-300"
        >
          Terms & Conditions
        </Link>
        <Link
          href={"/privacy-and-policy"}
          className="hover:text-secondary duration-300"
        >
          Privacy Policy
        </Link>
        <a href="mailto:support@capsai.co" className="hover:text-secondary duration-300">
        Contact Us
      </a>
      </div>
    </div>
  );
}

function IconButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-white bg-primary px-5 py-5 hover:bg-gray-800 duration-300 rounded-full text-3xl"
    >
      {children}
    </button>
  );
}
