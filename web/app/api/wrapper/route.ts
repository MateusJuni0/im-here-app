import { NextResponse } from 'next/server';

export async function GET() {
  // Mock de disponibilidade de serviços de transporte
  const availability = {
    uber: {
      available: true,
      eta: '5 min',
      price: '€ 12.90',
      car_type: 'X'
    },
    bolt: {
      available: true,
      eta: '7 min',
      price: '€ 10.50',
      car_type: 'Economy'
    }
  };

  return NextResponse.json({ data: availability, error: null });
}
