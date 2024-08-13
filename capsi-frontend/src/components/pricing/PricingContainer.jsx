"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import planData from "../../data/planData";
import Plan from "./PricingPlan.jsx";

const PricingContainer = () => {
  const [isMonthlyPlan, setIsMonthlyPlan] = useState(true);
  return (
    <>
      <div className="flex flex-col h-full mt-7 gap-7 justify-between items-center">
        <div className="flex">
          <span className=" text-2xl sm:text-4xl font-semibold text-center">
            Achieve tasks{" "}
            <span className="bg-gradient-to-r bg-clip-text text-transparent from-[#D100D5] via-[#FF9820] to-[#FF371E]">
              100 times faster
            </span>{" "}
            with our <br className=" hidden sm:flex " />
            streamlined process.
          </span>
        </div>
        <div
          className={`bg-stone-200 flex items-center justify-between w-72 rounded-full py-2 ${
            isMonthlyPlan ? "pl-2 pr-4" : "pl-4 pr-2"
          }`}
        >
          <div className="flex items-center">
            <button
              onClick={() => {
                setIsMonthlyPlan(true);
              }}
              className={`px-8 ${
                isMonthlyPlan
                  ? "bg-white  py-1.5 font-semibold rounded-full"
                  : "font-semibold pl-6"
              }`}
            >
              Monthly
            </button>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => {
                setIsMonthlyPlan(false);
              }}
              className={`${
                isMonthlyPlan
                  ? "font-semibold"
                  : " bg-white pl-4 pr-2 py-1.5 font-semibold rounded-full "
              } flex items-center `}
            >
              <p>Yearly</p>
              <span className="ml-1 px-3 py-1 rounded-full bg-[#34BD42] text-white text-xs">
                20% off
              </span>
            </button>
          </div>
        </div>
        <div className="flex justify-center flex-wrap gap-5 px-5">
          {planData.map(
            ({ plan, price, delay, features, isMonthly, isCreator }, i) => {
              return (
                <Plan
                  plan={plan}
                  price={price}
                  delay={delay}
                  features={features}
                  isMonthly={isMonthly}
                  isCreator={isCreator}
                  isMonthlyPlan={isMonthlyPlan}
                  key={i}
                />
              );
            }
          )}
        </div>
      </div>

      <div className="flex justify-center items-center place-items-end h-full mt-24 gap-5 text-sm font-light">
        <Link
          href={"/terms-and-conditions"}
          className="hover:text-secondary duration-300"
        >
          Terms & Conditions
        </Link>
        <div className="h-[6px] w-[6px] rounded-full bg-[#727272]"></div>
        <Link
          href={"/privacy-and-policy"}
          className="hover:text-secondary duration-300"
        >
          Privacy Policy
        </Link>
      </div>
    </>
  );
};

export default PricingContainer;
