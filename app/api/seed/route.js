import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    // Connect to the database
    await connectDB();
    
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      return NextResponse.json(
        { error: 'Admin credentials missing in .env.local' }, 
        { status: 400 }
      );
    }

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      return NextResponse.json(
        { message: 'Admin user already exists. No action taken.' }, 
        { status: 200 }
      );
    }

    // Create new admin
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await User.create({
      email: adminEmail,
      password: hashedPassword,
    });

    return NextResponse.json(
      { success: true, message: 'Admin user created successfully!' }, 
      { status: 201 }
    );
  } catch (error) {
    console.error('Seed API Error:', error);
    return NextResponse.json(
      { error: 'Failed to seed database.' }, 
      { status: 500 }
    );
  }
}