import { NextResponse } from 'next/server';

// Mock de Banco de Dados
let balance = 1500.50;

export async function GET() {
  return NextResponse.json({ data: { balance }, error: null });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, type } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json({ data: null, error: 'Valor inválido' }, { status: 400 });
    }

    if (type === 'withdraw') {
      if (balance < amount) {
        return NextResponse.json({ data: null, error: 'Saldo insuficiente' }, { status: 400 });
      }
      balance -= amount;
    } else if (type === 'deposit') {
      balance += amount;
    }

    return NextResponse.json({ data: { balance, message: 'Transação realizada' }, error: null });
  } catch (e) {
    return NextResponse.json({ data: null, error: 'Erro no servidor' }, { status: 500 });
  }
}
