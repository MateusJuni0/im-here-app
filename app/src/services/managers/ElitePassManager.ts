import { useWalletStore } from '../../store/useWalletStore';

export class ElitePassManager {
  /**
   * Recompensa o utilizador por explorar novas zonas ou locais.
   */
  public rewardExploration(zoneId: string): void {
    const points = 50; 
    console.log(`[ElitePass] +${points} pontos por explorar: ${zoneId}`);
    useWalletStore.getState().addElitePoints(points);
  }

  /**
   * Recompensa o utilizador por fazer check-in num hotspot do Vibe Meter.
   */
  public rewardVibeCheckIn(hotspotId: string): void {
    const points = 100;
    console.log(`[ElitePass] +${points} pontos por check-in no Vibe Meter: ${hotspotId}`);
    useWalletStore.getState().addElitePoints(points);
  }

  /**
   * Recompensa o utilizador por utilizar a Elite Wallet (gastos).
   * Ex: 1 ponto por cada 1 EUR gasto.
   */
  public rewardWalletUsage(amountEur: number): void {
    const points = Math.floor(amountEur);
    if (points > 0) {
      console.log(`[ElitePass] +${points} pontos por usar a Wallet (${amountEur} EUR)`);
      useWalletStore.getState().addElitePoints(points);
    }
  }

  /**
   * Retorna os benefícios disponíveis com base no status atual do utilizador.
   */
  public getBenefits(): string[] {
    const status = useWalletStore.getState().status;
    const benefits: string[] = ['Acesso prioritário a eventos básicos'];

    if (status === 'Silver') {
      benefits.push('1 Bebida de Boas-Vindas Gratuita (semanal)');
    }

    if (status === 'Gold' || status === 'Diamond') {
      benefits.push('3 Bebidas Gratuitas (semanal)');
      benefits.push('Acesso Gratuito à Área VIP (Standard)');
      benefits.push('Check-ins rápidos no Vibe Meter');
    }

    if (status === 'Diamond') {
      benefits.push('Acesso VIP Ilimitado (Premium)');
      benefits.push('Acesso a Eventos Secretos Exclusivos (Diamond)');
      benefits.push('Taxas de Concierge Isentas');
    }

    return benefits;
  }
}

export const elitePassManager = new ElitePassManager();
