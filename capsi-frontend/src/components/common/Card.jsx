import Button from "./Button";

export default function Card({
  title = "",
  text1 = "",
  text2 = "",
  buttonName = "",
  buttonOnClick,
  children,
  buttonClass,
}) {
  if (!children)
    return (
      <div className="flex flex-col gap-10 p-10 lg:p-20 bg-tertiary rounded-2xl lg:rounded-[2.5rem] h-full">
        {title && (
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-semibold">
            {title}
          </h1>
        )}

        {text1 && <p className="text-sm md:text-lg text-secondary">{text1}</p>}
        {text2 && <p className="text-sm md:text-lg text-secondary">{text2}</p>}

        {buttonName && (
          <Button onClick={buttonOnClick} className={buttonClass}>
            {buttonName}
          </Button>
        )}
      </div>
    );

  return (
    <div className="flex flex-col gap-10 p-10 lg:p-20 shadow-xl shadow-gray-200 rounded-3xl rounded-3xl justify-center items-center h-full">
      {children}
    </div>
  );
}
