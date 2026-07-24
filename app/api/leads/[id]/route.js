import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Lead from '@/models/Lead';
import mongoose from 'mongoose';

export async function PATCH(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) return NextResponse.json({ success: false, error: 'Invalid ObjectId' }, { status: 400 });
    if (!['New', 'Contacted', 'Closed'].includes(body.status)) return NextResponse.json({ success: false, error: 'Invalid status value' }, { status: 400 });

    const updatedLead = await Lead.findByIdAndUpdate(id, { status: body.status }, { new: true, runValidators: true });
    if (!updatedLead) return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 });

    return NextResponse.json({ success: true, data: updatedLead }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Unknown server error.' }, { status: 500 });
  }
}