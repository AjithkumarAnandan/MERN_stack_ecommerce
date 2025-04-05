import { NextRequest, NextResponse } from 'next/server';
const pool = require('@/utils/postgresql');
import { postgresConnect } from '@/utils/dbConnect';

export const config = { api: { bodyParser: false } };

export async function GET(req: NextRequest, { params }: { params: { filename: string } }) {
  const { filename } = params;
  try {
    await postgresConnect();
    const result = await pool.query(
      'SELECT * FROM fullstacknextjs.upload WHERE "filename" = $1',
      [filename]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const fileRow = result.rows[0];
    const fileBuffer = fileRow.filedata; // Assuming 'filedata' is a BYTEA column

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': fileRow.filetype || 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
