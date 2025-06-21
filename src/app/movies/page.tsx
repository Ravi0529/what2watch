"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface Movie {
  Title: string;
  Year: string;
  Poster: string;
  Plot: string;
  Genre: string;
  imdbRating: string;
}

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const storedTitles = localStorage.getItem("suggestedTitles");
        if (!storedTitles) return;

        const titles: string[] = JSON.parse(storedTitles);
        const response = await axios.post("/api/movies", {
          suggestedTitles: titles,
        });

        setMovies(response.data.movies || []);
      } catch (error) {
        console.log(error);
        toast.error("Error fetching movies. Try Again!");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0f11] text-white">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2 text-lg">Fetching movie recommendations...</span>
      </div>
    );
  }

  if (!movies.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0f11] text-white text-xl">
        No recommendations found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f11] text-white py-10 px-4">
      <div className="flex items-center justify-between max-w-6xl mx-auto mb-6 px-2">
        <Button
          variant="outline"
          className="bg-[#1c1c24] border border-[#333] text-white hover:bg-[#2a2a35]"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl sm:text-3xl font-bold text-center w-full -ml-12 sm:-ml-16">
          🎬 Recommended Movies
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {movies.map((movie) => (
          <Card
            key={movie.Title}
            className="bg-[#1c1c24] border border-[#2a2a2a] rounded-xl shadow-md overflow-hidden"
          >
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
              alt={movie.Title}
              className="w-full h-72 object-cover"
            />
            <CardContent className="p-4 space-y-2">
              <h2 className="text-xl font-semibold">
                {movie.Title} ({movie.Year})
              </h2>
              <p className="text-sm text-gray-400">{movie.Genre}</p>
              <p className="text-sm">{movie.Plot}</p>
              <p className="text-sm text-yellow-400">
                IMDb: ⭐ {movie.imdbRating}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
