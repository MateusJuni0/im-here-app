export interface ServiceRequest {
  serviceId: string;
  payload: any;
}

export interface ServiceResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export class ServiceBroker {
  private registeredServices: Set<string> = new Set();

  constructor() {
    this.registerService('calendar_sync');
    this.registerService('email_parser');
    this.registerService('concierge_buffer');
  }

  registerService(serviceId: string) {
    this.registeredServices.add(serviceId);
  }

  async routeRequest(request: ServiceRequest): Promise<ServiceResponse> {
    if (!this.registeredServices.has(request.serviceId)) {
      return { success: false, error: 'Service not found or inactive.' };
    }
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: `Wrapper success: routed to ${request.serviceId} with ${JSON.stringify(request.payload)}`
        });
      }, 500);
    });
  }
}

export const globalBroker = new ServiceBroker();