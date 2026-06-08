import api from "../api/axios";

export const getFiles = async () => {
  const response = await api.get("/files/");
  return response.data;
};

export const uploadFile = async (
  file,
  onUploadProgress
) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(
    "/files/upload/",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
      onUploadProgress,
    }
  );

  return response.data;
};

export const deleteFile = async (
  fileId
) => {
  const response = await api.delete(
    `/files/${fileId}/delete/`
  );

  return response.data;
};

