import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { dbConnect } from "@/utils/dbConnect";
import User from "@/models/user";

export const getLoginUser = async (req: Request) => {
  try {
    await dbConnect(); // Connect to MongoDB

    // Extract token from request headers
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return { error: NextResponse.json({ message: "Unauthorized" }, { status: 401 }) };
    }

    const token = authHeader.split(" ")[1];

    // Verify JWT Token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (error) {
      return { error: NextResponse.json({ message: "Invalid token" }, { status: 401 }) };
    }

    if (!decoded || typeof decoded === "string") {
      return { error: NextResponse.json({ message: "Invalid token" }, { status: 401 }) };
    }

    // Fetch user data
    const user = await User.findById(decoded.id).select("-password"); // Exclude password
    if (!user) {
      return { error: NextResponse.json({ message: "User not found" }, { status: 404 }) };
    }

    return { user };
  } catch (error) {
    return { error: NextResponse.json({ message: "Server error", error }, { status: 500 }) };
  }
};
