import { IMobilityAdapter } from './mobility.adapter';
import { UnifiedRequest, ServiceProvider } from '../../types/wrapper.types';

export class BoltAdapter implements IMobilityAdapter {
  readonly provider = ServiceProvider.BOLT;

  private failureSimulationRate: number;

  constructor(failureSimulationRate: number = 0.5) {
    // Bolt fallback has a higher chance to fail in our mock, demonstrating the need for AI Concierge
    this.failureSimulationRate = failureSimulationRate;
  }

  async requestRide(request: UnifiedRequest): Promise<boolean> {
    console.log(`[BoltAdapter] Requesting ride for ${request.requestId}...`);
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const isSuccess = Math.random() > this.failureSimulationRate;
        if (isSuccess) {
          console.log(`[BoltAdapter] Ride ${request.requestId} accepted.`);
          resolve(true);
        } else {
          console.warn(`[BoltAdapter] Ride ${request.requestId} failed: HIGH_DEMAND_SURGE`);
          reject(new Error('HIGH_DEMAND_SURGE'));
        }
      }, 500);
    });
  }
}
