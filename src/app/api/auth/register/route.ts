import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/utils/dbConnect";
import User from "@/models/user";

export async function POST(req: Request) {
try {
  await dbConnect();
  const body = await req.json();
  
  if (!body) {
    return NextResponse.json({ message: "Request body is empty" }, { status: 400 });
  }    

  const { username, password, email, dob}: { username: string; password: string; email:string, dob:Date}= body;
  
  // Check if user already exists
  let existingUser = await User.findOne({  $or: [{ username }, { email }] });
  if (existingUser) {
    return NextResponse.json({ message: "User already exists" }, { status: 400 });
  }
  // Hash password with SHA-256
  // const sha256Hashed = crypto.createHash("sha256").update(password).digest("hex");
  const saltRounds = 10; 
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  // Create new user with the hashed password
  const newUser = new User({ username, password: hashedPassword, email, dob });
  // Save the new user
  await newUser.save();
  return NextResponse.json({ message: "User registered successfully", status: 201 }, { status: 201 });
} catch (error) {
  console.error("❌ Registration Error:", error);  

  return NextResponse.json(
    { message: "Internal Server Error", error: error instanceof Error ? error.message : "Unknown error" },
    { status: 500 }
  );
}
}
