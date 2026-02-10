import { NextResponse } from "next/server";
import { getFullGraph } from "@/lib/gremlin";

export async function GET() {
  try {
    const data = await getFullGraph();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching graph:", error);
    return NextResponse.json(
      { error: "Failed to fetch graph data" },
      { status: 500 }
    );
  }
}
