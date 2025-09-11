export interface ResumeResult {
  resume_name: string;
  category: string;
  score: number;
  matched_skills: string[];
  missing_skills: string[];
  Tfidf_Similarity: number;
  Jaccard_Similarity: number;
  Length_Ratio: number;
}

export interface RankingResponse {
  results: ResumeResult[];
}
