import Link from "next/link";

export default function LoginFooter() {
  return (
    <>
      <hr className="my-3" />
      <p className="text-xs md:text-sm text-gray-500 text-center">
        By continuing you have understood and agree to
      </p>
      <p className="text-xs md:text-sm text-gray-500 text-center">
        Caption Craft{" "}
        <Link className="text-black underline" href="terms-and-conditions">
          Terms of Services
        </Link>{" "}
        and{" "}
        <Link className="text-black underline" href="privacy-and-policy">
          Privacy
        </Link>
      </p>
    </>
  );
}
