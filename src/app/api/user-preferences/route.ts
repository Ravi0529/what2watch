import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export async function POST(req: NextRequest) {
  const { genres, mood, language, timeframe, count } = await req.json();

  try {
    const prompt = `
    You are a smart and precise movie recommendation assistant.

    Your task:
    Based on the following user preferences, suggest only ${count} movie titles. DO NOT add descriptions, numbering, or extra text. Only return a valid **JSON array of strings** like ["Inception", "Interstellar", "The Matrix"].

    ---

    User Preferences:
    genres: ${genres?.length ? genres.join(", ") : "Any"}
    mood/theme: ${mood || "Any"}
    preferred language: ${language || "Any"}
    release timeframe: ${timeframe || "Any"}

    ---

    Important Rules:
    - Only include movie names that fit the user's taste.
    - Keep it varied (unless the request is specific).
    - Return exactly ${count} titles, no more, no less.
    - Format your final output as **JSON array only**, without extra text.

    ---

    Example Input-1:
    genres: Action, Sci-Fi
    mood: Mind-bending plots
    language: English
    release timeframe: Last 10 years
    count: 5

    Example Output-1:
    ["Tenet", "Interstellar", "Inception", "The Prestige", "Blade Runner 2049"]

    Example Input-2:
    genres: Sci-Fi
    mood: Feel-good movies
    language: Hindi
    release timeframe": Last 10 years
    count: 3
    
    Example Output-2:
    ["PK", "3 Idiots", "Koi... Mil Gaya"]

    Start your response below with the array.
    `;

    const response = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        { role: "system", content: prompt },
        {
          role: "user",
          content: `Please provide movie recommendations based on the above preferences and return exactly ${count} movie titles.`,
        },
      ],
    });

    const aiResponse = response.choices[0].message;
    // console.log(aiResponse);

    let suggestedTitles: string[] = [];

    try {
      let aiContent = aiResponse.content ?? "[]";

      aiContent = aiContent.trim();
      if (aiContent.startsWith("```")) {
        aiContent = aiContent.replace(/```json|```/g, "").trim();
      }

      suggestedTitles = JSON.parse(aiContent);
    } catch (err) {
      console.error("Failed to parse OpenAI response:", aiResponse);
      return NextResponse.json(
        { error: "Failed to parse movie suggestions" },
        { status: 500 }
      );
    }

    return NextResponse.json({ suggestedTitles });
  } catch (error) {
    console.error("Error in user-preferences route:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
