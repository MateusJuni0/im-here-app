// /web/app/api/treasury/quantum-treasury/route.ts

import { NextResponse } from 'next/server';
import { z } from 'zod';

// Zod schema for tax optimization analysis
const quantumTreasurySchema = z.object({
  expatProfile: z.object({
    countryOfOrigin: z.string().length(2, "Código do país deve ter 2 caracteres (ISO 3166-1 alpha-2)"),
    fiscalResidency: z.string().length(2).default('PT'),
    annualIncome: z.number().positive("Rendimento anual deve ser positivo"),
    professionalCategory: z.string().min(3, "Categoria profissional é obrigatória"),
    isRNH: z.boolean().default(false), // Residente Não Habitual
  }),
  investmentPortfolio: z.record(z.number()).optional(), // Ex: { "stocks": 50000, "real_estate": 150000 }
});

/**
 * @swagger
 * /api/treasury/quantum-treasury:
 *   post:
 *     summary: Realiza uma análise de otimização fiscal para expatriados.
 *     description: Com base no perfil fiscal de um expatriado, o serviço calcula e sugere estratégias de otimização fiscal em Portugal.
 *     tags: [Treasury]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               expatProfile:
 *                 type: object
 *                 properties:
 *                   countryOfOrigin:
 *                     type: string
 *                     example: "US"
 *                   annualIncome:
 *                     type: number
 *                     example: 120000
 *                   professionalCategory:
 *                     type: string
 *                     example: "Software Engineer"
 *                   isRNH:
 *                     type: boolean
 *                     example: true
 *               investmentPortfolio:
 *                 type: object
 *                 example: { "stocks": 50000, "crypto": 25000 }
 *     responses:
 *       200:
 *         description: Análise fiscal concluída.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 analysisId:
 *                   type: string
 *                   format: uuid
 *                 summary:
 *                   type: object
 *       400:
 *         description: Dados de entrada inválidos.
 *       500:
 *         description: Erro interno do servidor.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = quantumTreasurySchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ success: false, errors: validation.error.issues }, { status: 400 });
    }

    const { expatProfile } = validation.data;
    const analysisId = crypto.randomUUID();

    // Lógica de simulação de otimização fiscal
    // Esta é uma simplificação. A lógica real seria extremamente complexa.
    let taxRate = 0.48; // Taxa padrão alta
    let suggestions = [];

    if (expatProfile.isRNH) {
      taxRate = 0.20; // Taxa fixa para RNH
      suggestions.push("Aplicar regime de Residente Não Habitual (RNH) para taxa de IRS de 20%.");
    }

    if (expatProfile.annualIncome > 80000 && expatProfile.professionalCategory.toLowerCase().includes('engineer')) {
        suggestions.push("Considerar benefícios fiscais para profissões de alto valor acrescentado.");
    }
    
    const estimatedTax = expatProfile.annualIncome * taxRate;

    const summary = {
        applicableRegime: expatProfile.isRNH ? "Residente Não Habitual (RNH)" : "Padrão",
        estimatedTaxableIncome: expatProfile.annualIncome,
        estimatedTaxRate: taxRate,
        estimatedTaxAmount: parseFloat(estimatedTax.toFixed(2)),
        optimizationSuggestions: suggestions,
    };

    console.log(`[QUANTUM TREASURY] Análise gerada: ${analysisId}`, summary);

    return NextResponse.json({
      success: true,
      analysisId,
      summary
    });

  } catch (error) {
    console.error('[API Error] Quantum Treasury:', error);
    return NextResponse.json({ success: false, message: "Erro interno do servidor." }, { status: 500 });
  }
}

// Auditado por Dante: OK