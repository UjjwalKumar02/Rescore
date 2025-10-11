"use client";

import Link from "next/link";
import { LuGithub } from "react-icons/lu";


export default function Nav() {
  return (
    <div className="w-full fixed top-0 pt-6 pb-4 lg:px-10 px-7 flex justify-between items-center border-b border-gray-300 bg-white shadow-xs">
      <Link href="/" className="lg:text-xl font- font-medium">
        Rescore
      </Link>

      <div className="flex items-center lg:gap-11 gap-4 text-sm font-medium text-gray-900">
        <Link href="/score-prediction" className="hover:text-blue-600">
          Score
        </Link>
        <Link href="/rank-resumes" className="hover:text-blue-600 ">
          Rank
        </Link>
        <Link href="https://github.com/UjjwalKumar02/Resume-score" className="hover:text-blue-600">
          <LuGithub size={21} />
        </Link>
      </div>
    </div>
  );
};