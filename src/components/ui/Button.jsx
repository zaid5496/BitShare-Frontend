const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="
        w-full

        rounded-xl

        bg-violet-600
        hover:bg-violet-700

        py-4

        font-semibold

        text-white

        transition

        disabled:opacity-50
        disabled:cursor-not-allowed
      "
    >
      {children}
    </button>
  );
};

export default Button;