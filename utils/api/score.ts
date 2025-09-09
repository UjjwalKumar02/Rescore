import apiClient from "./apiClient";

export const fetchScorePrediction = async (
  resumeFile: File,
  jdFile?: File,
  jdTextInput?: string
) => {
  const formData = new FormData();
  formData.append("resume", resumeFile);
  if (jdFile) formData.append("jd_file", jdFile);
  if (jdTextInput) formData.append("jd_text_input", jdTextInput);

  const response = await apiClient.post("/score-prediction", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return response.data;
};