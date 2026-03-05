import { IMobilityAdapter } from './mobility.adapter';
import { UnifiedRequest, ServiceProvider } from '../../types/wrapper.types';

export class UberAdapter implements IMobilityAdapter {
  readonly provider = ServiceProvider.UBER;

  private failureSimulationRate: number;

  constructor(failureSimulationRate: number = 0.3) {
    this.failureSimulationRate = failureSimulationRate;
  }

  async requestRide(request: UnifiedRequest): Promise<boolean> {
    console.log(`[UberAdapter] Requesting ride for ${request.requestId}...`);
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const isSuccess = Math.random() > this.failureSimulationRate;
        if (isSuccess) {
          console.log(`[UberAdapter] Ride ${request.requestId} accepted.`);
          resolve(true);
        } else {
          console.warn(`[UberAdapter] Ride ${request.requestId} failed: NO_DRIVERS_AVAILABLE`);
          reject(new Error('NO_DRIVERS_AVAILABLE'));
        }
      }, 500);
    });
  }
}
