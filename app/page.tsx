"use client";

import Link from "next/link";
import { useState } from "react";
import Image from 'next/image';
import img from "../public/app_screenshot3.png"
import { RiOpenSourceLine } from "react-icons/ri";


export default function Home() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
  }

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify- gap-6 text-center relative ">

      {/* Nav */}
      <div className="w-full flex justify-between md:px-10 px-7 py-5 items-center sticky top-0 bg-white border border-gray-300 shadow-xs">
        <p className="text-2xl font-medium font-sans">
          Rescore
        </p>
        <div>
          <a
            href="https://github.com/UjjwalKumar02/Resume-score"
            className="bg-black px-6 py-1.5 rounded-xl text-sm font-medium text-gray-100"
          >
            Github
          </a>
        </div>
      </div>


      {/* Hero section */}
      <div className="lg:w-[88%] flex lg:flex-row flex-col justify-center items-center lg:px-20 px-4 gap-8 mt-18">

        <div className="flex flex-col lg:items-start items-center justify-center md:gap-6 gap-7 px-2 mb-8 lg:w-[42%]">
          <div className="border border-gray-500 py-1.5 px-5 rounded-full text-sm flex items-center gap-1 ">
            <RiOpenSourceLine size={20} color="blue" />
            Open source
          </div>
          <div className="space-y-4 text-left">
            <p className="md:text-4xl text-2xl leading-[1.44] font-medium text-center lg:text-left">
              Real-time Resume evaluation with Job Description
            </p>
            <p className="md:text-md text-sm lg:text-left text-center">
              Predicts resume fit score and ranking
            </p>
          </div>
          <Link
            href={"/score-prediction"}
            onClick={handleClick}
            className="bg-black text-gray-100 px-9 py-1 rounded-xl hover:bg-gray-800 font-medium"
          >
            {loading ? "Loading..." : "Get Started >"}
          </Link>
        </div>

        {/* Image */}
        <div className="border border-gray-300 rounded-xl shadow-lg transition-transform duration-300 transform hover:scale-120 hover:z-10 mt-3">
          <Image
            src={img}
            alt="image"
            height={100}
            width={700}
            className="rounded-xl w-192"
          />
        </div>
      </div>

    </div>
  );
}
