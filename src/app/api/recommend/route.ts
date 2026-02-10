import { NextResponse } from "next/server";
import { getSkillRecommendations } from "@/lib/gremlin";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const devId = searchParams.get("dev");

  if (!devId) {
    return NextResponse.json(
      { error: "Missing 'dev' query parameter" },
      { status: 400 }
    );
  }

  try {
    const data = await getSkillRecommendations(devId);
    if (!data) {
      return NextResponse.json(
        { error: "Developer not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return NextResponse.json(
      { error: "Failed to fetch recommendations" },
      { status: 500 }
    );
  }
}
