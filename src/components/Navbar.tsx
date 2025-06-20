"use client";

import { Film, Github } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="w-full bg-[#121212] border-b border-[#2a2a2a] shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-white font-semibold text-xl"
        >
          <Film className="w-6 h-6 text-purple-500" />
          What2Watch
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-white bg-[#23232b] transition-colors"
            asChild
            style={{ boxShadow: "0 2px 8px 0 #0003" }}
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
