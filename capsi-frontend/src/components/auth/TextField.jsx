export default function TextField({
  type,
  name,
  value,
  onChange,
  placeholder = "",
  customStyles = "",
  ...props
}) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border bg-tertiary px-5 py-2 rounded-l-full rounded-r-full outline-none ${customStyles}`}
      {...props}
    />
  );
}
