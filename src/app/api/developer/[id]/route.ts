import { NextResponse } from "next/server";
import { getDeveloperById } from "@/lib/gremlin";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await getDeveloperById(id);
    if (!data) {
      return NextResponse.json(
        { error: "Developer not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching developer:", error);
    return NextResponse.json(
      { error: "Failed to fetch developer" },
      { status: 500 }
    );
  }
}
