import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { suggestedTitles } = await req.json();

  try {
    if (!Array.isArray(suggestedTitles) || suggestedTitles.length === 0) {
      return NextResponse.json(
        { error: "No movie titles provided" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OMDB_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "OMDb API key missing" },
        { status: 500 }
      );
    }

    const fetchMovie = async (title: string) => {
      const response = await fetch(
        `https://www.omdbapi.com/?t=${encodeURIComponent(
          title
        )}&apikey=${apiKey}`
      );
      return response.json();
    };

    const moviePromises = suggestedTitles.map(fetchMovie);
    const movies = await Promise.all(moviePromises);

    const validMovies = movies.filter(
      (movie) => movie && movie.Response === "True"
    );

    return NextResponse.json({ movies: validMovies });
  } catch (error) {
    console.error("Error in /api/movies:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
