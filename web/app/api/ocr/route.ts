import { NextResponse } from 'next/server';
import { z } from 'zod';
import { ImageAnnotatorClient } from '@google-cloud/vision';

// Schema de validação Zod
const OcrSchema = z.object({
  imageUrl: z.string().url('URL inválida.'),
  type: z.enum(['menu', 'invoice']),
});

// Helper para inicializar o cliente do Google Vision
const getVisionClient = () => {
  const credentialsJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;
  if (!credentialsJson) {
    throw new Error('As credenciais do Google Cloud Vision não foram definidas na variável de ambiente GOOGLE_APPLICATION_CREDENTIALS_JSON.');
  }
  const credentials = JSON.parse(credentialsJson);
  return new ImageAnnotatorClient({ credentials });
};

/**
 * Endpoint de Processamento via OCR com Google Cloud Vision
 * Pilares: 12 (Live Menu AI) e 14 (Verificador de Conta)
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = OcrSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json({ data: null, error: validated.error.flatten().fieldErrors }, { status: 400 });
    }

    const { imageUrl, type } = validated.data;

    const client = getVisionClient();

    const [result] = await client.textDetection(imageUrl);
    const detections = result.textAnnotations;
    const text = detections?.[0]?.description ?? '';

    // Lógica adicional pode ser implementada aqui baseada no 'type'
    // Por exemplo, para 'invoice', poderíamos procurar por totais, datas, etc.
    // Para 'menu', poderíamos estruturar os itens e preços.

    const ocrResult = {
      text: text.trim(),
      verified: type === 'invoice' ? text.includes('TOTAL') : undefined, // Exemplo simples de verificação
    };

    return NextResponse.json({
      data: {
        result: ocrResult,
        message: `Processamento de ${type} concluído com sucesso.`
      },
      error: null
    });

  } catch (e: any) {
    console.error(e);
    // Adicionado para fornecer mais detalhes do erro em desenvolvimento
    const errorMessage = e.message || 'Erro interno no serviço de OCR';
    return NextResponse.json({ data: null, error: errorMessage }, { status: 500 });
  }
}
