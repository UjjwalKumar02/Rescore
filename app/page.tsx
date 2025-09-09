"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-2 text-center">
      <h1 className="text-3xl">Resume score</h1>
      <p>Don't you wanna know about your resume...</p>
      <Link href={"/score-prediction"} onClick={handleClick} className="bg-black text-white px-9 py-1.5 rounded text-sm">
        {loading ? "Loading..." : "Get Started"}
      </Link>
    </div>
  );
}
