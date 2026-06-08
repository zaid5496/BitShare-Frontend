import { Link } from "react-router-dom";

const AuthLayout = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <div
      className="
        min-h-screen

        bg-[#0f1117]

        flex
        items-center
        justify-center

        px-6
      "
    >
      <div
        className="
          w-full
          max-w-md
        "
      >
        <div className="mb-8 text-center">

          <div
            className="
              flex
              items-center
              justify-center
              gap-3
            "
          >
            <div
              className="
                w-12
                h-12

                rounded-xl

                bg-violet-600

                flex
                items-center
                justify-center

                text-white
                font-bold
                text-lg
              "
            >
              B
            </div>

            <Link
              to="/"
              className="
                logo-font

                text-5xl
                font-bold

                tracking-tight
              "
            >
              <span
                className="
                  text-white
                "
              >
                Bit
              </span>

              <span
                className="
                  text-violet-500
                "
              >
                Share
              </span>
            </Link>
          </div>

          <h1
            className="
              mt-8

              text-3xl
              font-bold

              text-white
            "
          >
            {title}
          </h1>

          <p
            className="
              mt-2

              text-slate-400
            "
          >
            {subtitle}
          </p>
        </div>

        <div
          className="
            bg-[#171923]

            border
            border-[#262a35]

            rounded-3xl

            p-8
          "
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;