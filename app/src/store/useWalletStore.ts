import { create } from 'zustand';
import { TransactionPayload, HoldPayload } from '../services/managers/EliteWalletManager';

interface WalletState {
  balanceEur: number;
  transactions: TransactionPayload[];
  holds: HoldPayload[];
  
  // Ações
  setBalance: (amount: number) => void;
  deductBalance: (amount: number) => void;
  addBalance: (amount: number) => void;
  addTransaction: (transaction: TransactionPayload) => void;
  addHold: (hold: HoldPayload) => void;
  removeHold: (holdId: string) => void;
  
  // Computado (Saldo Disponível = Saldo Total - Retenções)
  getAvailableBalance: () => number;
}

export const useWalletStore = create<WalletState>((set, get) => ({
  balanceEur: 0,
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

  getAvailableBalance: () => {
    const { balanceEur, holds } = get();
    // Somar todas as cauções (Holds) ativas
    const totalHolds = holds.reduce((acc, hold) => acc + hold.amountEur, 0);
    // Saldo disponível para novas transações é o saldo em EUR menos as cauções ativas
    return balanceEur - totalHolds;
  }
}));
