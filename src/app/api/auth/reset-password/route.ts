import { NextResponse } from 'next/server';
import { sendPasswordResetEmail } from '@/lib/services/emailService';

export async function POST(request: Request) {
  try {
    const { email, role = 'user' } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Generate 6-digit verification code OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Send email via Nodemailer
    await sendPasswordResetEmail(email, otpCode, role as 'user' | 'admin');

    return NextResponse.json({
      success: true,
      message: `Password reset verification code sent to ${email}.`,
      otpCode, // Returned for instant testing validation in dev mode
    });
  } catch (error) {
    console.error('Password reset API error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process password reset email.' },
      { status: 500 }
    );
  }
}
