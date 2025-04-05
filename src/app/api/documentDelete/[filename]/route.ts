import { NextRequest, NextResponse } from 'next/server';
const pool = require('@/utils/postgresql');

export const config = { api: { bodyParser: false } };

// Use request object to get filename (for example, from query or body)
export async function DELETE(req: NextRequest, { params }: { params: any }) {
  try {
    const filename = params?.filename?.replace('filename=', '') ?? null;

    if (!filename) {
      return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
    }

    await pool.query(
      'DELETE FROM fullstacknextjs.upload WHERE filename = $1',
      [filename]
    );

    return NextResponse.json({ data: filename, message: 'Successfully Deleted',  status: 201 }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
} 
