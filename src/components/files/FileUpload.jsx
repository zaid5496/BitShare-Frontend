import { useState } from "react";

import { useDropzone } from "react-dropzone";

import {
  UploadCloud,
  FileText,
} from "lucide-react";

import Button from "../ui/Button";

import { uploadFile } from "../../services/fileService";

const FileUpload = ({
  onSuccess,
}) => {
  const [file, setFile] =
    useState(null);

  const [uploading, setUploading] =
    useState(false);

  const [progress, setProgress] =
    useState(0);

  const onDrop = (
    acceptedFiles
  ) => {
    if (
      acceptedFiles.length > 0
    ) {
      setFile(
        acceptedFiles[0]
      );
    }
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    multiple: false,
  });

  const handleUpload =
    async () => {
      if (!file) return;

      try {
        setUploading(true);

        await uploadFile(
          file,
          (event) => {
            const percent =
              Math.round(
                (event.loaded *
                  100) /
                  event.total
              );

            setProgress(
              percent
            );
          }
        );

        setFile(null);
        setProgress(0);

        onSuccess();
      } catch (error) {
        console.error(
          error
        );
      } finally {
        setUploading(false);
      }
    };

  return (
    <div>
      <div
        {...getRootProps()}
        className={`
          border-2
          border-dashed

          rounded-3xl

          p-12

          text-center

          cursor-pointer

          transition-all

          ${
            isDragActive
              ? "border-violet-500 bg-violet-500/10"
              : "border-[#262a35] bg-[#171923]"
          }
        `}
      >
        <input {...getInputProps()} />

        <UploadCloud
          size={52}
          className="
            mx-auto
            text-violet-500
            mb-4
          "
        />

        <h3
          className="
            text-xl
            font-bold
            text-white
          "
        >
          Drag & Drop Files
        </h3>

        <p
          className="
            text-slate-400
            mt-2
          "
        >
          or click to browse
        </p>
      </div>

      {file && (
        <div
          className="
            mt-4

            bg-[#171923]

            border
            border-[#262a35]

            rounded-2xl

            p-4

            flex
            items-center
            gap-3
          "
        >
          <FileText
            className="
              text-violet-500
            "
          />

          <div>
            <p
              className="
                font-medium
                text-white
              "
            >
              {file.name}
            </p>

            <p
              className="
                text-sm
                text-slate-400
              "
            >
              {(file.size / 1024).toFixed(2)}
              KB
            </p>
          </div>
        </div>
      )}

      {progress > 0 && (
        <div className="mt-4">
          <div
            className="
              h-2
              bg-[#262a35]
              rounded-full
            "
          >
            <div
              className="
                h-2
                bg-violet-500
                rounded-full
              "
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>
      )}

      <div className="mt-6 max-w-xs">
        <Button
          onClick={handleUpload}
          disabled={!file || uploading}
        >
          {uploading
            ? "Uploading..."
            : "Upload File"}
        </Button>
      </div>
    </div>
  );
};

export default FileUpload;