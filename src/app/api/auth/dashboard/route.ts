import { NextResponse } from "next/server";
import { getLoginUser } from "@/lib/getLoginUser";

export async function GET(req: Request) {
  try {
    const { user, error } = await getLoginUser(req); // Await the function call

    if (error) return error; // Return error response if authentication fails

    return NextResponse.json({
      status: 200,
      data: user,
      message: "Dashboard data fetched successfully",
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: (error as any)?.message },
      { status: 500 }
    );
  }
}
