import { NextResponse } from "next/server";
import { getDeveloperNetwork } from "@/lib/gremlin";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await getDeveloperNetwork(id);
    if (!data) {
      return NextResponse.json(
        { error: "Developer not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching developer network:", error);
    return NextResponse.json(
      { error: "Failed to fetch developer network" },
      { status: 500 }
    );
  }
}
