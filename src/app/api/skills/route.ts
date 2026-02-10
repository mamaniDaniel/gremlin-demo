import { NextResponse } from "next/server";
import { getSkillsRanked } from "@/lib/gremlin";

export async function GET() {
  try {
    const data = await getSkillsRanked();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching skills:", error);
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 }
    );
  }
}
