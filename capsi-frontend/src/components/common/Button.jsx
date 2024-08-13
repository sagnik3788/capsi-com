export default function Button({
  type = "button",
  name,
  onClick,
  children,
  buttonType = 0,
  wfull = false,
}) {
  if (buttonType === 0)
    return (
      <button
        className={`${
          children ? "flex gap-2 items-center" : ""
        } bg-primary text-white px-9 py-3 rounded-l-full rounded-r-full hover:bg-gray-800 duration-300  ${
          wfull ? "w-full" : "w-fit"
        } font-semibold text-center`}
        onClick={onClick}
        type={type}
      >
        {children} {name}
      </button>
    );
  else if (buttonType === 1)
    return (
      <button
        className={`border-2 border-primary bg-transparent px-9 py-3 rounded-l-full rounded-r-full hover:bg-stone-100 duration-300  ${
          wfull ? "w-full" : "w-fit"
        } font-semibold text-center`}
        onClick={onClick}
        type={type}
      >
        {children} {name}
      </button>
    );
}
