import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    await connectDB();
    
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      return NextResponse.json({ error: 'Admin credentials missing in .env' }, { status: 400 });
    }

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      return NextResponse.json({ message: 'Admin already exists in DB.' }, { status: 200 });
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await User.create({ email: adminEmail, password: hashedPassword });

    return NextResponse.json({ success: true, message: 'Admin seeded in DB successfully!' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to seed database.' }, { status: 500 });
  }
}