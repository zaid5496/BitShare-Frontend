import {
  useEffect,
  useState,
} from "react";

import {
  getFiles,
} from "../../services/fileService";

const RecentFiles = () => {
  const [files, setFiles] =
    useState([]);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles =
    async () => {
      try {
        const data =
          await getFiles();

        setFiles(
          data.slice(0, 5)
        );
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div
      className="
        bg-white
        rounded-xl
        p-6
        mt-8
      "
    >
      <h2
        className="
          text-xl
          font-bold
          mb-4
        "
      >
        Recent Files
      </h2>

      {files.length === 0 ? (
        <p>No files</p>
      ) : (
        files.map((file) => (
          <div
            key={file.id}
            className="
              py-2
              border-b
            "
          >
            {
              file.original_name
            }
          </div>
        ))
      )}
    </div>
  );
};

export default RecentFiles;