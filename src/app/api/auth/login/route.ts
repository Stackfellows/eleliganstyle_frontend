import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    let body: Record<string, unknown> = {};
    try {
      body = await request.json();
    } catch {
      // Handle non-JSON or raw text fallback
      const text = await request.text();
      try {
        body = JSON.parse(text);
      } catch {
        body = {};
      }
    }

    const { email, password } = body as { email?: string; password?: string };

    if (email === 'admin@elegantstyle.com' && password === 'admin123') {
      return NextResponse.json({
        success: true,
        message: 'Admin authenticated successfully.',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.elegant_admin_token_2026',
        user: {
          id: 'admin-01',
          name: 'Maison Admin',
          email: 'admin@elegantstyle.com',
          role: 'admin'
        }
      });
    }

    return NextResponse.json(
      { success: false, message: 'Invalid administrator credentials.' },
      { status: 401 }
    );
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Server authentication error.';
    return NextResponse.json(
      { success: false, message: errMessage },
      { status: 500 }
    );
  }
}
