import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";
import PageContainer from "../../components/layout/PageContainer";

import FileUpload from "../../components/files/FileUpload";
import FileCard from "../../components/files/FileCard";

import { getFiles } from "../../services/fileService";

const MyFilesPage = () => {
  const [files, setFiles] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles =
    async () => {
      try {
        const data =
          await getFiles();

        setFiles(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  const filteredFiles =
    files.filter((file) =>
      file.original_name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <DashboardLayout>
      <PageContainer>

        <div className="mb-10">
          <h1
            className="
              text-4xl
              font-bold
              text-white
            "
          >
            Files
          </h1>

          <p
            className="
              mt-3
              text-slate-400
            "
          >
            Upload, manage and share
            your files.
          </p>
        </div>

        <div
          className="
            mb-8

            bg-[#171923]

            border
            border-[#262a35]

            rounded-2xl

            p-4
          "
        >
          <input
            type="text"
            placeholder="Search files..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="
              w-full

              bg-transparent

              outline-none

              text-white

              placeholder:text-slate-500
            "
          />
        </div>

        <FileUpload
          onSuccess={
            fetchFiles
          }
        />

        <div className="mt-10">
          <h2
            className="
              text-xl
              font-semibold
              text-white
              mb-5
            "
          >
            Your Files
          </h2>

          {loading ? (
            <div
              className="
                text-slate-400
              "
            >
              Loading files...
            </div>
          ) : filteredFiles.length === 0 ? (
            <div
              className="
                bg-[#171923]

                border
                border-[#262a35]

                rounded-2xl

                p-16

                text-center
              "
            >
              <div className="text-5xl">
                📁
              </div>

              <h3
                className="
                  mt-4

                  text-xl

                  text-white

                  font-semibold
                "
              >
                No files found
              </h3>

              <p
                className="
                  mt-2

                  text-slate-400
                "
              >
                Upload a file to
                get started.
              </p>
            </div>
          ) : (
            <div
              className="
                space-y-3
              "
            >
              {filteredFiles.map(
                (file) => (
                  <FileCard
                    key={file.id}
                    file={file}
                    refresh={
                      fetchFiles
                    }
                  />
                )
              )}
            </div>
          )}
        </div>

      </PageContainer>
    </DashboardLayout>
  );
};

export default MyFilesPage;