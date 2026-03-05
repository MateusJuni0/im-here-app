import { ConciergeBufferManager } from './services/managers/ConciergeBufferManager';
import { UberAdapter } from './services/adapters/uber.adapter';
import { BoltAdapter } from './services/adapters/bolt.adapter';
import { UnifiedRequest, RequestStatus } from './types/wrapper.types';

async function test() {
  const manager = new ConciergeBufferManager([
    new UberAdapter(0.8), // 80% failure rate to trigger bolt
    new BoltAdapter(0.9)  // 90% failure rate to trigger concierge
  ]);

  const request: UnifiedRequest = {
    requestId: 'R-' + Date.now(),
    userId: 'USER-123',
    type: 'RIDE',
    payload: {
      origin: 'Lisbon Airport',
      destination: 'Hotel Ritz',
      vehicleType: 'LUXURY'
    },
    status: RequestStatus.PENDING,
    createdAt: new Date()
  };

  const finalReq = await manager.processMobilityRequest(request);
  console.log('Final Request Status:', finalReq.status);
  console.log('Concierge Queue:', manager.getQueue());
}

test();
