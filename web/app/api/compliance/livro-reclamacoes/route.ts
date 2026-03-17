// /web/app/api/compliance/livro-reclamacoes/route.ts

import { NextResponse } from 'next/server';
import { z } from 'zod';

// Zod schema for input validation
const complaintSchema = z.object({
  claimantName: z.string().min(3, "Nome do reclamante é obrigatório"),
  claimantAddress: z.string().min(10, "Endereço do reclamante é obrigatório"),
  claimantEmail: z.string().email("Email inválido"),
  complaintDetails: z.string().min(20, "Os detalhes da reclamação são obrigatórios"),
  serviceId: z.string().uuid("ID de serviço inválido"),
});

/**
 * @swagger
 * /api/compliance/livro-reclamacoes:
 *   post:
 *     summary: Submete uma reclamação ao Livro de Reclamações Eletrónico.
 *     description: Valida e processa uma reclamação para integração com o sistema oficial do Livro de Reclamações Eletrónico.
 *     tags: [Compliance]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               claimantName:
 *                 type: string
 *                 example: "João Silva"
 *               claimantAddress:
 *                 type: string
 *                 example: "Rua Exemplo, 123, Lisboa"
 *               claimantEmail:
 *                 type: string
 *                 example: "joao.silva@example.com"
 *               complaintDetails:
 *                 type: string
 *                 example: "O serviço prestado não correspondeu ao que foi anunciado."
 *               serviceId:
 *                 type: string
 *                 format: uuid
 *                 example: "a1b2c3d4-e5f6-7890-1234-567890abcdef"
 *     responses:
 *       200:
 *         description: Reclamação submetida com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Reclamação recebida e em processamento."
 *                 complaintId:
 *                   type: string
 *                   format: uuid
 *       400:
 *         description: Erro de validação nos dados de entrada.
 *       500:
 *         description: Erro interno do servidor.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = complaintSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ success: false, errors: validation.error.issues }, { status: 400 });
    }

    // Lógica para integrar com o serviço do Livro de Reclamações Eletrónico
    // (ex: enviar os dados para a API oficial)
    // Por agora, apenas simulamos o sucesso.

    const complaintId = crypto.randomUUID(); // Gerar um ID único para a reclamação

    console.log(`[LIVRO RECLAMAÇÕES] Reclamação recebida: ${complaintId}`, validation.data);

    return NextResponse.json({ 
      success: true, 
      message: "Reclamação recebida e em processamento.",
      complaintId 
    });

  } catch (error) {
    console.error('[API Error] Livro de Reclamações:', error);
    return NextResponse.json({ success: false, message: "Erro interno do servidor." }, { status: 500 });
  }
}

// Auditado por Dante: OK