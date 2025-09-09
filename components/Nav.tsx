"use client";

import Link from "next/link";
import { LuGithub } from "react-icons/lu";


export default function Nav() {
  return (
    <div className="w-full fixed top-0  py-6 lg:px-10 px-7 flex justify-between items-center border-b border-gray-200 bg-white">
      <a href="" className="lg:text-lg">Resume score</a>
      <div className="flex items-center lg:gap-10 gap-4 text-sm font-medium">
        <Link href="/score-prediction" className="hover:text-blue-600">Score</Link>
        <Link href="/rank-resumes" className="hover:text-blue-600 ">Rank</Link>
        <a href="" className="hover:text-blue-600"><LuGithub size={20} /></a>
      </div>
    </div>
  );
};