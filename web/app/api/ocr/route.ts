import { NextResponse } from 'next/server';
import { z } from 'zod';

// Schema de validação Zod
const OcrSchema = z.object({
  imageUrl: z.string().url(),
  type: z.enum(['menu', 'invoice']),
});

/**
 * Endpoint de Processamento via OCR
 * Pilares: 12 (Live Menu AI) e 14 (Verificador de Conta)
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = OcrSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json({ data: null, error: 'Dados inválidos' }, { status: 400 });
    }

    const { imageUrl, type } = validated.data;

    // Simulação de chamada para serviço de OCR (Tesseract / Vision API)
    // Em produção, aqui integraria com Google Cloud Vision ou Tesseract.js
    const ocrResult = {
      text: "Exemplo de conteúdo extraído via OCR",
      confidence: 0.98,
      verified: type === 'invoice' ? true : undefined,
    };

    return NextResponse.json({ 
      data: { 
        result: ocrResult,
        message: `Processamento de ${type} concluído com sucesso.`
      }, 
      error: null 
    });
  } catch (e) {
    return NextResponse.json({ data: null, error: 'Erro interno no serviço de OCR' }, { status: 500 });
  }
}
