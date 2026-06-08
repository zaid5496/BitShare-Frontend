import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import {
  Download,
  FileText,
  Lock,
  ShieldCheck,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  getShareInfo,
  downloadSharedFile,
} from "../../services/shareService";

import {
  downloadBlob,
} from "../../utils/downloadBlob";

const PublicSharePage = () => {
  const { token } =
    useParams();

  const [share, setShare] =
    useState(null);

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    loadShare();
  }, []);

  const loadShare =
    async () => {
      try {
        const data =
          await getShareInfo(
            token
          );

        setShare(data);
      } catch {
        toast.error(
          "Link unavailable"
        );
      }
    };

  const handleDownload =
    async () => {
      try {
        setLoading(true);

        const blob =
          await downloadSharedFile(
            token,
            password
          );

        downloadBlob(
          blob,
          share.filename
        );

        toast.success(
          "Download started"
        );
      } catch {
        toast.error(
          "Download failed"
        );
      } finally {
        setLoading(false);
      }
    };

  if (!share) {
    return (
      <div
        className="
          min-h-screen

          bg-[#0f1117]

          flex
          items-center
          justify-center

          text-slate-400
        "
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      className="
        min-h-screen

        bg-[#0f1117]

        flex
        items-center
        justify-center

        p-6
      "
    >
      <div
        className="
          w-full
          max-w-2xl
        "
      >
        <div
          className="
            text-center
            mb-8
          "
        >
          <div
            className="
              flex
              justify-center
              items-center
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
              "
            >
              B
            </div>

            <h1
              className="
                logo-font

                text-5xl
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
              mt-3

              text-slate-400
            "
          >
            Secure File Delivery
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
          <div
            className="
              flex
              items-center
              gap-4

              mb-8
            "
          >
            <div
              className="
                w-16
                h-16

                rounded-2xl

                bg-violet-500/15

                flex
                items-center
                justify-center
              "
            >
              <FileText
                size={32}
                className="
                  text-violet-400
                "
              />
            </div>

            <div>
              <h2
                className="
                  text-2xl
                  font-bold

                  text-white
                "
              >
                {share.filename}
              </h2>

              <p
                className="
                  text-slate-400
                "
              >
                Ready to download
              </p>
            </div>
          </div>

          <div
            className="
              grid
              md:grid-cols-2

              gap-4

              mb-6
            "
          >
            <div
              className="
                bg-[#0f1117]

                border
                border-[#262a35]

                rounded-2xl

                p-4
              "
            >
              <p
                className="
                  text-sm
                  text-slate-500
                "
              >
                File Size
              </p>

              <h3
                className="
                  text-xl
                  font-bold
                  text-white
                "
              >
                {(
                  share.size /
                  1024
                ).toFixed(2)}
                KB
              </h3>
            </div>

            <div
              className="
                bg-[#0f1117]

                border
                border-[#262a35]

                rounded-2xl

                p-4
              "
            >
              <p
                className="
                  text-sm
                  text-slate-500
                "
              >
                Downloads
              </p>

              <h3
                className="
                  text-xl
                  font-bold
                  text-white
                "
              >
                {share.downloads}
              </h3>
            </div>
          </div>

          <div
            className="
              bg-[#0f1117]

              border
              border-[#262a35]

              rounded-2xl

              p-4

              mb-6
            "
          >
            <div
              className="
                flex
                items-center
                gap-2

                text-white
              "
            >
              <Lock size={18} />

              Password Protected
            </div>

            <input
              type="password"
              placeholder="Enter password if required"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="
                w-full

                mt-4

                px-4
                py-3

                rounded-xl

                bg-[#171923]

                border
                border-[#262a35]

                text-white

                outline-none

                focus:border-violet-500
              "
            />
          </div>

          <button
            onClick={
              handleDownload
            }
            disabled={loading}
            className="
              w-full

              bg-violet-600
              hover:bg-violet-700

              text-white

              py-4

              rounded-2xl

              font-semibold

              flex
              items-center
              justify-center
              gap-2

              transition
            "
          >
            <Download
              size={20}
            />

            {loading
              ? "Downloading..."
              : "Download File"}
          </button>

          <div
            className="
              flex
              items-center
              justify-center
              gap-2

              mt-6

              text-sm
              text-slate-500
            "
          >
            <ShieldCheck
              size={16}
            />

            Protected by BitShare
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicSharePage;