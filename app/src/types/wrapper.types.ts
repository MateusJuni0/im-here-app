export const ServiceProvider = {
  UBER: 'UBER',
  BOLT: 'BOLT',
  IFOOD: 'IFOOD',
  THEFORK: 'THEFORK',
  CONCIERGE: 'CONCIERGE',
  TAP: 'TAP',
  EMIRATES: 'EMIRATES',
  NETJETS: 'NETJETS'
} as const;
export type ServiceProvider = typeof ServiceProvider[keyof typeof ServiceProvider];

export const RequestStatus = {
  PENDING: 'PENDING',
  ROUTING: 'ROUTING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
} as const;
export type RequestStatus = typeof RequestStatus[keyof typeof RequestStatus];

export interface RidePayload {
  origin: string;
  destination: string;
  vehicleType: 'LUXURY' | 'SUV' | 'PREMIUM';
}

export interface FoodPayload {
  restaurantId: string;
  items: any[];
}

export interface ReservationPayload {
  restaurantId: string;
  date: Date;
  pax: number;
}

export interface UnifiedRequest {
  requestId: string;
  userId: string;
  type: 'RIDE' | 'FOOD_DELIVERY' | 'RESTAURANT_RESERVATION';
  payload: RidePayload | FoodPayload | ReservationPayload;
  status: RequestStatus;
  activeProvider?: ServiceProvider;
  createdAt: Date;
}

export interface ConciergeTask {
  taskId: string;
  referenceRequestId: string;
  failureReason: string;
  severity: 'NORMAL' | 'URGENT' | 'CRITICAL';
  aiAgentAssigned: boolean;
  resolutionStrategy: 'WEB_SCRAPING' | 'PHONE_CALL_SYNTHESIS' | 'HUMAN_ESCALATION';
  status: 'QUEUED' | 'PROCESSING' | 'RESOLVED' | 'ESCALATED';
}

export interface WalletTransaction {
  transactionId: string;
  userId: string;
  serviceRequestId: string;
  amount: number;
  currency: 'EUR';
  status: 'PRE_AUTHORIZED' | 'CAPTURED' | 'REFUNDED';
  internalPaymentMethodId: string;
}

export interface TravelRequest {
  travelId: string;
  userId: string;
  type: 'FLIGHT' | 'STAY' | 'PACKAGE';
  preferences: {
    flightType?: 'COMMERCIAL_FIRST_CLASS' | 'PRIVATE_JET' | 'HELICOPTER';
    stayType?: 'VILLA' | 'PENTHOUSE' | 'BOUTIQUE_HOTEL';
    specialRequests: string[];
  };
  itinerary: {
    origin?: string;
    destination: string;
    dates: { start: Date; end: Date };
    pax: number;
  };
  proposals: TravelProposal[];
  status: 'GATHERING_OPTIONS' | 'AWAITING_APPROVAL' | 'BOOKED';
}

export interface TravelProposal {
  proposalId: string;
  totalCost: number;
  description: string;
  providerDetails: any;
  isApproved: boolean;
}
