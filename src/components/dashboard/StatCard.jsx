const StatCard = ({
  title,
  value,
}) => {
  return (
    <div
      className="
        bg-[#171923]

        border
        border-[#262a35]

        rounded-2xl

        p-6
      "
    >
      <p
        className="
          text-sm
          text-slate-400
        "
      >
        {title}
      </p>

      <h3
        className="
          text-3xl
          font-bold
          text-white
          mt-2
        "
      >
        {value}
      </h3>
    </div>
  );
};

export default StatCard;