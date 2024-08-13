"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Button from "./Button";
import logo from "../../assets/logo1.png";
import { IoMenu } from "../common/Icons";
import { sidebarContext } from "../../app/layout";
import Link from "next/link";
import { useSession } from "next-auth/react";
import videoIcon from "../../assets/video/video-icon.png";
import arrow from "../../assets/icon/logoutArrow.png";
import { getSession, signIn, signOut } from "next-auth/react";
import { deleteCookie } from "../../utils/cookieUtil";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import { styled } from "@mui/system";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const { setOpen, loggedIn, setLoggedIn } = useContext(sidebarContext);

  // Initialize video state with a default value
  const [video, setVideo] = useState("");

  useEffect(() => {
    if (session) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    setVideo(sessionStorage.getItem("video") || "");
    console.log(video);
  }, [pathname, session, setLoggedIn, video]);

  useEffect(() => {
    const handleStorageChange = () => {
      // Corrected sessionStorage syntax
      setVideo(sessionStorage.getItem("video") || "");
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    deleteCookie("accessToken");
    console.log("cookie deleted");
    signOut({ callbackUrl: "/" });
  };

  const [anchor, setAnchor] = useState(null);

  const handleClickLogoutBtn = (event) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const open = Boolean(anchor);
  const id = open ? "simple-popup" : undefined;

  return (
    <div className="relative flex justify-between items-center py-5 px-5 lg:px-0 lg:mx-32">
      {video ? (
        <>
          <Link href="/" className=" hidden md:flex">
            <Image width={100} height={100} src={logo} alt="Image" />
          </Link>
          <div className="hidden md:flex md:gap-12 md:items-center">
            <Link href="/pricing" className=" text-secondary">
              Pricing
            </Link>
            {loggedIn ? (
              <>
                <Link href="/projects" className="text-secondary ">
                  My Projects
                </Link>
                <div className=" flex items-center gap-2 border border-stone-300 p-1 rounded-full">
                  <div className=" font-semibold pt-1 px-2 text-white rounded-full bg-[#AB47BC]">
                    C
                  </div>
                  <IoIosArrowDown className=" text-stone-600" />
                </div>
              </>
            ) : (
              <>
                {" "}
                <Link href="/#features" className="text-secondary ">
                  Features
                </Link>
                <div className="flex gap-5">
                  <Button
                    name={"Get Started"}
                    onClick={() => router.push("/login")}
                  />
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <Link href="/">
            <Image width={100} height={100} src={logo} alt="Image" />
          </Link>
          <div className="hidden md:flex md:gap-12 md:items-center">
            <Link href="/pricing" className=" text-secondary">
              Pricing
            </Link>
            {loggedIn ? (
              <>
                <Link href="/projects" className="text-secondary ">
                  My Projects
                </Link>
                <div
                  className=" flex items-center gap-2 border border-stone-300 p-1 rounded-full cursor-pointer"
                  onClick={handleClickLogoutBtn}
                >
                  <div className=" font-semibold pt-1 px-2 text-white rounded-full bg-[#AB47BC]">
                    C
                  </div>
                  <IoIosArrowDown className=" text-stone-600" />
                </div>
                <BasePopup id={id} open={open} anchor={anchor}>
                  <div className=" flex flex-col items-center shadow-md rounded bg-white px-3 pb-3 w-48">
                    <div className=" border-b border-b-stone-300 py-3">
                      <div>
                        <span className=" font-semibold mr-2 text-stone-800">
                          3
                        </span>
                        <span className=" text-stone-600">
                          videos remaining
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className="bg-[#00BE13] h-2 rounded-full"
                          style={{ width: `70%` }}
                        ></div>
                      </div>
                    </div>
                    <button
                      className=" flex items-center gap-3 my-3 border border-stone-300 rounded-full px-5 py-2 text-stone-700 "
                      onClick={handleLogout}
                    >
                      <p>Logout</p>
                      <Image src={arrow} alt="logout" />
                    </button>
                  </div>
                </BasePopup>
              </>
            ) : (
              <>
                {" "}
                <Link href="/#features" className="text-secondary ">
                  Features
                </Link>
                <div className="flex gap-5">
                  <Button
                    name={"Get Started"}
                    onClick={() => router.push("/login")}
                  />
                </div>
              </>
            )}
          </div>
        </>
      )}

      <div className="md:hidden">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="p-2 border border-slate-400 rounded-full text-2xl"
        >
          <IoMenu />
        </button>
      </div>

      {video && (
        <div className=" flex md:hidden items-center gap-2">
          <Link
            href=""
            className=" py-2 px-4 rounded-full text-stone-700 bg-white border border-stone-300 font-medium"
          >
            Upload new
          </Link>
          <Link
            href=""
            className=" flex items-center gap-1.5 py-2 px-4 rounded-full text-white bg-stone-900 border border-stone-800 font-semibold"
          >
            <Image src={videoIcon} alt="video" className=" w-4" />
            <span>Export</span>
          </Link>
        </div>
      )}

      {/* Just for testing -- remove this one later */}
      {/* {loggedIn && <button onClick={handleLogout}>Logout</button>} */}

      {/* Pending */}
      {/* <div className="absolute bg-white border-r-2 min-h-screen"></div> */}
    </div>
  );
}

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const blue = {
  200: "#99CCFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0066CC",
};

const PopupBody = styled("div")(
  ({ theme }) => `
  width: max-content;
  padding: 12px 16px;
  margin: 8px;
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  box-shadow: ${
    theme.palette.mode === "dark"
      ? `0px 4px 8px rgb(0 0 0 / 0.7)`
      : `0px 4px 8px rgb(0 0 0 / 0.1)`
  };
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  z-index: 1;
`
);

const ButtonComponent = styled("button")(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: ${blue[500]};
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: 1px solid ${blue[500]};
  box-shadow: 0 2px 4px ${
    theme.palette.mode === "dark"
      ? "rgba(0, 0, 0, 0.5)"
      : "rgba(0, 127, 255, 0.5)"
  }, inset 0 1.5px 1px ${blue[400]}, inset 0 -2px 1px ${blue[600]};

  &:hover {
    background-color: ${blue[600]};
  }

  &:active {
    background-color: ${blue[700]};
    box-shadow: none;
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${
      theme.palette.mode === "dark" ? blue[300] : blue[200]
    };
    outline: none;
  }

  &.disabled {
    opacity: 0.4;
    cursor: not-allowed;
    box-shadow: none;
    &:hover {
      background-color: ${blue[500]};
    }
  }
`
);
