import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"; // Ensure jsonwebtoken is installed

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();

    if (!body || !body.email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const { email }: { email: string } = body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // Ensure JWT secret exists
      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
      }

      const accessToken = jwt.sign({ id: existingUser._id, username: existingUser.username }, process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      return NextResponse.json({ data: true, accessToken, email:existingUser?.email, message: "User already exists" }, { status: 200 });
    } else {
      return NextResponse.json({ data: false, accessToken: null, message: "User does not exist" }, { status: 200 });
    }
  } catch (error) {
    console.error("Error in user check:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
