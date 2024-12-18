import { NextResponse } from 'next/server';
import { config } from 'lib/config';

export async function GET() {
  try {
    const response = await fetch(`${config.apiUrl}/feature-toggles`);
    if (response.ok) {
      const featureToggles = await response.json();
      return NextResponse.json(featureToggles);
    }
    return NextResponse.json(
      { error: 'Failed to fetch feature toggles' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Error fetching feature toggles:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const updatedToggle = await request.json();
    const response = await fetch(`${config.apiUrl}/feature-toggles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedToggle),
    });

    if (response.ok) {
      return NextResponse.json({ message: 'Feature toggle updated successfully' });
    }
    return NextResponse.json(
      { error: 'Failed to update feature toggle' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Error updating feature toggle:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
