import Image from "next/image";

const PricingPlan = ({
  plan,
  price,
  delay,
  features,
  isMonthly,
  isCreator,
  isMonthlyPlan,
}) => {
  if (isMonthlyPlan && !isMonthly) {
    return;
  } else if (!isMonthlyPlan && isMonthly) {
    return;
  }
  return (
    <div className=" relative w-fit ">
      <div
        className={`${
          isCreator
            ? "bg-gradient-to-r  from-[#D100D5] via-[#FF9820] to-[#FF371E]"
            : "border-2"
        } rounded-xl px-[3px] py-[2px] flex relative `}
      >
        {/* {isCreator && (
        <>
          <div className="absolute bg-gradient-to-r  from-[#D100D5] via-[#FF9820] to-[#FF371E] opacity-10">
            <span className="bg-gradient-to-r bg-clip-text text-transparent from-[#D100D5] via-[#FF9820] to-[#FF371E]">For Creators</span>
          </div>
          <div className="absolute left-0 right-0 ">
            <div className="bg-gradient-to-r from-[#D100D5] via-[#FF9820] to-[#FF371E] ">
              <span className="text-transparent bg-gradient-to-r bg-clip-text from-[#D100D5] via-[#FF9820] to-[#FF371E] ">
                For Creators
              </span>
            </div>
          </div>
        </>
      )} */}
        <div className="rounded-xl py-10 px-10 bg-white flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            <div className=" flex flex-col gap-3">
              <div className="text-xl font-bold ">{plan}</div>
              <div className="flex flex-col text-[#6B6B6B]">
                <span className=" font-semibold text-[14px]">
                  Rs{" "}
                  <span className="text-3xl  text-black font-extrabold">
                    {price}
                  </span>
                  /{isMonthly ? "Month" : "Year"}
                </span>
                <span className="text-sm font-medium">
                  {delay} Sec or less each
                </span>
              </div>
            </div>
            <div>
              <hr />
            </div>
          </div>
          <div className="w-full">
            <button
              className={`w-full border-2 border-black ${
                isCreator ? " text-white bg-black" : "text-black"
              } font-semibold rounded-full py-1`}
            >
              Go {plan !== "Trial" ? plan : "Free"}
            </button>
          </div>
          <div className="">
            {features.map(({ feature, typeImage, type }, index) => {
              return (
                <div key={index} className="flex items-center gap-[10px] ">
                  <div>
                    <Image src={typeImage} width={14} height={14} alt={type} />
                  </div>
                  <div>
                    <span
                      className={`font-semibold text-base ${
                        type === "Information"
                          ? "text-[#A8A8A8]"
                          : "text-[#6B6B6B]"
                      }`}
                    >
                      {feature}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {isCreator && (
        <div className=" absolute -top-3 w-full flex items-center justify-center left-0 right-0 ">
          <div className=" rounded-full w-fit text-center px-6 py-1 bg-[#FFEBE8] font-bold text-sm ">
            <div className="bg-gradient-to-r from-[#D100D5] via-[#FF9820] to-[#FF371E]  bg-clip-text text-transparent">
              For Creators
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingPlan;
