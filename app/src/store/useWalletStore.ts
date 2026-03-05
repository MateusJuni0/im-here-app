import { create } from 'zustand';
import type { TransactionPayload, HoldPayload } from '../services/managers/EliteWalletManager';

export type EliteStatus = 'Silver' | 'Gold' | 'Diamond';

interface WalletState {
  balanceEur: number;
  elitePoints: number;
  status: EliteStatus;
  transactions: TransactionPayload[];
  holds: HoldPayload[];
  
  // Ações
  setBalance: (amount: number) => void;
  deductBalance: (amount: number) => void;
  addBalance: (amount: number) => void;
  addTransaction: (transaction: TransactionPayload) => void;
  addHold: (hold: HoldPayload) => void;
  removeHold: (holdId: string) => void;
  
  addElitePoints: (points: number) => void;

  // Computado (Saldo Disponível = Saldo Total - Retenções)
  getAvailableBalance: () => number;
}

const calculateStatus = (points: number): EliteStatus => {
  if (points >= 5000) return 'Diamond';
  if (points >= 1000) return 'Gold';
  return 'Silver';
};

export const useWalletStore = create<WalletState>((set, get) => ({
  balanceEur: 0,
  elitePoints: 0,
  status: 'Silver',
  transactions: [],
  holds: [],

  setBalance: (amount: number) => set({ balanceEur: amount }),
  
  deductBalance: (amount: number) => set((state) => ({ 
    balanceEur: state.balanceEur - amount 
  })),
  
  addBalance: (amount: number) => set((state) => ({ 
    balanceEur: state.balanceEur + amount 
  })),

  addTransaction: (transaction: TransactionPayload) => set((state) => ({
    transactions: [transaction, ...state.transactions]
  })),

  addHold: (hold: HoldPayload) => set((state) => ({
    holds: [...state.holds, hold]
  })),

  removeHold: (holdId: string) => set((state) => ({
    holds: state.holds.filter(h => h.id !== holdId)
  })),

  addElitePoints: (points: number) => set((state) => {
    const newPoints = state.elitePoints + points;
    return {
      elitePoints: newPoints,
      status: calculateStatus(newPoints)
    };
  }),

  getAvailableBalance: () => {
    const { balanceEur, holds } = get();
    // Somar todas as cauções (Holds) ativas
    const totalHolds = holds.reduce((acc, hold) => acc + hold.amountEur, 0);
    // Saldo disponível para novas transações é o saldo em EUR menos as cauções ativas
    return balanceEur - totalHolds;
  }
}));
