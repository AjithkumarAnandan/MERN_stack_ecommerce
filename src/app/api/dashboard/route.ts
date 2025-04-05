import { NextResponse } from "next/server";
import { getLoginUser } from "@/lib/getLoginUser";
import { postgresConnect } from "@/utils/dbConnect"
const pool=require("@/utils/postgresql");

async function ensureTableExists() {
  await pool.query("CREATE SCHEMA IF NOT EXISTS fullstacknextjs");

  await pool.query(`
    CREATE TABLE IF NOT EXISTS fullstacknextjs.dashboard (
      id SERIAL PRIMARY KEY, 
      description VARCHAR(255), 
      email VARCHAR(255) UNIQUE,
      name VARCHAR(100), 
      dob DATE
    )
  `);
}

export async function POST(req: Request) {
  try {
    await postgresConnect();
    // 🟢 Authenticate User
    const { user, error } = await getLoginUser(req);
    if (error) return NextResponse.json({ status: 401, message: "Unauthorized" }, { status: 401 });

    const body = await req.json();

    // 🟢 Ensure required fields exist, otherwise default to NULL
    const { description = null, name = null, dob = null } = body;
    const  email = user?.email;

    if (!email) {
      return NextResponse.json({ status: 400, message: "Email is required please login again" }, { status: 400 });
    }
    // 🟢 Ensure table exists before inserting data
    await ensureTableExists();
        // 🟢 Check if email already exists
    const existingUser = await pool.query(
      "SELECT * FROM fullstacknextjs.dashboard WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return NextResponse.json({ status: 409, message: "Email already exists" }, { status: 409 });
    }
    // 🟢 Insert data
    const newData = await pool.query(
      "INSERT INTO fullstacknextjs.dashboard (description, email, name, dob) VALUES($1, $2, $3, $4) RETURNING *",
      [description, email, name, dob]
    );

    return NextResponse.json({ status: 200, data: newData.rows[0], message: "Data inserted successfully" });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ message: "Internal Server Error", error: (error as any)?.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    // 🟢 Authenticate User
        await postgresConnect();
    const { user, error } = await getLoginUser(req);
    if (error) return NextResponse.json({ status: 401, message: "Unauthorized" }, { status: 401 });

    // 🟢 Ensure table exists before fetching data
    await ensureTableExists();

    // 🟢 Fetch data with a limit of 50KB (~500 records assuming small text size)
    const newData = await pool.query("SELECT * FROM fullstacknextjs.dashboard ORDER BY id DESC");

    return NextResponse.json({
      status: 200,
      data: newData.rows,
      message: "Data fetched successfully",
    });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ message: "Internal Server Error", error: (error as any)?.message }, { status: 500 });
  }
}
