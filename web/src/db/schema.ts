import { pgTable, serial, text, decimal, timestamp, varchar } from 'drizzle-orm/pg-core';

export const wallets = pgTable('wallets', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull().unique(),
  balance: decimal('balance', { precision: 19, scale: 4 }).notNull().default('0'),
});

export const transactions = pgTable('transactions', {
  id: serial('id').primaryKey(),
  walletId: serial('wallet_id').references(() => wallets.id),
  amount: decimal('amount', { precision: 19, scale: 4 }).notNull(),
  type: varchar('type', { length: 256 }).notNull(), // 'withdraw' or 'deposit'
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
