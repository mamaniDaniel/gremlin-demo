import { NextResponse } from "next/server";
import { getDevelopers } from "@/lib/gremlin";

export async function GET() {
  try {
    const data = await getDevelopers();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching developers:", error);
    return NextResponse.json(
      { error: "Failed to fetch developers" },
      { status: 500 }
    );
  }
}
