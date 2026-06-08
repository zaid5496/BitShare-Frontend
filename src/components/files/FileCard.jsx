import {
  FileText,
  Download,
  Trash2,
  Share2,
} from "lucide-react";

import {
  downloadFile,
} from "../../utils/fileDownload";

import {
  deleteFile,
} from "../../services/fileService";

import { useState } from "react";


import CreateShareForm from "../shares/CreateShareForm";


const FileCard = ({
  file,
  refresh,
}) => {

  const [showShare, setShowShare] =
  useState(false);
  const handleDelete =
    async () => {
      try {
        await deleteFile(
          file.id
        );

        refresh();
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div
      className="
        bg-[#171923]

        border
        border-[#262a35]

        rounded-2xl

        p-5

        flex
        items-center
        justify-between

        hover:border-violet-500/50

        transition-all
      "
    >
      <div
        className="
          flex
          items-center
          gap-4
        "
      >
        <div
          className="
            w-12
            h-12

            rounded-xl

            bg-violet-500/15

            flex
            items-center
            justify-center
          "
        >
          <FileText
            size={22}
            className="
              text-violet-400
            "
          />
        </div>

        <div>
          <h3
            className="
              text-white
              font-semibold
            "
          >
            {file.original_name}
          </h3>

          <p
            className="
              text-sm
              text-slate-400
            "
          >
            {(
              file.file_size /
              1024
            ).toFixed(2)}
            KB
          </p>
        </div>
      </div>

      <div
        className="
          flex
          items-center
          gap-3
        "
      >
        <button
          onClick={() =>
            downloadFile(
              file.id,
              file.original_name
            )
          }
          className="
            flex
            items-center
            gap-2

            px-4
            py-2

            rounded-xl

            bg-violet-600
            hover:bg-violet-700

            text-white

            transition
          "
        >
          <Download
            size={16}
          />

          Download
        </button>

        <button
          onClick={() =>
            setShowShare(
              !showShare
            )
          }
          className="
            flex
            items-center
            gap-2

            px-4
            py-2

            rounded-xl

            bg-violet-600
            hover:bg-violet-700

            text-white

            transition
          "
        >
          <Share2 size={16} />

          Share
        </button>

        <button
          onClick={
            handleDelete
          }
          className="
            flex
            items-center
            gap-2

            px-4
            py-2

            rounded-xl

            border
            border-red-500/30

            text-red-400

            hover:bg-red-500/10

            transition
          "
        >
          <Trash2
            size={16}
          />

          Delete
        </button>
      </div>

      {showShare && (
        <CreateShareForm
          fileId={file.id}
          refresh={refresh}
        />
      )}
    </div>
  );
};

export default FileCard;