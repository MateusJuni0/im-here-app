# FASE 2: The Wrapper (Pilares 5 a 10) - Arquitetura e Contratos

## 1. Visão Geral da Arquitetura

O "Wrapper" age como uma camada de abstração (Facade) sobre múltiplos serviços do mundo real. O utilizador Elite nunca interage com o Uber, Booking ou companhias aéreas diretamente. Ele faz pedidos em linguagem natural ou interface simplificada ao sistema, e o Backend (Valkyrie) orquestra tudo.

**Componentes Principais:**
1. **Gateway de Serviços (Unified Interface):** Roteador que decide qual API de terceiros chamar (Uber, Bolt, etc.).
2. **Elite Wallet (Ledger):** Serviço de custódia e pagamento unificado. O utilizador aprova uma vez, o Wrapper paga aos provedores usando cartões corporativos ou contas empresariais geridas pela plataforma.
3. **Concierge Buffer (Redundância):** Fila de fallback gerida por IA (e humanos em último caso). Se uma API externa falhar, a Valkyrie assume a resolução (ex: liga para um restaurante se a API do TheFork falhar).

---

## 2. Contratos Técnicos (TypeScript Interfaces)

### Pilar 5: Interface Única (Mobilidade & Lifestyle)
```typescript
export enum ServiceProvider {
  UBER = 'UBER',
  BOLT = 'BOLT',
  IFOOD = 'IFOOD',
  THEFORK = 'THEFORK',
  CONCIERGE = 'CONCIERGE' // Fallback
}

export enum RequestStatus {
  PENDING = 'PENDING',
  ROUTING = 'ROUTING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
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
```

### Pilar 6: Concierge Buffer (Redundância IA)
O Buffer é acionado quando `UnifiedRequest` atinge um timeout ou erro nas APIs de tier 1.
```typescript
export interface ConciergeTask {
  taskId: string;
  referenceRequestId: string;
  failureReason: string; // Ex: "NO_DRIVERS_AVAILABLE", "API_TIMEOUT"
  severity: 'NORMAL' | 'URGENT' | 'CRITICAL';
  aiAgentAssigned: boolean;
  resolutionStrategy: 'WEB_SCRAPING' | 'PHONE_CALL_SYNTHESIS' | 'HUMAN_ESCALATION';
  status: 'QUEUED' | 'PROCESSING' | 'RESOLVED' | 'ESCALATED';
}
```

### Pilar 7: Elite Wallet (Pagamento Único)
```typescript
export interface WalletTransaction {
  transactionId: string;
  userId: string;
  serviceRequestId: string;
  amount: number;
  currency: 'EUR'; // Standardizado
  status: 'PRE_AUTHORIZED' | 'CAPTURED' | 'REFUNDED';
  internalPaymentMethodId: string; // Cartão virtual corporativo usado no provedor
}
```

### Pilares 9 e 10: Aggregator & Flight Broker
```typescript
export interface TravelRequest {
  travelId: string;
  userId: string;
  type: 'FLIGHT' | 'STAY' | 'PACKAGE';
  preferences: {
    flightType?: 'COMMERCIAL_FIRST_CLASS' | 'PRIVATE_JET' | 'HELICOPTER';
    stayType?: 'VILLA' | 'PENTHOUSE' | 'BOUTIQUE_HOTEL';
    specialRequests: string[]; // Ex: "Sem escalas", "Chef privado"
  };
  itinerary: {
    origin?: string;
    destination: string;
    dates: { start: Date; end: Date };
    pax: number;
  };
  proposals: TravelProposal[]; // Valkyrie gera 2-3 opções para o utilizador aprovar
  status: 'GATHERING_OPTIONS' | 'AWAITING_APPROVAL' | 'BOOKED';
}

export interface TravelProposal {
  proposalId: string;
  totalCost: number;
  description: string;
  providerDetails: any; // Oculto do utilizador
  isApproved: boolean;
}
```

---

## 3. Fluxos de Integração & Concierge Buffer (Técnico)

### Fluxo de um Pedido Normal (Ex: Transporte)
1. **User Intent:** Utilizador pede "Quero ir para o restaurante X agora".
2. **Valkyrie Parser:** Converte a intenção num `UnifiedRequest` (type: RIDE).
3. **Gateway Strategy:** Consulta Uber API.
4. **Wallet:** Faz lock (Pre-auth) de 150€ na `Elite Wallet`.
5. **Success:** Uber confirma. Estado muda para `IN_PROGRESS`.

### Fluxo de Falha e Acionamento do Concierge Buffer (Redundância)
1. Uber API falha (ou não há carros de luxo disponíveis).
2. O Router apanha o erro e tenta Bolt API (Retry Policy).
3. Bolt falha. O sistema não diz "Não é possível" ao cliente.
4. **Gatilho de Redundância:** Cria uma `ConciergeTask`.
5. **AI Resolution:** A Valkyrie (usando ferramentas browser/web scraping ou chamadas telefónicas via Twilio/Vapi) tenta contactar serviços de motorista privado locais VIP.
6. **Escalation (Último recurso):** Se a IA não resolver em 3 minutos, um operador humano de Concierge recebe o alerta no seu dashboard para garantir o serviço manualmente.
7. O utilizador na app vê apenas: "A organizar transporte premium..." (A complexidade é invisível).

### Fluxo de Pagamento Unificado (Elite Wallet)
- O utilizador NUNCA insere o seu cartão de crédito na Uber ou no Booking.
- O Wrapper gera **Cartões Virtuais (VCC - Virtual Credit Cards)** via Stripe Issuing ou Adyen para cada serviço no backend.
- O utilizador paga um *retainer* mensal ou aprova débitos globais na sua conta principal.
- Quando o Booking cobra, cobra o VCC da plataforma. A Valkyrie debita a `Elite Wallet` do utilizador com uma taxa de serviço (se aplicável), consolidando tudo numa fatura única mensal.