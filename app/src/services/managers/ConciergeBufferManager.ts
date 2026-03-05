import type { 
  UnifiedRequest, 
  ConciergeTask 
} from '../../types/wrapper.types';
import { 
  RequestStatus, 
  ServiceProvider 
} from '../../types/wrapper.types';
import type { IMobilityAdapter } from '../adapters/mobility.adapter';

export class ConciergeBufferManager {
  private adapters: Map<ServiceProvider, IMobilityAdapter>;
  private conciergeQueue: ConciergeTask[];

  constructor(adapters: IMobilityAdapter[]) {
    this.adapters = new Map();
    adapters.forEach(adapter => {
      this.adapters.set(adapter.provider, adapter);
    });
    this.conciergeQueue = [];
  }

  /**
   * Processes a mobility request by trying preferred providers and falling back to Concierge Buffer.
   */
  async processMobilityRequest(request: UnifiedRequest): Promise<UnifiedRequest> {
    request.status = RequestStatus.ROUTING;
    console.log(`[Manager] Processing request ${request.requestId}`);

    const strategy = [ServiceProvider.UBER, ServiceProvider.BOLT];
    let lastError: Error | null = null;

    for (const providerId of strategy) {
      const adapter = this.adapters.get(providerId);
      if (!adapter) continue;

      try {
        request.activeProvider = providerId;
        const success = await adapter.requestRide(request);
        
        if (success) {
          request.status = RequestStatus.IN_PROGRESS;
          console.log(`[Manager] Request ${request.requestId} handled by ${providerId}`);
          return request;
        }
      } catch (error: any) {
        lastError = error;
        console.warn(`[Manager] Provider ${providerId} failed for request ${request.requestId}: ${error.message}`);
      }
    }

    // Both failed, triggering the Concierge Buffer fallback
    console.error(`[Manager] Tier 1 providers failed for ${request.requestId}. Escalating to Concierge Buffer.`);
    request.status = RequestStatus.FAILED;
    request.activeProvider = undefined;

    this.escalateToConcierge(request.requestId, lastError?.message || 'ALL_PROVIDERS_FAILED', 'URGENT');
    
    return request;
  }

  /**
   * Adds the failed request to the Concierge Buffer queue for AI/Human resolution.
   */
  public escalateToConcierge(requestId: string, reason: string, severity: 'NORMAL' | 'URGENT' | 'CRITICAL' = 'URGENT'): ConciergeTask {
    const task: ConciergeTask = {
      taskId: `CT-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      referenceRequestId: requestId,
      failureReason: reason,
      severity,
      aiAgentAssigned: true, // We assume AI takes it first
      resolutionStrategy: 'PHONE_CALL_SYNTHESIS', // e.g., calling local VIP driver/flight services
      status: 'QUEUED'
    };

    this.conciergeQueue.push(task);
    console.log(`[ConciergeBuffer] Task ${task.taskId} created and queued for request ${requestId}. Strategy: ${task.resolutionStrategy}`);
    
    return task;
  }

  public getQueue(): ConciergeTask[] {
    return this.conciergeQueue;
  }
}
