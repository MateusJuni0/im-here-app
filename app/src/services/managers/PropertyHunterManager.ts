import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { VibeMeterManager } from './VibeMeterManager';

// Tipos de dados para propriedades de luxo
interface LuxuryProperty {
  id: string;
  title: string;
  price: number;
  area: 'Chiado' | 'Bairro Alto' | 'Belém' | 'Lapa' | 'Avenidas Novas'; // Adicionando mais áreas nobres
  location: {
    lat: number;
    lon: number;
  };
  provider: 'Idealista' | 'ZAP'; // Para simular as diferentes fontes
}

// Representa uma propriedade com seu score de Vibe
interface ScoredProperty {
  property: LuxuryProperty;
  vibeScore: number;
}

@injectable()
export class PropertyHunterManager {

  private vibeMeter: VibeMeterManager;

  // Propriedades de luxo simuladas em Lisboa
  private simulatedProperties: LuxuryProperty[] = [
    { id: 'idealista-1', title: 'Penthouse de Luxo com Vista Rio', price: 3500000, area: 'Chiado', location: { lat: 38.710, lon: -9.143 }, provider: 'Idealista' },
    { id: 'zap-1', title: 'Palacete Restaurado no Coração de Lisboa', price: 5000000, area: 'Lapa', location: { lat: 38.708, lon: -9.160 }, provider: 'ZAP' },
    { id: 'idealista-2', title: 'Apartamento de Design Exclusivo', price: 2800000, area: 'Avenidas Novas', location: { lat: 38.736, lon: -9.150 }, provider: 'Idealista' },
    { id: 'idealista-3', title: 'Loft Moderno perto de Galerias', price: 1900000, area: 'Bairro Alto', location: { lat: 38.712, lon: -9.145 }, provider: 'Idealista' },
    { id: 'zap-2', title: 'Moradia de Charme com Jardim Privado', price: 4200000, area: 'Belém', location: { lat: 38.697, lon: -9.201 }, provider: 'ZAP' },
  ];

  constructor(@inject(VibeMeterManager) vibeMeter: VibeMeterManager) {
    this.vibeMeter = vibeMeter;
    console.log('PropertyHunterManager initialized');
  }

  /**
   * Pilar 36: Motor de Prospecção Imobiliária VIP.
   * Busca imóveis de luxo e os pontua com base no VibeMeter.
   *
   * @param maxPrice O preço máximo desejado pelo cliente.
   * @returns Uma lista de propriedades pontuadas, ordenadas pelo VibeScore.
   */
  public async findHighVibeProperties(maxPrice: number): Promise<ScoredProperty[]> {
    console.log(`[PropertyHunter] Buscando imóveis de luxo até €${maxPrice.toLocaleString()}...`);

    // 1. Simulação da busca em portais (Idealista/ZAP)
    const availableProperties = this.simulatedProperties.filter(p => p.price <= maxPrice);
    console.log(`[PropertyHunter] Encontrados ${availableProperties.length} imóveis na faixa de preço.`);

    // 2. Pontuação com base na proximidade de "Vibe Alta"
    const scoredProperties: ScoredProperty[] = [];

    for (const prop of availableProperties) {
      // Para a simulação, consideramos apenas as áreas que o VibeMeter conhece
      if (prop.area === 'Chiado' || prop.area === 'Bairro Alto' || prop.area === 'Belém') {
        const vibeScore = await this.vibeMeter.getVibeScore(prop.area);
        scoredProperties.push({ property: prop, vibeScore });
        console.log(`[PropertyHunter] Imóvel '${prop.title}' na área '${prop.area}' pontuado com VibeScore: ${vibeScore}`);
      } else {
        // Para áreas não cobertas pelo VibeMeter, atribuímos um score base ou as ignoramos
        scoredProperties.push({ property: prop, vibeScore: 30 }); // Score base para Lapa, Avenidas Novas, etc.
         console.log(`[PropertyHunter] Imóvel '${prop.title}' na área '${prop.area}' com VibeScore base: 30 (área não monitorada)`);
      }
    }

    // 3. Ordenar os resultados pelo maior VibeScore
    const sortedProperties = scoredProperties.sort((a, b) => b.vibeScore - a.vibeScore);

    console.log('[PropertyHunter] Prospecção finalizada. Retornando imóveis ordenados por VibeScore.');
    return sortedProperties;
  }
}
