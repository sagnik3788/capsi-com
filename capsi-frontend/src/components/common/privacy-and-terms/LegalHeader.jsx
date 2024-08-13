"use client";

import { FaArrowLeftLong } from "../../../components/common/Icons";
import { useRouter } from "next/navigation";

export default function LegalHeader({ title }) {
  const router = useRouter();
  return (
    <div>
      <button
        onClick={() => router.back()}
        className="flex gap-2 items-center bg-tertiary px-3 py-1 border text-secondary rounded-r-full rounded-l-full hover:bg-slate-100 duration-300 "
      >
        <FaArrowLeftLong /> <span className="mt-1 text-sm">Back</span>
      </button>
      <br />
      <h1 className="text-xl font-semibold">{title}</h1>
    </div>
  );
}
