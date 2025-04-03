import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { dbConnect } from "@/utils/dbConnect";
import User from "@/models/user";
import * as crypto from "crypto";


export async function POST(req: Request) {
  try {
    await dbConnect(); // Connect to MongoDB
   const body = await req.json();  
  if (!body) {
    return NextResponse.json({ message: "Request body is empty" }, { status: 400 });
  };    
  const { username, password }: { username: string; password: string; }= body;
    
    // Check if the user exists
    const user = await User.findOne({     $or: [{ username }, { email: username }] });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    // const sha256Hashed = crypto.createHash("sha256").update(password).digest("hex");

     //  Compare SHA-256 hash with the stored password
     const normalPassword=atob(password);
    const isPasswordValid = await bcrypt.compare(normalPassword, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // Generate JWT Token
    const accessToken = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET!,  {
       algorithm: "HS256",
       expiresIn: "1h",
          header: {
            alg: "HS256",
            typ: "JWT"
          }
        });

    return NextResponse.json({status: 200, email: user?.email, accessToken,  message: "Login successful" }, { status: 200 });
  } catch (error: unknown) {
  if (error instanceof Error) {
    return NextResponse.json({ message: "Internal Server Error", error: error?.message }, { status: 500 });
  } else {
    console.error("Unexpected Error:", error);
    return NextResponse.json({ message: "Internal Server Error", error: "An unknown error occurred" }, { status: 500 });
  }
}
}
