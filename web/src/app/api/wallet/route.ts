import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { db } from '../../../db';
import { wallets, transactions } from '../../../db/schema';
import { eq } from 'drizzle-orm';

const app = new Hono();

const transactionSchema = z.object({
  amount: z.number().positive("O valor deve ser positivo"),
  type: z.enum(['withdraw', 'deposit']),
  userId: z.string(),
});

app.get('/:userId', async (c) => {
  const userId = c.req.param('userId');

  const [wallet] = await db.select().from(wallets).where(eq(wallets.userId, userId));

  if (!wallet) {
    return c.json({ data: null, error: 'Carteira não encontrada' }, 404);
  }

  return c.json({ data: { balance: wallet.balance }, error: null });
});

app.post('/', zValidator('json', transactionSchema), async (c) => {
  const { amount, type, userId } = c.req.valid('json');

  const [wallet] = await db.select().from(wallets).where(eq(wallets.userId, userId));

  if (!wallet) {
    // Create a new wallet if it doesn't exist
    const [newWallet] = await db.insert(wallets).values({ userId, balance: '0' }).returning();
    if (type === 'withdraw') {
      return c.json({ data: null, error: 'Saldo insuficiente' }, 400);
    }
    const newBalance = amount;
    await db.update(wallets).set({ balance: newBalance.toString() }).where(eq(wallets.id, newWallet.id));
    await db.insert(transactions).values({ walletId: newWallet.id, amount: amount.toString(), type });
    return c.json({ data: { balance: newBalance, message: 'Depósito realizado com sucesso' }, error: null });
  }

  let newBalance = parseFloat(wallet.balance);

  if (type === 'withdraw') {
    if (newBalance < amount) {
      return c.json({ data: null, error: 'Saldo insuficiente' }, 400);
    }
    newBalance -= amount;
  } else if (type === 'deposit') {
    newBalance += amount;
  }

  await db.update(wallets).set({ balance: newBalance.toString() }).where(eq(wallets.id, wallet.id));
  await db.insert(transactions).values({ walletId: wallet.id, amount: amount.toString(), type });

  return c.json({ data: { balance: newBalance, message: 'Transação realizada com sucesso' }, error: null });
});

export default app;
