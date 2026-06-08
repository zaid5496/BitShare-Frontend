import {
  Copy,
  ExternalLink,
  Ban,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  revokeShareLink,
} from "../../services/shareService";

const ShareCard = ({
  share,
  refresh,
}) => {
  const shareUrl =
    `${window.location.origin}/share/${share.token}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(
      shareUrl
    );

    toast.success(
      "Link copied"
    );
  };

  const openLink = () => {
    window.open(
      shareUrl,
      "_blank"
    );
  };

  const revoke = async () => {
    try {
      await revokeShareLink(
        share.token
      );

      toast.success(
        "Link revoked"
      );

      refresh();
    } catch (error) {
      toast.error(
        "Failed to revoke"
      );
    }
  };

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
      <div
        className="
          flex
          justify-between
          items-start
        "
      >
        <div>
          <h3
            className="
              text-white
              font-semibold
              text-lg
            "
          >
            {share.file_name}
          </h3>

          <p
            className="
              text-slate-500
              text-sm
              mt-1
            "
          >
            {share.token.slice(
              0,
              8
            )}
            ...
          </p>
        </div>

        <span
          className={`
            px-3
            py-1

            rounded-full

            text-xs
            font-medium

            ${
              share.is_active
                ? "bg-green-500/15 text-green-400"
                : "bg-red-500/15 text-red-400"
            }
          `}
        >
          {share.is_active
            ? "Active"
            : "Revoked"}
        </span>
      </div>

      <div
        className="
          mt-6

          flex
          items-center
          justify-between
        "
      >
        <div>
          <p
            className="
              text-slate-500
              text-sm
            "
          >
            Downloads
          </p>

          <p
            className="
              text-white
              font-bold
              text-xl
            "
          >
            {
              share.current_downloads
            }
            /
            {share.max_downloads}
          </p>
        </div>
      </div>

      <div
        className="
          flex
          gap-3
          mt-6
        "
      >
        <button
          onClick={copyLink}
          className="
            flex
            items-center
            gap-2

            bg-violet-600
            hover:bg-violet-700

            text-white

            px-4
            py-2

            rounded-xl
          "
        >
          <Copy size={16} />
          Copy
        </button>

        <button
          onClick={openLink}
          className="
            flex
            items-center
            gap-2

            bg-white/5
            hover:bg-white/10

            text-white

            px-4
            py-2

            rounded-xl
          "
        >
          <ExternalLink
            size={16}
          />
          Open
        </button>

        <button
          onClick={revoke}
          className="
            flex
            items-center
            gap-2

            border
            border-red-500/20

            text-red-400

            px-4
            py-2

            rounded-xl

            hover:bg-red-500/10
          "
        >
          <Ban size={16} />
          Revoke
        </button>
      </div>
    </div>
  );
};

export default ShareCard;