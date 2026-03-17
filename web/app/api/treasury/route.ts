import { NextResponse } from 'next/server';

export async function GET() {
  // Mock de otimização fiscal (Quantum Treasury)
  const treasuryStatus = {
    tax_residency: "Portugal (NHR)",
    optimization_score: 94,
    tax_saved_this_year: "€ 12.450",
    next_deadline: "31 de Maio - IRS",
    recommendations: [
      "Aumentar contribuição para PPR Elite (+ € 2.000)",
      "Validar faturas de Saúde pendentes",
      "Otimização de mais-valias via reinvestimento"
    ]
  };

  return NextResponse.json({ data: treasuryStatus, error: null });
}
