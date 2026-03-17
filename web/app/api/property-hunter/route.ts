import { NextResponse } from 'next/server';

export async function GET() {
  // Mock de dados de prospecção imobiliária VIP (Nero Scraping)
  const properties = [
    {
      id: "p1",
      title: "Penthouse Avenida da Liberdade",
      price: "€ 4.500.000",
      type: "T4",
      features: ["Vista Rio", "Piscina Privada", "Concierge 24h"],
      status: "Disponível",
      image: "🏙️"
    },
    {
      id: "p2",
      title: "Villa Cascais Elite",
      price: "€ 8.200.000",
      type: "T6",
      features: ["Primeira Linha de Mar", "Garagem 10 Carros", "Cinema"],
      status: "Sob Consulta",
      image: "🌊"
    },
    {
      id: "p3",
      title: "Palacete Chiado Classic",
      price: "€ 5.900.000",
      type: "T5",
      features: ["Histórico", "Jardim Privado", "Rooftop"],
      status: "Disponível",
      image: "🏛️"
    }
  ];

  return NextResponse.json({ data: properties, error: null });
}
