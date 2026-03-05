import { useWalletStore } from '../../store/useWalletStore';

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

export class EliteWalletManager {
  /**
   * Pilar 26: Currency Ghosting
   * O sistema permite visualizar o preço em moeda estrangeira (USD/GBP)
   * mas processa obrigatoriamente em EUR.
   */
  static calculateProcessableAmount(amount: number, currency: Currency, exchangeRate: number): number {
    if (currency === 'EUR') return amount;
    return amount * exchangeRate;
  }

  /**
   * Processa transações unificadas (Uber, Bolt, Voos)
   */
  static processTransaction(
    type: TransactionType, 
    amountForeign: number, 
    currencyForeign: Currency, 
    exchangeRate: number,
    description: string
  ): TransactionPayload {
    // Processamento sempre em EUR (Currency Ghosting)
    const amountEur = this.calculateProcessableAmount(amountForeign, currencyForeign, exchangeRate);
    
    const store = useWalletStore.getState();
    const availableBalance = store.getAvailableBalance();

    if (availableBalance < amountEur) {
      throw new Error(`Saldo disponível insuficiente. Necessário: €${amountEur.toFixed(2)}, Disponível: €${availableBalance.toFixed(2)}`);
    }

    const transaction: TransactionPayload = {
      id: Math.random().toString(36).substring(2, 10),
      type,
      amountForeign,
      currencyForeign,
      exchangeRate,
      amountEur,
      description,
      date: new Date().toISOString()
    };

    store.deductBalance(amountEur);
    store.addTransaction(transaction);

    return transaction;
  }

  /**
   * Criação de 'Hold' (bloqueio de valor para caução)
   */
  static placeHold(amountEur: number, reason: string, durationHours: number = 24): HoldPayload {
    const store = useWalletStore.getState();
    const availableBalance = store.getAvailableBalance();

    if (availableBalance < amountEur) {
      throw new Error("Saldo disponível insuficiente para realizar o Hold/Caução.");
    }

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + durationHours);

    const hold: HoldPayload = {
      id: Math.random().toString(36).substring(2, 10),
      amountEur,
      reason,
      expiresAt: expiresAt.toISOString()
    };

    store.addHold(hold);
    return hold;
  }

  /**
   * Liberação de 'Hold'
   */
  static releaseHold(holdId: string): void {
    const store = useWalletStore.getState();
    store.removeHold(holdId);
  }
}
