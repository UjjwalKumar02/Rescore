"use client";

import Nav from "@/components/Nav";
import { fetchScorePrediction } from "@/utils/api/score";
import { useRef, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

export interface ScorePredictionResponse {
  data: {
    category: string;
    score: number;
    resume_skills: string[];
    jd_skills: string[];
    matched_skills: string[];
    missing_skills: string[];
    Tfidf_Similarity: number;
    Jaccard_Similarity: number;
    Length_Ratio: number;
  };
}



export default function Page() {
  const [resume, setResume] = useState<File | null>(null);
  const [jdInputText, setJdInputText] = useState("");
  const [jdFile, setJdFile] = useState<File | null>(null);


  const [responseData, setResponseData] = useState<ScorePredictionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState(false);
  const [jdText, setJdText] = useState(false);

  const logRef = useRef<HTMLDivElement | null>(null);

  const onClickLogs = () => {
    setLogs(!logs);
    setTimeout(() => {
      logRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  }
  const onClickJdText = () => {
    setJdText(!jdText);
  }


  const handleSubmit = async () => {
    if (!resume || (!jdFile && !jdInputText.trim())) {
      alert("All fields are required!");
      return;
    }
    try {
      setLoading(true);
      const data = await fetchScorePrediction(resume, jdFile || undefined, jdInputText);
      setResponseData(data);
      console.log("Api response: ", data);
    } catch (error) {
      console.log("Error calling api: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen ">
      <Nav />
      <div className="flex flex-col items-center justify-center gap-8  mx-auto lg:w-[44%] w-[85%] mt-30">

        <div className="flex flex-col gap-5 w-full border border-gray-200 px-10 py-10 shadow justify-center">
          <div className="flex flex-wrap justify-between gap-1">
            <label htmlFor="resume">Resume</label>
            <input
              id="resume"
              type="file"
              accept=".pdf, .doc, .docx"
              onChange={(e) => setResume(e.target.files?.[0] || null)}
              className="border border-gray-300 rounded lg:w-70 w-55 p-1 text-sm bg-gray-100"
            />
          </div>

          {jdText ? (
            <div className="flex flex-wrap justify-between gap-1">
              <label htmlFor="jd" >Job description</label>
              <textarea
                id="jd"
                rows={2}
                value={jdInputText}
                onChange={(e) => setJdInputText(e.target.value)}
                placeholder="Enter Job description..."
                className="border border-gray-300 lg:w-70 w-55 rounded p-1 text-sm bg-gray-100 placeholder:text-black"
              />
            </div>
          ) : (
            <div className="flex flex-wrap justify-between gap-1">
              <label htmlFor="jd" >Job description</label>
              <input
                id="jd"
                type="file"
                accept=".pdf, .doc, .docx"
                onChange={(e) => setJdFile(e.target.files?.[0] || null)}
                className="border border-gray-300 lg:w-70 w-55 rounded p-1 text-sm bg-gray-100"
              />
            </div>
          )}


          <button
            onClick={handleSubmit}
            className="mt-3 w-fit bg-black text-white rounded px-9 py-1.5 text-sm"
          >
            {loading ? "Loading..." : "Match"}
          </button>
        </div>
        <button
          onClick={onClickJdText}
          className="hover:text-gray-500 text-sm"
        >
          Enter Job description in {jdText ? "File" : "Text"} format &gt;
        </button>



        {responseData && (
          <>
            <div className="border border-gray-200 w-full px-7 py-5 shadow">
              <div className="flex gap-4 justify-between items-center flex-wrap">
                <p className="">Result :</p>
                <div className="flex justify-between text-sm gap-2 flex-wrap">
                  <p className="bg-[#0969da] text-white px-6 py-1 rounded">{responseData.data.category}</p>
                  <p className="bg-[#0969da] text-white px-6 py-1 rounded">Score: {responseData.data.score}</p>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 w-full  transition-all duration-300">
              <button onClick={onClickLogs} className="flex justify-between px-7 py-3 shadow w-full">
                <p>Reasoning</p>
                <span
                  className="text-sm"
                >
                  {logs ? <FaChevronUp size={18} /> : <FaChevronDown size={18} />}
                </span>
              </button>
              {logs ? (
                <div ref={logRef} className="p-9 rounded border-t border-gray-300 space-y-9 text-gray-800">
                  <div className="flex flex-col gap-2">
                    <span>Resume skills: </span>
                    <span className="bg-gray-50 text-sm p-2 rounded border border-gray-200">
                      {responseData.data.resume_skills.join(", ")}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span>JD skills: </span>
                    <span className="bg-gray-50 text-sm p-2 rounded border border-gray-200">
                      {responseData.data.jd_skills.join(", ")}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="">Matched skills:</span>
                    <span className="bg-gray-50 p-2 rounded text-sm border border-gray-200">
                      {responseData.data.matched_skills?.length > 0
                        ? responseData.data.matched_skills.join(", ")
                        : "None"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="">Missing skills:</span>
                    <span className="bg-gray-50 p-2 text-sm rounded border border-gray-200">
                      {responseData.data.missing_skills?.length > 0
                        ? responseData.data.missing_skills.join(", ")
                        : "None"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span>Tfidf similarity: </span>
                    <span className="bg-gray-50 text-sm p-2 rounded border border-gray-200">
                      {responseData.data.Tfidf_Similarity}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="">Jaccard similarity: </span>
                    <span className="bg-gray-50 text-sm p-2 rounded border border-gray-200">
                      {responseData.data.Jaccard_Similarity}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="">Length ratio: </span>
                    <span className="bg-gray-50 text-sm p-2 rounded border border-gray-200">
                      {responseData.data.Length_Ratio}
                    </span>
                  </div>
                </div>
              ) : (<></>)}
            </div>
          </>
        )}


        {/* <p className="text-blue-600">Tell us your Feedback!</p> */}


      </div>
    </div>
  );
};