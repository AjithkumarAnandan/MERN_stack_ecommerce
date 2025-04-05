import { postgresConnect } from '@/utils/dbConnect';
import { Buffer } from 'buffer';
const pool=require("@/utils/postgresql");


  export const config = { api: { bodyParser: false } };

async function ensureTableExists() {
  await pool.query("CREATE SCHEMA IF NOT EXISTS fullstacknextjs");
  await pool.query(`
    CREATE TABLE IF NOT EXISTS fullstacknextjs.upload (
      id SERIAL PRIMARY KEY,
      filename TEXT NOT NULL,
      filetype TEXT NOT NULL,
      filedata BYTEA NOT NULL
    )
  `);
}

export async function POST(req: Request) {
  try {
        await postgresConnect();
    await ensureTableExists();
    const { filedata, filename, filetype } = await req.json();

    if (!filedata || !filename) {
      return new Response(
        JSON.stringify({ message: "File data or filename missing" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Optional: Strip base64 prefix if included
    // const base64String = fileData.split(',').pop(); // removes data:... part if it exists
    const buffer = Buffer.from(filedata, "base64");

    // Insert raw binary into BYTEA
    await pool.query(
      "INSERT INTO fullstacknextjs.upload (filename, filedata, filetype) VALUES ($1, $2, $3)",
      [filename, buffer, filetype]
    );

    return new Response(
      JSON.stringify({ message: "Upload successful", data: {filename,filedata, filetype}, status: 201 }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Upload error:", err);
    return new Response(
      JSON.stringify({ error: "Upload failed", details: String(err) }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
