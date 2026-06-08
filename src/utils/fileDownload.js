import api from "../api/axios";

export const downloadFile = async (
  fileId,
  filename
) => {
  try {
    const response = await api.get(
      `/files/${fileId}/download/`,
      {
        responseType: "blob",
      }
    );

    const url =
      window.URL.createObjectURL(
        new Blob([response.data])
      );

    const link =
      document.createElement("a");

    link.href = url;

    link.setAttribute(
      "download",
      filename
    );

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(
      url
    );
  } catch (error) {
    console.error(error);
    alert("Download failed");
  }
};