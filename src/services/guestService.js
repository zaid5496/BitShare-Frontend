import api from "../api/axios";

export const guestUpload = async (
  formData,
  onUploadProgress
) => {
  const response = await api.post(
    "/files/guest/upload/",
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