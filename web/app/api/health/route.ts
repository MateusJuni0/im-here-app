import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabase } from '@/lib/supabaseClient'; // Ajuste o caminho se necessário

const HealthSchema = z.object({
  userId: z.string().uuid('O ID do usuário deve ser um UUID válido.'),
  action: z.enum(['telemedicine', 'insurance_update']),
  details: z.string().optional(),
});

/**
 * Backend para Gestão de Elite Health Passport com integração Supabase
 * Pilar 30
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = HealthSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json({ data: null, error: validated.error.flatten().fieldErrors }, { status: 400 });
    }

    const { userId, action, details } = validated.data;

    // Inserir o registro no banco de dados Supabase
    const { data, error } = await supabase
      .from('health_records') // Nome da tabela
      .insert([
        { 
          user_id: userId, 
          action: action, 
          details: details 
        },
      ])
      .select()
      .single(); // .single() para retornar o objeto inserido diretamente

    if (error) {
      // Tratar erros do Supabase, como violações de chave estrangeira
      console.error('Erro do Supabase:', error.message);
      return NextResponse.json({ data: null, error: `Falha ao registrar a ação de saúde: ${error.message}` }, { status: 500 });
    }

    return NextResponse.json({ 
      data: {
        status: 'success',
        record: data
      }, 
      error: null 
    });

  } catch (e: any) {
    console.error('Erro inesperado no endpoint de saúde:', e);
    const errorMessage = e.message || 'Erro no serviço Elite Health Passport';
    return NextResponse.json({ data: null, error: errorMessage }, { status: 500 });
  }
}

/**
 * Endpoint para buscar registros de saúde de um usuário
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ data: null, error: 'O ID do usuário é obrigatório.' }, { status: 400 });
  }

  // Validação simples para verificar se é um UUID
  const uuidSchema = z.string().uuid();
  const validated = uuidSchema.safeParse(userId);
  if (!validated.success) {
    return NextResponse.json({ data: null, error: 'ID de usuário inválido.' }, { status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from('health_records')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro do Supabase:', error.message);
      return NextResponse.json({ data: null, error: `Falha ao buscar registros: ${error.message}` }, { status: 500 });
    }

    return NextResponse.json({ data: data, error: null });

  } catch (e: any) {
    console.error('Erro inesperado no endpoint de saúde (GET):', e);
    const errorMessage = e.message || 'Erro ao buscar dados de saúde.';
    return NextResponse.json({ data: null, error: errorMessage }, { status: 500 });
  }
}
