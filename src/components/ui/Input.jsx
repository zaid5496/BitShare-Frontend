const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="
        w-full

        rounded-xl

        border
        border-[#262a35]

        bg-[#0f1117]

        px-4
        py-4

        text-white

        outline-none

        transition-all

        placeholder:text-slate-500

        focus:border-violet-500

        focus:ring-4
        focus:ring-violet-500/20
      "
    />
  );
};

export default Input;