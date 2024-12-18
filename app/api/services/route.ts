import { NextResponse } from 'next/server';
import { config } from 'lib/config';

export async function GET() {
  try {
    const response = await fetch(`${config.apiUrl}/services`);
    if (response.ok) {
      const services = await response.json();
      return NextResponse.json(services);
    }
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const newService = await request.json();
    const response = await fetch(`${config.apiUrl}/services`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newService),
    });

    if (response.ok) {
      return NextResponse.json({ message: 'Service added successfully' });
    }
    return NextResponse.json(
      { error: 'Failed to add service' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Error adding service:', error);
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
    const updatedService = await request.json();
    const response = await fetch(`${config.apiUrl}/services/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedService),
    });

    if (response.ok) {
      return NextResponse.json({ message: 'Service updated successfully' });
    }
    return NextResponse.json(
      { error: 'Failed to update service' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Error updating service:', error);
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
    const response = await fetch(`${config.apiUrl}/services/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      return NextResponse.json({ message: 'Service deleted successfully' });
    }
    return NextResponse.json(
      { error: 'Failed to delete service' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
