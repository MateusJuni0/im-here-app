// /web/app/api/treasury/tax-free/route.ts

import { NextResponse } from 'next/server';
import { z } from 'zod';

// Zod schema for VAT refund requests
const taxFreeSchema = z.object({
  touristPassportId: z.string().min(5, "Número de passaporte inválido"),
  purchaseInvoiceId: z.string().uuid("ID da fatura inválido"),
  items: z.array(z.object({
    productId: z.string().uuid(),
    quantity: z.number().int().positive(),
    price: z.number().positive(),
  })).min(1, "A lista de itens não pode estar vazia"),
});

/**
 * @swagger
 * /api/treasury/tax-free:
 *   post:
 *     summary: Processa um pedido de devolução de IVA (Tax Free) em tempo real.
 *     description: Valida os dados de uma compra e submete o pedido para devolução de IVA para turistas.
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
 *               touristPassportId:
 *                 type: string
 *                 example: "AB123456"
 *               purchaseInvoiceId:
 *                 type: string
 *                 format: uuid
 *                 example: "f4b3c2d1-e6f5-4321-ba98-7654321fedcb"
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                       format: uuid
 *                     quantity:
 *                       type: integer
 *                     price:
 *                       type: number
 *                 example:
 *                   - productId: "a1b2c3d4-e5f6-7890-1234-567890abcdef"
 *                     quantity: 1
 *                     price: 123.00
 *     responses:
 *       200:
 *         description: Pedido de devolução de IVA processado.
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
 *                   example: "Pedido de Tax Free submetido."
 *                 refundId:
 *                   type: string
 *                   format: uuid
 *                 estimatedRefundAmount:
 *                   type: number
 *       400:
 *         description: Dados de entrada inválidos.
 *       500:
 *         description: Erro interno do servidor.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = taxFreeSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ success: false, errors: validation.error.issues }, { status: 400 });
    }

    const { items } = validation.data;
    const totalAmount = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    
    // Simulação da lógica de cálculo de IVA (ex: 23% em Portugal)
    const vatRate = 0.23;
    const estimatedRefundAmount = parseFloat((totalAmount * vatRate).toFixed(2));

    const refundId = crypto.randomUUID();

    console.log(`[TAX FREE] Pedido recebido: ${refundId}`, { totalAmount, estimatedRefundAmount });

    return NextResponse.json({
      success: true,
      message: "Pedido de Tax Free submetido.",
      refundId,
      estimatedRefundAmount
    });

  } catch (error) {
    console.error('[API Error] Tax Free:', error);
    return NextResponse.json({ success: false, message: "Erro interno do servidor." }, { status: 500 });
  }
}

// Auditado por Dante: OK