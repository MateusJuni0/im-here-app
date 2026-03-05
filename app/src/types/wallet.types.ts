export type TransactionType = 'UBER' | 'BOLT' | 'FLIGHT' | 'DEPOSIT' | 'WITHDRAWAL';
export type Currency = 'EUR' | 'USD' | 'GBP';

export interface TransactionPayload {
  id: string;
  type: TransactionType;
  amountForeign: number;
  currencyForeign: Currency;
  exchangeRate: number; // Conversion rate to EUR
  amountEur: number;    // Processed amount in EUR
  description: string;
  date: string;
}

export interface HoldPayload {
  id: string;
  amountEur: number;
  reason: string;
  expiresAt: string;
}
