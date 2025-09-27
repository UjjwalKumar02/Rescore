"use client";


import Link from "next/link";
import { useState } from "react";
import Image from 'next/image';
import img from "../public/app_screenshot.jpeg"
import { RiOpenSourceLine } from "react-icons/ri";

export default function Home() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-2 text-center">
      <div className="w-full fixed top-0 flex justify-between px-12 py-5 items-center">
        <p className="text-2xl font-medium font-sans">Rescore</p>
        <div>
          <a href="https://github.com/UjjwalKumar02/Resume-score" className="bg-[#4d1cff] text-white px-6 py-1.5 rounded-lg text-sm">Github</a>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-5 px-2 text-center mt-27 mb-8">
        <div className="border border-gray-500 py-1.5 px-5 rounded-full text-sm flex items-center gap-1 ">
          <RiOpenSourceLine size={20} color="blue" />
          Open source
        </div>
        <div className="space-y-3">
          <p className="text-4xl leading-[1.4] font-medium ">
            Real-Time Resume
            <br />
            Evaluation based on Job Descriptions
          </p>
          <p>
            Predicts candidate fit score and ranking
          </p>
        </div>
        <Link href={"/score-prediction"} onClick={handleClick} className="border border-gray-300 bg-[#4d1cff] text-white px-8 py-1.5 rounded-lg hover:bg-[#3414b4]">
          {loading ? "Loading..." : "Get Started >"}
        </Link>
      </div>

      <div className="border-t-9 border-x-9 rounded-t-3xl p-2">
        <Image src={img} alt="image" height={100} width={960} className="rounded-3xl" />
      </div>
    </div>
  );
}
