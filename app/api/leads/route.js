import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Lead from '@/models/Lead';
import { leadSchema } from '@/lib/validations';

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const validatedData = leadSchema.parse(body);
    const newLead = await Lead.create(validatedData);
    return NextResponse.json({ success: true, data: newLead }, { status: 201 });
  } catch (error) {
    if (error.name === 'ZodError') return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    return NextResponse.json({ success: false, error: 'Database failure or server error.' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const leads = await Lead.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: leads }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch leads.' }, { status: 500 });
  }
}