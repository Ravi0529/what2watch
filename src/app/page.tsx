"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Film } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0f0f11] text-white flex items-center justify-center px-6 py-12">
      <main className="w-full max-w-2xl flex flex-col gap-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-[#1e1e28] to-[#2b2b38] border border-[#333] shadow-[0_0_30px_#1e1e28] rounded-2xl">
            <CardHeader className="text-center space-y-4">
              <div className="flex justify-center">
                <Film className="w-14 h-14 text-purple-500 drop-shadow-lg" />
              </div>
              <CardTitle className="text-4xl font-extrabold tracking-wide text-white">
                What2Watch
              </CardTitle>
              <p className="text-sm text-muted-foreground text-balance">
                Let AI pick the perfect movie for your mood. Just tell us what
                you like.
              </p>
            </CardHeader>
            <CardContent className="flex justify-center mt-4">
              <Button
                size="lg"
                className="px-8 py-3 text-lg font-semibold rounded-xl bg-purple-600 hover:bg-purple-700 transition-colors"
                onClick={() => router.push("/preferences")}
              >
                🎬 Get Started
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.footer
          className="text-center text-xs text-muted-foreground opacity-60 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          &copy; {new Date().getFullYear()} What2Watch. Built with love, AI, and
          Next.js.
        </motion.footer>
      </main>
    </div>
  );
}
