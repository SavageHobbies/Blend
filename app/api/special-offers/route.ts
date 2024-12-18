import { NextResponse } from 'next/server';
import { config } from 'lib/config';

export async function GET() {
  try {
    const response = await fetch(`${config.apiUrl}/special-offers`);
    if (response.ok) {
      const specialOffers = await response.json();
      return NextResponse.json(specialOffers);
    }
    return NextResponse.json(
      { error: 'Failed to fetch special offers' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Error fetching special offers:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const newOffer = await request.json();
    const response = await fetch(`${config.apiUrl}/special-offers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOffer),
    });

    if (response.ok) {
      return NextResponse.json({ message: 'Special offer added successfully' });
    }
    return NextResponse.json(
      { error: 'Failed to add special offer' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Error adding special offer:', error);
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
    const updatedOffer = await request.json();
    const response = await fetch(`${config.apiUrl}/special-offers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedOffer),
    });

    if (response.ok) {
      return NextResponse.json({ message: 'Special offer updated successfully' });
    }
    return NextResponse.json(
      { error: 'Failed to update special offer' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Error updating special offer:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const response = await fetch(`${config.apiUrl}/special-offers/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      return NextResponse.json({ message: 'Special offer deleted successfully' });
    }
    return NextResponse.json(
      { error: 'Failed to delete special offer' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Error deleting special offer:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
