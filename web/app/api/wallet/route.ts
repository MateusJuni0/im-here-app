import { NextResponse } from 'next/server';
import { z } from 'zod';

// Mock de Banco de Dados
const MOCKED_BALANCE = 1500.50;

const transactionSchema = z.object({
  amount: z.number().positive("O valor deve ser positivo"),
  type: z.enum(['withdraw', 'deposit']),
});

export async function GET() {
  return NextResponse.json({ data: { balance: MOCKED_BALANCE }, error: null });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = transactionSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ success: false, errors: validation.error.issues }, { status: 400 });
    }
    
    const { amount, type } = validation.data;

    let newBalance = MOCKED_BALANCE;

    if (type === 'withdraw') {
      if (MOCKED_BALANCE < amount) {
        return NextResponse.json({ data: null, error: 'Saldo insuficiente' }, { status: 400 });
      }
      newBalance -= amount;
    } else if (type === 'deposit') {
      newBalance += amount;
    }

    return NextResponse.json({ data: { balance: newBalance, message: 'Transação simulada com sucesso' }, error: null });
  } catch (e) {
    return NextResponse.json({ data: null, error: 'Erro no servidor' }, { status: 500 });
  }
}
