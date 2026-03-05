/**
 * Live Menu Manager - Portugal Elite Ecosystem
 * Fase 3 (Shadow Intelligence)
 */

export interface DishExplanation {
  term: string;
  translation: string;
  eliteExplanation: string;
  allergens?: string[];
  pairing?: string;
}

export interface CouvertAlertResult {
  detected: boolean;
  message: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
}

export class LiveMenuManager {
  // Pilar 12: Base de dados de termos gastronómicos portugueses (VIP/Elite)
  private gastronomicDatabase: Record<string, DishExplanation> = {
    'alheira': {
      term: 'Alheira',
      translation: 'Traditional Game Sausage',
      eliteExplanation: 'A historically rich, garlic-infused smoked sausage originally crafted by Portuguese Jews during the Inquisition. In elite dining, it is often elevated with game meats like partridge or venison, served with a perfect quail egg and crispy greens.',
      pairing: 'A robust Douro Red or a structured Baga.'
    },
    'arroz de cabidela': {
      term: 'Arroz de Cabidela',
      translation: 'Blood Rice Stew',
      eliteExplanation: 'A bold, deeply savory culinary masterpiece. Free-range chicken is slow-cooked in its own blood with a touch of premium artisanal vinegar. A true connoisseur\'s dish that demands a sophisticated palate.',
      pairing: 'Vinho Verde Tinto (traditional) or an elegant Dão Red.'
    },
    'francesinha': {
      term: 'Francesinha',
      translation: 'Little Frenchie Sandwich',
      eliteExplanation: 'Porto\'s legendary decadent indulgence. An architectural marvel of cured meats, premium steak, and artisan sausage, draped in melted cheese and submerged in a complex, secret beer-and-tomato sauce. An absolute must for luxury comfort dining.',
      pairing: 'A premium craft IPA or a chilled Super Bock Stout.'
    },
    'bacalhau à brás': {
      term: 'Bacalhau à Brás',
      translation: 'Brás-style Salt Cod',
      eliteExplanation: 'The quintessential Portuguese comfort food refined to perfection. Flawlessly shredded premium salted cod folded into delicate, golden straw potatoes and creamy, free-range scrambled eggs, finished with fresh parsley and highly-prized black olives.',
      pairing: 'A crisp, oak-aged Alvarinho.'
    },
    'percebes': {
      term: 'Percebes',
      translation: 'Goose Barnacles',
      eliteExplanation: 'The diamond of the sea. Harvested at great risk from the crashing waves of the Atlantic cliffs. They offer an unadulterated, intense burst of pure ocean flavor. Served simply to honor their extreme rarity and danger of procurement.',
      pairing: 'A premium crisp, icy Vinho Verde.'
    }
  };

  /**
   * Pilar 12 (Live Menu AI): Tradução e explicação
   * @param menuText O texto do menu ou nome do prato detectado via OCR/Câmera.
   * @returns A explicação VIP/Elite se encontrada, ou null.
   */
  public analyzeDish(menuText: string): DishExplanation | null {
    const normalizedText = menuText.toLowerCase().trim();
    
    // Direct match
    if (this.gastronomicDatabase[normalizedText]) {
      return this.gastronomicDatabase[normalizedText];
    }

    // Partial match for robustness
    for (const [key, explanation] of Object.entries(this.gastronomicDatabase)) {
      if (normalizedText.includes(key)) {
        return explanation;
      }
    }

    return null;
  }

  /**
   * Pilar 13 (Alerta de Couvert): Detecção de cobranças de couvert não solicitadas
   * @param receiptOrMenuItems Lista de itens na fatura ou na mesa.
   * @param userRequestedCouvert Booleano indicando se o usuário de fato pediu o couvert.
   * @returns O resultado da análise do couvert.
   */
  public checkCouvertAlert(receiptOrMenuItems: string[], userRequestedCouvert: boolean = false): CouvertAlertResult {
    const couvertKeywords = ['couvert', 'pão', 'manteiga', 'azeitonas', 'pao', 'azeite', 'paté', 'pate'];
    
    let couvertDetected = false;

    for (const item of receiptOrMenuItems) {
      const normalizedItem = item.toLowerCase();
      if (couvertKeywords.some(keyword => normalizedItem.includes(keyword))) {
        couvertDetected = true;
        break;
      }
    }

    if (couvertDetected && !userRequestedCouvert) {
      return {
        detected: true,
        riskLevel: 'HIGH',
        message: '⚠️ Alerta de Couvert (Shadow Intelligence): Detectamos itens de couvert na sua mesa/fatura que não foram solicitados. Em Portugal, é ilegal cobrar por couverts que não foram expressamente pedidos ou consumidos. Sinta-se à vontade para recusar e pedir a remoção da conta.'
      };
    }

    return {
      detected: couvertDetected,
      riskLevel: 'LOW',
      message: couvertDetected 
        ? 'Couvert legítimo detectado (solicitado pelo usuário).' 
        : 'Nenhuma cobrança de couvert detectada.'
    };
  }
}
