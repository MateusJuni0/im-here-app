import { UnifiedRequest, ServiceProvider } from '../../types/wrapper.types';

export interface IMobilityAdapter {
  readonly provider: ServiceProvider;
  
  /**
   * Attempts to fulfill a mobility request
   * @param request The unified request detailing the ride parameters
   * @returns A promise that resolves to true if successful, false or throws if failed
   */
  requestRide(request: UnifiedRequest): Promise<boolean>;
}
