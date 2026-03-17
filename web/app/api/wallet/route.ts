import { NextResponse } from 'next/server';
import { db } from '@/src/db';
import { wallets, transactions } from '@/src/db/schema';
import { eq, asc } from 'drizzle-orm';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';
import { z } from 'zod';

// Configuracao do Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn("Faltam variaveis de ambiente do Supabase");
}

const supabase = createClient(supabaseUrl || '', supabaseKey || '');

const LEDGER_SECRET = process.env.LEDGER_SECRET || 'super-secret-ledger-key-2024';

const transactionSchema = z.object({
  amount: z.number().positive("O valor deve ser positivo"),
  type: z.enum(['withdraw', 'deposit']),
});

// Helper para gerar a assinatura HMAC
function generateSignature(walletId: number, amount: string, type: string, previousSignature: string | null) {
  const hmac = crypto.createHmac('sha256', LEDGER_SECRET);
  hmac.update(`${walletId}:${amount}:${type}:${previousSignature || 'genesis'}`);
  return hmac.digest('hex');
}

// Middleware de Autenticacao Supabase
async function authenticate(req: Request) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    return { error: 'Token nao fornecido', status: 401 };
  }

  const token = authHeader.replace('Bearer ', '');
  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return { error: 'Nao autorizado', status: 401 };
  }

  return { user };
}

export async function GET(req: Request) {
  const auth = await authenticate(req);
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const userId = auth.user!.id;

  const [wallet] = await db.select().from(wallets).where(eq(wallets.userId, userId));

  if (!wallet) {
    return NextResponse.json({ data: { balance: 0, transactions: [] } });
  }

  // Recalcular saldo baseado no Ledger Imutavel
  const allTransactions = await db.select()
    .from(transactions)
    .where(eq(transactions.walletId, wallet.id))
    .orderBy(asc(transactions.id));

  let balance = 0;
  let previousSignature: string | null = null;
  let isLedgerValid = true;

  for (const tx of allTransactions) {
    const expectedSignature = generateSignature(wallet.id, tx.amount.toString(), tx.type, previousSignature);
    
    if (tx.signature !== expectedSignature) {
      isLedgerValid = false;
      console.error(`Ledger adulterado detectado na transacao ID ${tx.id}`);
      break;
    }

    const amountNum = parseFloat(tx.amount);
    if (tx.type === 'deposit') {
      balance += amountNum;
    } else if (tx.type === 'withdraw') {
      balance -= amountNum;
    }

    previousSignature = tx.signature;
  }

  if (!isLedgerValid) {
    return NextResponse.json({ error: 'Integridade da carteira comprometida (Ledger Adulterado)' }, { status: 409 });
  }

  return NextResponse.json({ 
    data: { 
      balance,
      transactionsCount: allTransactions.length
    } 
  });
}

export async function POST(req: Request) {
  const auth = await authenticate(req);
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const userId = auth.user!.id;

  try {
    const body = await req.json();
    const parsed = transactionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
    }

    const { amount, type } = parsed.data;

    // Buscar ou criar a carteira do usuario
    let [wallet] = await db.select().from(wallets).where(eq(wallets.userId, userId));

    if (!wallet) {
      const [newWallet] = await db.insert(wallets).values({ userId }).returning();
      wallet = newWallet;
    }

    // Carregar transacoes para verificar saldo e pegar a ultima assinatura
    const allTransactions = await db.select()
      .from(transactions)
      .where(eq(transactions.walletId, wallet.id))
      .orderBy(asc(transactions.id));

    let balance = 0;
    let previousSignature: string | null = null;

    for (const tx of allTransactions) {
      const amountNum = parseFloat(tx.amount);
      if (tx.type === 'deposit') balance += amountNum;
      else if (tx.type === 'withdraw') balance -= amountNum;
      
      previousSignature = tx.signature;
    }

    // Regra de negocio: nao permitir saque sem saldo
    if (type === 'withdraw' && balance < amount) {
      return NextResponse.json({ error: 'Saldo insuficiente' }, { status: 400 });
    }

    // Gerar assinatura (HMAC) da nova transacao
    const amountStr = amount.toString();
    const signature = generateSignature(wallet.id, amountStr, type, previousSignature);

    // Inserir transacao (Append-only Ledger)
    await db.insert(transactions).values({
      walletId: wallet.id,
      amount: amountStr,
      type,
      signature
    });

    const newBalance = type === 'deposit' ? balance + amount : balance - amount;

    return NextResponse.json({ 
      data: { 
        balance: newBalance,
        message: 'Transacao registrada com sucesso no Ledger Imutavel' 
      } 
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Erro interno do servidor' }, { status: 500 });
  }
}
