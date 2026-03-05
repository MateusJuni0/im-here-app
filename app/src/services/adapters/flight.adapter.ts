import type { TravelRequest } from '../../types/wrapper.types';
import { ServiceProvider } from '../../types/wrapper.types';

export interface IFlightAdapter {
  readonly provider: ServiceProvider;
  
  /**
   * Attempts to fulfill a flight request or resolve a flight cancellation
   * @param request The travel request detailing the flight parameters
   * @returns A promise that resolves to true if successful, false or throws if failed
   */
  requestFlight(request: TravelRequest): Promise<boolean>;
}
