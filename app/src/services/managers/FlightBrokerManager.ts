import type { 
  TravelRequest 
} from '../../types/wrapper.types';
import { ServiceProvider } from '../../types/wrapper.types';
import type { IFlightAdapter } from '../adapters/flight.adapter';
import { ConciergeBufferManager } from './ConciergeBufferManager';

export class FlightBrokerManager {
  private adapters: Map<ServiceProvider, IFlightAdapter>;
  private conciergeBuffer: ConciergeBufferManager;

  constructor(adapters: IFlightAdapter[], conciergeBuffer: ConciergeBufferManager) {
    this.adapters = new Map();
    adapters.forEach(adapter => {
      this.adapters.set(adapter.provider, adapter);
    });
    this.conciergeBuffer = conciergeBuffer;
  }

  /**
   * Processes a flight request by trying preferred airline providers.
   * If a flight is canceled or unavailable, it tries the next available route/provider.
   * If all fail, it escalates to the Concierge Buffer.
   */
  async processFlightRequest(request: TravelRequest, strategy: ServiceProvider[]): Promise<TravelRequest> {
    request.status = 'GATHERING_OPTIONS';
    console.log(`[FlightBroker] Processing flight request ${request.travelId}`);

    let lastError: Error | null = null;

    for (const providerId of strategy) {
      const adapter = this.adapters.get(providerId);
      if (!adapter) continue;

      try {
        const success = await adapter.requestFlight(request);
        
        if (success) {
          request.status = 'BOOKED';
          console.log(`[FlightBroker] Request ${request.travelId} successfully booked by ${providerId}`);
          return request;
        }
      } catch (error: any) {
        lastError = error;
        console.warn(`[FlightBroker] Provider ${providerId} failed for flight ${request.travelId}: ${error.message}. Searching for redundant route...`);
      }
    }

    // All strategic providers failed, triggering the Concierge Buffer fallback for critical travel disruption
    console.error(`[FlightBroker] All commercial/charter providers failed for ${request.travelId}. Escalating to Concierge Buffer for alternative transport.`);
    
    // Status can remain gathering options or escalate
    request.status = 'AWAITING_APPROVAL';

    this.conciergeBuffer.escalateToConcierge(
      request.travelId, 
      lastError?.message || 'ALL_FLIGHT_PROVIDERS_FAILED_OR_CANCELED',
      'CRITICAL'
    );
    
    return request;
  }
}
