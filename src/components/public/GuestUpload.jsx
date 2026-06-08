import { useState } from "react";
import toast from "react-hot-toast";

import {
  Upload,
  Copy,
  CheckCircle,
  Lock,
  Calendar,
  Download,
} from "lucide-react";

import { guestUpload } from "../../services/guestService";

const GuestUpload = () => {
  const [file, setFile] =
    useState(null);

  const [expiresInDays, setExpiresInDays] =
    useState(7);

  const [maxDownloads, setMaxDownloads] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [uploading, setUploading] =
    useState(false);

  const [shareLink, setShareLink] =
    useState("");

  const handleUpload =
    async () => {
      if (!file) {
        toast.error(
          "Please select a file"
        );
        return;
      }

      try {
        setUploading(true);

        const formData =
          new FormData();

        formData.append(
          "file",
          file
        );

        formData.append(
          "expires_in_days",
          expiresInDays
        );

        if (maxDownloads) {
          formData.append(
            "max_downloads",
            maxDownloads
          );
        }

        if (password) {
          formData.append(
            "password",
            password
          );
        }

        const response =
          await guestUpload(
            formData
          );

        const generatedLink =
          `${window.location.origin}/share/${response.token}`;

        setShareLink(
          generatedLink
        );

        toast.success(
          "Share link generated!"
        );
      } catch (error) {
        console.error(error);

        toast.error(
          error.response?.data
            ?.detail ||
            "Upload failed"
        );
      } finally {
        setUploading(false);
      }
    };

  const copyLink = () => {
    navigator.clipboard.writeText(
      shareLink
    );

    toast.success(
      "Link copied!"
    );
  };

  return (
    <div className="space-y-6">

      <div
        className="
          border-2
          border-dashed

          border-[#262a35]

          bg-[#171923]

          rounded-3xl

          p-10

          text-center

          transition-all

          hover:border-violet-500/40
        "
      >
        <Upload
          size={48}
          className="
            mx-auto

            text-violet-500

            mb-4
          "
        />

        <h3
          className="
            text-xl
            font-semibold

            text-slate-400
          "
        >
          Upload File
        </h3>

        <p
          className="
            text-slate-400
            mt-2
          "
        >
          PDF, DOCX, ZIP,
          Images, PPTX and more.
        </p>

        <input
          type="file"
          onChange={(e) =>
            setFile(
              e.target.files[0]
            )
          }
          className="
            mt-6

            block
            mx-auto

            text-slate-400
          "
        />

        {file && (
          <div
            className="
              mt-5

              bg-[#0f1117]

              border
              border-[#262a35]

              rounded-xl

              p-3

              inline-flex
              items-center
              gap-2

              text-slate-400
            "
          >
            📄 {file.name}
          </div>
        )}
      </div>

      <div
        className="
          grid
          md:grid-cols-3
          gap-4
        "
      >
        <div>
          <label
            className="
              text-sm

              text-slate-400

              flex
              items-center
              gap-2
              mb-2
            "
          >
            <Calendar size={16} />
            Expiry Days
          </label>

          <input
            type="number"
            value={expiresInDays}
            onChange={(e) =>
              setExpiresInDays(
                e.target.value
              )
            }
            className="
              w-full

              bg-[#171923]

              border
              border-[#262a35]

              rounded-xl

              px-4
              py-3

              text-slate-400

              outline-none

              focus:border-violet-500
            "
          />
        </div>

        <div>
          <label
            className="
              text-sm

              text-slate-400

              flex
              items-center
              gap-2
              mb-2
            "
          >
            <Download size={16} />
            Max Downloads
          </label>

          <input
            type="number"
            value={maxDownloads}
            onChange={(e) =>
              setMaxDownloads(
                e.target.value
              )
            }
            className="
              w-full

              bg-[#171923]

              border
              border-[#262a35]

              rounded-xl

              px-4
              py-3

              text-slate-400

              outline-none

              focus:border-violet-500
            "
          />
        </div>

        <div>
          <label
            className="
              text-sm

              text-slate-400

              flex
              items-center
              gap-2
              mb-2
            "
          >
            <Lock size={16} />
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="
              w-full

              bg-[#171923]

              border
              border-[#262a35]

              rounded-xl

              px-4
              py-3

              text-slate-400

              outline-none

              focus:border-violet-500
            "
          />
        </div>
      </div>

      <button
        onClick={
          handleUpload
        }
        disabled={uploading}
        className="
          w-full

          bg-violet-600
          hover:bg-violet-700

          text-slate-400

          py-4

          rounded-2xl

          font-semibold

          transition
        "
      >
        {uploading
          ? "Generating Link..."
          : "Generate Share Link"}
      </button>

      {shareLink && (
        <div
          className="
            bg-[#171923]

            border
            border-green-500/30

            rounded-3xl

            p-6
          "
        >
          <div
            className="
              flex
              items-center
              gap-2

              mb-4
            "
          >
            <CheckCircle
              className="
                text-green-400
              "
            />

            <h3
              className="
                font-semibold

                text-green-400
              "
            >
              Share Link Generated
            </h3>
          </div>

          <input
            value={shareLink}
            readOnly
            className="
              w-full

              bg-[#0f1117]

              border
              border-[#262a35]

              rounded-xl

              px-4
              py-3

              text-slate-400
            "
          />

          <button
            onClick={copyLink}
            className="
              mt-4

              flex
              items-center
              gap-2

              bg-green-600
              hover:bg-green-700

              text-slate-400

              px-5
              py-3

              rounded-xl

              transition
            "
          >
            <Copy size={18} />
            Copy Link
          </button>
        </div>
      )}
    </div>
  );
};

export default GuestUpload;