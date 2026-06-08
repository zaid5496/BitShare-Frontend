import GuestUpload from "../../components/public/GuestUpload";

const LandingPage = () => {
  return (
    <div
      className="
        min-h-screen

        bg-[#0f1117]
      "
    >
      <div
        className="
          max-w-6xl
          mx-auto

          px-6
          py-20
        "
      >
        {/* Hero */}

        <div
          className="
            text-center
            mb-16
          "
        >
          <div
            className="
              flex
              justify-center
              items-center
              gap-3
              mb-6
            "
          >
            <div
              className="
                w-14
                h-14

                rounded-xl

                bg-violet-600

                flex
                items-center
                justify-center

                text-white
                font-bold
                text-xl
              "
            >
              B
            </div>

            <h1
              className="
                logo-font

                text-6xl
                font-bold
              "
            >
              <span className="text-white">
                Bit
              </span>

              <span className="text-violet-500">
                Share
              </span>
            </h1>
          </div>

          <p
            className="
              text-xl

              text-slate-400

              mt-6

              max-w-2xl
              mx-auto
            "
          >
            Share files securely in
            seconds with password
            protection, download
            limits and expiration
            controls.
          </p>
        </div>

        {/* Upload Area */}

        <div
          className="
            max-w-3xl
            mx-auto

            bg-[#171923]

            border
            border-[#262a35]

            rounded-3xl

            p-8
          "
        >
          <GuestUpload />
        </div>

        {/* Features */}

        <div
          className="
            grid
            md:grid-cols-3

            gap-6

            mt-12
          "
        >
          <div
            className="
              bg-[#171923]

              border
              border-[#262a35]

              rounded-2xl

              p-6
            "
          >
            <h3
              className="
                font-bold
                text-white
              "
            >
              Password Protection
            </h3>

            <p
              className="
                mt-2
                text-slate-400
              "
            >
              Secure links with
              passwords.
            </p>
          </div>

          <div
            className="
              bg-[#171923]

              border
              border-[#262a35]

              rounded-2xl

              p-6
            "
          >
            <h3
              className="
                font-bold
                text-white
              "
            >
              Download Limits
            </h3>

            <p
              className="
                mt-2
                text-slate-400
              "
            >
              Control how many times
              files can be downloaded.
            </p>
          </div>

          <div
            className="
              bg-[#171923]

              border
              border-[#262a35]

              rounded-2xl

              p-6
            "
          >
            <h3
              className="
                font-bold
                text-white
              "
            >
              Expiring Links
            </h3>

            <p
              className="
                mt-2
                text-slate-400
              "
            >
              Automatically disable
              access after expiry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;