"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

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
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-yellow-50 text-gray-900">
        <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
        <span className="ml-2 text-lg mt-2">
          Fetching movie recommendations...
        </span>
      </div>
    );
  }

  if (!movies.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-yellow-50 text-gray-500 text-xl">
        No recommendations found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-yellow-50 text-gray-900 py-10 px-2 md:px-4">
      <div className="flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto mb-6 px-2 gap-4 sm:gap-0">
        <Button
          variant="outline"
          className="bg-white border border-gray-300 text-gray-900 hover:bg-yellow-50 shadow-sm font-semibold"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4 text-yellow-500" />
        </Button>
        <h1 className="text-2xl sm:text-3xl font-bold text-center w-full sm:w-auto">
          🎬 Recommended Movies
        </h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {movies.map((movie) => (
          <Card
            key={movie.Title}
            className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden flex flex-col"
          >
            <Image
              src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
              alt={movie.Title}
              width={400}
              height={600}
              className="w-full h-72 object-cover"
            />
            <CardContent className="px-2 md:p-4 space-y-1 flex-1 flex flex-col">
              <h2 className="md:text-xl font-semibold text-gray-900">
                {movie.Title}{" "}
                <span className="font-normal text-gray-500">
                  ({movie.Year})
                </span>
              </h2>
              <p className="text-xs md:text-sm text-gray-500">{movie.Genre}</p>
              <p className="text-xs md:text-sm text-yellow-600 font-semibold mt-2">
                IMDb:{" "}
                <span className="align-middle">⭐ {movie.imdbRating}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
