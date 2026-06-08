import { useState } from "react";

import toast from "react-hot-toast";

import {
  Calendar,
  Download,
  Lock,
  Copy,
  CheckCircle,
} from "lucide-react";

import {
  createShareLink,
} from "../../services/shareService";

const CreateShareForm = ({
  fileId,
  refresh,
}) => {
  const [expiresAt, setExpiresAt] =
    useState("");

  const [
    maxDownloads,
    setMaxDownloads,
  ] = useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [createdLink, setCreatedLink] =
    useState("");

  const handleCreate =
    async () => {
      try {
        setLoading(true);

        const payload = {
          file_id: fileId,

          expires_at:
            expiresAt || null,

          max_downloads:
            maxDownloads
              ? parseInt(
                  maxDownloads
                )
              : null,

          password:
            password || "",
        };

        const response =
          await createShareLink(
            payload
          );

        const shareUrl =
          `${window.location.origin}/share/${response.token}`;

        setCreatedLink(
          shareUrl
        );

        toast.success(
          "Share link created"
        );

        refresh?.();
      } catch (error) {
        console.error(error);

        toast.error(
          error.response?.data
            ?.detail ||
            "Failed to create link"
        );
      } finally {
        setLoading(false);
      }
    };

  const copyLink = () => {
    navigator.clipboard.writeText(
      createdLink
    );

    toast.success(
      "Link copied"
    );
  };

  return (
    <div
      className="
        mt-5

        bg-[#111827]

        border
        border-[#262a35]

        rounded-2xl

        p-5

        space-y-5
      "
    >
      <div>
        <h3
          className="
            text-lg
            font-semibold
            text-white
          "
        >
          Create Share Link
        </h3>

        <p
          className="
            text-sm
            text-slate-400
            mt-1
          "
        >
          Configure security and
          download settings.
        </p>
      </div>

      <div className="space-y-4">

        <div>
          <label
            className="
              flex
              items-center
              gap-2

              text-sm
              text-slate-400

              mb-2
            "
          >
            <Calendar size={16} />
            Expiry Date
          </label>

          <input
            type="datetime-local"
            value={expiresAt}
            onChange={(e) =>
              setExpiresAt(
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

              text-white

              outline-none

              focus:border-violet-500
            "
          />
        </div>

        <div>
          <label
            className="
              flex
              items-center
              gap-2

              text-sm
              text-slate-400

              mb-2
            "
          >
            <Download size={16} />
            Max Downloads
          </label>

          <input
            type="number"
            placeholder="Unlimited"
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

              text-white

              outline-none

              focus:border-violet-500
            "
          />
        </div>

        <div>
          <label
            className="
              flex
              items-center
              gap-2

              text-sm
              text-slate-400

              mb-2
            "
          >
            <Lock size={16} />
            Password
          </label>

          <input
            type="password"
            placeholder="Optional"
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

              text-white

              outline-none

              focus:border-violet-500
            "
          />
        </div>

      </div>

      <button
        onClick={
          handleCreate
        }
        disabled={loading}
        className="
          w-full

          bg-violet-600
          hover:bg-violet-700

          text-white

          py-3

          rounded-xl

          font-medium

          transition
        "
      >
        {loading
          ? "Creating..."
          : "Generate Share Link"}
      </button>

      {createdLink && (
        <div
          className="
            bg-[#171923]

            border
            border-green-500/30

            rounded-xl

            p-4
          "
        >
          <div
            className="
              flex
              items-center
              gap-2

              mb-3
            "
          >
            <CheckCircle
              size={18}
              className="
                text-green-400
              "
            />

            <span
              className="
                text-green-400
                font-medium
              "
            >
              Link Created
            </span>
          </div>

          <input
            value={
              createdLink
            }
            readOnly
            className="
              w-full

              bg-[#0f1117]

              border
              border-[#262a35]

              rounded-xl

              px-4
              py-3

              text-white
            "
          />

          <button
            onClick={copyLink}
            className="
              mt-3

              flex
              items-center
              gap-2

              bg-green-600
              hover:bg-green-700

              text-white

              px-4
              py-2

              rounded-xl

              transition
            "
          >
            <Copy size={16} />
            Copy Link
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateShareForm;