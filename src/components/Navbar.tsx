"use client";

import { Film, Github } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-900 font-bold text-xl"
        >
          <Film className="w-6 h-6 text-yellow-500" />
          What2Watch
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-500"></nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-900 bg-white border border-gray-200 hover:bg-yellow-50 transition-colors shadow-sm"
            asChild
            style={{ boxShadow: "0 2px 8px 0 #0001" }}
          >
            <a
              href="https://github.com/Ravi0529/what2watch"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Repository"
            >
              <Github className="w-5 h-5" strokeWidth={2.2} />
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
