"use client";

import Nav from "@/components/Nav";
import { fetchRankResumes } from "@/utils/api/ranking";
import { useRef, useState } from "react";
import type { RankingResponse } from "@/types/ranking";


export default function Page() {
  const [resumes, setResumes] = useState<File[]>([]);
  const [jdInputText, setJdInputText] = useState("");
  const [jdFile, setJdFile] = useState<File | null>(null);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const [responseData, setResponseData] = useState<RankingResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [jdText, setJdText] = useState(false);

  const rankingRef = useRef<HTMLDivElement | null>(null);


  const handleSubmit = async () => {
    if (resumes.length === 0 || (!jdFile && !jdInputText.trim())) {
      alert("Add at least one resume and a job description!");
      return;
    }
    try {
      setLoading(true);
      const data = await fetchRankResumes(resumes, jdFile || undefined, jdInputText);
      setResponseData(data);

      // Scroll into view
      setTimeout(() => {
        rankingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);

      console.log("API response: ", data);
    } catch (error) {
      console.error("Error calling API: ", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleRow = (index: number) => {
    setExpandedRow((prev) => (prev === index ? null : index));
  };


  return (
    <div className="h-screen">
      <Nav />
      <div className="flex flex-col items-center justify-center gap-8 mx-auto lg:w-[44%] w-[85%] mt-30">

        {/* Input Box */}
        <div className="flex flex-col gap-5 w-full border border-gray-300 px-10 py-8 shadow-xl rounded-lg">
          {/* Multiple resumes */}
          <div className="flex flex-wrap justify-between gap-1">
            <label htmlFor="resume">Resumes</label>
            <input
              id="resume"
              type="file"
              multiple
              accept=".pdf, .doc, .docx"
              onChange={(e) => setResumes(Array.from(e.target.files || []))}
              className="border border-gray-300 rounded-lg lg:w-70 w-55 p-1 text-sm bg-blue-50"
            />
          </div>

          {/* JD input toggle */}
          {jdText ? (
            <div className="flex flex-wrap justify-between gap-1">
              <label htmlFor="jd">Job description</label>
              <textarea
                id="jd"
                rows={2}
                value={jdInputText}
                onChange={(e) => setJdInputText(e.target.value)}
                placeholder="Enter Job description..."
                className="border border-gray-300 lg:w-70 w-55 rounded-lg p-1 text-sm bg-blue-50 placeholder:text-black"
              />
            </div>
          ) : (
            <div className="flex flex-wrap justify-between gap-1">
              <label htmlFor="jd">Job description</label>
              <input
                id="jd"
                type="file"
                accept=".pdf, .doc, .docx"
                onChange={(e) => setJdFile(e.target.files?.[0] || null)}
                className="border border-gray-300 lg:w-70 w-55 rounded-lg p-1 text-sm bg-blue-50"
              />
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="mt-2 w-fit bg-black text-white px-10 py-1 text-sm rounded-lg font-medium cursor-pointer hover:bg-gray-800"
          >
            {loading ? "Processing..." : "Get Rankings"}
          </button>
        </div>

        {/* Toggle JD input type */}
        <button
          onClick={() => setJdText(!jdText)}
          className="hover:text-gray-600 text-gray-900"
        >
          Enter Job description in {jdText ? "File" : "Text"} format -&gt;
        </button>

        {/* Results */}
        {responseData && (
          <div ref={rankingRef} className="w-full">
            {/* Header */}
            <div className="flex justify-between border border-gray-300 px-9 py-7 text-lg rounded-t-lg shadow-xs">
              <p>Ranking</p>
              <p>Score</p>
            </div>

            {/* Resume Rows */}
            {responseData?.results.map((res, index) => {
              const isExpanded = expandedRow === index;
              return (
                <div key={index} className="border border-gray-300">
                  {/* Row header */}
                  <div
                    onClick={() => toggleRow(index)}
                    className="flex justify-between lg:items-center lg:px-11 px-9 py-5 cursor-pointer hover:bg-blue-50 lg:flex-row flex-col gap-3"
                  >
                    <div className="flex gap-4 items-center">
                      <p className="font-medium">
                        {index + 1}.
                      </p>
                      <p className="lg:text-sm text-xs max-w-70">
                        {res.resume_name}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-sm font-medium">
                      <span className="px-4 py-1 border border-[#0969da] text-[#0969da] rounded-lg">
                        {res.category.charAt(0).toUpperCase() + res.category.slice(1)}
                      </span>
                      <span className="px-3 py-1 border border-red-600 text-red-600 rounded-lg">
                        {res.score}
                      </span>
                    </div>
                  </div>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="px-12 py-5 space-y-5 text-sm border-t border-gray-300 bg-gray-50">
                      <div className="space-y-1">
                        <p className="font-medium">
                          Matched Skills:
                        </p>
                        <p className="bg-blue-50 p-2 rounded border border-gray-300">
                          {res.matched_skills?.length > 0
                            ? res.matched_skills.join(", ")
                            : "None"}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">
                          Missing Skills:
                        </p>
                        <p className="bg-blue-50 p-2 rounded border border-gray-300">
                          {res.missing_skills?.length > 0
                            ? res.missing_skills.join(", ")
                            : "None"}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">
                          Semantic similarity:
                        </p>
                        <p className="bg-blue-50 p-2 rounded border border-gray-300">
                          {res.Tfidf_Similarity * 100}%
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">
                          Exact word match:
                        </p>
                        <p className="bg-blue-50 p-2 rounded border border-gray-300">
                          {res.Jaccard_Similarity * 100}%
                        </p>
                      </div>
                      {/* <div className="space-y-1">
                        <p className="font-medium">Length ratio:</p>
                        <p className="bg-gray-200 p-2 rounded border border-gray-300">{res.Length_Ratio}</p>
                      </div> */}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
