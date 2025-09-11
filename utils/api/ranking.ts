import apiClient from "./apiClient";
import type { RankingResponse } from "@/types/ranking";



export async function fetchRankResumes(
  resumes: File[],
  jdFile?: File,
  jdTextInput?: string
): Promise<RankingResponse> {
  const formData = new FormData();

  resumes.forEach((file) => formData.append("resumes", file));
  if (jdFile) formData.append("jd_file", jdFile);
  if (jdTextInput) formData.append("jd_text_input", jdTextInput);

  const res = await apiClient.post("/rank-resumes", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return res.data;
};