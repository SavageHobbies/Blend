import { NextResponse } from 'next/server';
import { login } from 'lib/auth';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    const token = await login(username, password);
    
    if (token) {
      return NextResponse.json({ token });
    }
    
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
