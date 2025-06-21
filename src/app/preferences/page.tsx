"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MultiSelect, MultiSelectItem } from "@/components/MultiSelect";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Clapperboard } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

const GENRES = [
  "Action",
  "Comedy",
  "Sci-Fi",
  "Romance",
  "Thriller",
  "Horror",
  "Drama",
  "Fantasy",
  "Animation",
];

const MOODS = [
  "Excited for Adventure",
  "Want to laugh",
  "Feel romantic",
  "Looking for action",
  "Need a good cry",
  "Want to be scared",
  "Feeling nostalgic",
  "Need inspiration",
];

const LANGUAGES = [
  "English",
  "Hindi",
  "Japanese",
  "Korean",
  "French",
  "Spanish",
];

const TIMEFRAMES = [
  "Any time",
  "Last 5 years",
  "Last 10 years",
  "Classics (before 2000)",
];

export default function PreferencesPage() {
  const [genres, setGenres] = useState<string[]>([]);
  const [mood, setMood] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [releaseTimeframe, setReleaseTimeframe] = useState<string>("");
  const [count, setCount] = useState<number>(5);

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/user-preferences", {
        genres,
        mood,
        language,
        timeframe: releaseTimeframe,
        count,
      });

      const suggestedTitles = response.data?.suggestedTitles;
      // console.log("Movie Suggestions:", suggestedTitles);

      localStorage.setItem("suggestedTitles", JSON.stringify(suggestedTitles));
      router.push("/movies");

      toast.success("Searching Movies...");
    } catch (error) {
      console.error("Failed to get movie suggestions:", error);
      toast.error("Something went wrong while fetching movie recommendations.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-yellow-50 text-gray-900 py-8 px-2 md:px-4 flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto">
        <Card className="bg-white border border-gray-200 shadow-xl rounded-2xl">
          <CardHeader className="flex flex-col items-center gap-2 pt-8 pb-4">
            <Clapperboard className="w-12 h-12 text-yellow-500 drop-shadow-lg mb-2" />
            <CardTitle className="text-3xl font-extrabold tracking-wide text-gray-900 text-center">
              Tell us what you like
            </CardTitle>
            <p className="text-sm text-gray-500 text-balance text-center max-w-md">
              Personalize your movie recommendations by selecting your
              preferences below.
            </p>
          </CardHeader>
          <CardContent className="space-y-7 md:space-y-8 px-5 md:px-8 pb-8">
            {/* genres */}
            <div>
              <Label className="text-base font-semibold mb-1 block text-gray-800">
                Preferred Genre
              </Label>
              <MultiSelect
                values={genres}
                onChange={setGenres}
                placeholder="Choose your favorite genre"
              >
                {GENRES.map((genre) => (
                  <MultiSelectItem key={genre} value={genre}>
                    {genre}
                  </MultiSelectItem>
                ))}
              </MultiSelect>
            </div>

            {/* mood */}
            <div>
              <Label className="text-base font-semibold mb-1 block text-gray-800">
                Current Mood
              </Label>
              <Select onValueChange={setMood}>
                <SelectTrigger className="w-full bg-white border border-gray-300 text-gray-800 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400">
                  <SelectValue placeholder="How are you feeling today?" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 text-gray-900">
                  {MOODS.map((mood) => (
                    <SelectItem
                      key={mood}
                      value={mood}
                      className="hover:bg-yellow-100"
                    >
                      {mood}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* language */}
            <div>
              <Label className="text-base font-semibold mb-1 block text-gray-800">
                Preferred Language
              </Label>
              <Select onValueChange={setLanguage}>
                <SelectTrigger className="w-full bg-white border border-gray-300 text-gray-800 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 text-gray-900">
                  {LANGUAGES.map((lang) => (
                    <SelectItem
                      key={lang}
                      value={lang}
                      className="hover:bg-yellow-100"
                    >
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* release timeframe */}
            <div>
              <Label className="text-base font-semibold mb-1 block text-gray-800">
                Release Timeframe
              </Label>
              <Select onValueChange={setReleaseTimeframe}>
                <SelectTrigger className="w-full bg-white border border-gray-300 text-gray-800 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 text-gray-900">
                  {TIMEFRAMES.map((frame) => (
                    <SelectItem
                      key={frame}
                      value={frame}
                      className="hover:bg-yellow-100"
                    >
                      {frame}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* count */}
            <div>
              <Label className="text-base font-semibold mb-1 block text-gray-800">
                Number of Recommendations
              </Label>
              <Select onValueChange={(val) => setCount(Number(val))}>
                <SelectTrigger className="w-full bg-white border border-gray-300 text-gray-800 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400">
                  <SelectValue placeholder="How many movies?" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 text-gray-900">
                  {[2, 3, 5, 10, 15].map((val) => (
                    <SelectItem
                      key={val}
                      value={val.toString()}
                      className="hover:bg-yellow-100"
                    >
                      {val}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4">
              <Button
                size="lg"
                className="w-full bg-yellow-400 hover:bg-yellow-500 transition-colors text-lg font-semibold rounded-xl shadow-md py-3 text-gray-900"
                onClick={handleSubmit}
              >
                🎥 Get Recommendations
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
