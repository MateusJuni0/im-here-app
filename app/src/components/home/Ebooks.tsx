'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, CheckCircle2, ChevronRight, BookOpen } from 'lucide-react';

const ebooks = [
  {
    id: 'estrategia',
    icon: '📘',
    title: 'Guia Definitivo de Estratégia Digital',
    titleEn: 'Ultimate Digital Strategy Guide',
    pages: '47 páginas • PDF',
    pagesEn: '47 pages • PDF',
    description: 'Metodologia completa para criar uma presença digital que gera receita consistente. Das bases do posicionamento até estratégias avançadas de conversão.',
    descriptionEn: 'Complete methodology to create a digital presence that generates consistent revenue. From positioning basics to advanced conversion strategies.',
    features: [
      'Framework de posicionamento digital',
      '12 estratégias de aquisição de clientes',
      'Templates e checklists práticos',
      'Casos de estudo reais (Portugal)',
    ],
    featuresEn: [
      'Digital positioning framework',
      '12 customer acquisition strategies',
      'Practical templates and checklists',
      'Real case studies (Portugal)',
    ],
    whatsappLink: "https://wa.me/351964977047?text=Olá! Quero comprar o ebook 'Guia Definitivo de Estratégia Digital' por 5€. Meu MBWay é: [SEU_NÚMERO]"
  },
  {
    id: 'automacao',
    icon: '🤖',
    title: 'Automação & IA para Negócios',
    titleEn: 'Automation & AI for Business',
    pages: '38 páginas • PDF',
    pagesEn: '38 pages • PDF',
    description: 'Manual prático para implementar automação inteligente que reduz custos operacionais em até 80% e liberta tempo para focar no crescimento.',
    descriptionEn: 'Practical manual to implement intelligent automation that reduces operational costs by up to 80% and frees time to focus on growth.',
    features: [
      '20 processos para automatizar hoje',
      'Chatbots que vendem automaticamente',
      'Ferramentas gratuitas e pagas',
      'ROI calculado em cada automação',
    ],
    featuresEn: [
      '20 processes to automate today',
      'Chatbots that sell automatically',
      'Free and paid tools',
      'ROI calculated for each automation',
    ],
    whatsappLink: "https://wa.me/351964977047?text=Olá! Quero comprar o ebook 'Automação & IA para Negócios' por 5€. Meu MBWay é: [SEU_NÚMERO]"
  },
  {
    id: 'local',
    icon: '📍',
    title: 'Marketing Local Que Funciona',
    titleEn: 'Local Marketing That Works',
    pages: '32 páginas • PDF',
    pagesEn: '32 pages • PDF',
    description: 'Estratégias específicas para negócios locais dominarem o Google Maps, redes sociais e gerarem clientes na sua região geográfica.',
    descriptionEn: 'Specific strategies for local businesses to dominate Google Maps, social networks and generate customers in their geographical region.',
    features: [
      'SEO local: aparecer em 1º no Google',
      'Google My Business otimizado',
      'Facebook/Instagram para locais',
      'Scripts para abordagem presencial',
    ],
    featuresEn: [
      'Local SEO: appear 1st on Google',
      'Optimized Google My Business',
      'Facebook/Instagram for locals',
      'Scripts for in-person approach',
    ],
    whatsappLink: "https://wa.me/351964977047?text=Olá! Quero comprar o ebook 'Marketing Local Que Funciona' por 5€. Meu MBWay é: [SEU_NÚMERO]"
  },
  {
    id: 'vendas',
    icon: '💰',
    title: 'Funil de Vendas Digital',
    titleEn: 'Digital Sales Funnel',
    pages: '41 páginas • PDF',
    pagesEn: '41 pages • PDF',
    description: 'Metodologia step-by-step para criar funis que convertem visitantes em clientes pagantes, incluindo copywriting, automação e análise de métricas.',
    descriptionEn: 'Step-by-step methodology to create funnels that convert visitors into paying customers, including copywriting, automation and metrics analysis.',
    features: [
      'Templates de landing pages',
      'Emails que vendem (sequências)',
      'Análise de conversão detalhada',
      'A/B testing que funciona',
    ],
    featuresEn: [
      'Landing page templates',
      'Emails that sell (sequences)',
      'Detailed conversion analysis',
      'A/B testing that works',
    ],
    whatsappLink: "https://wa.me/351964977047?text=Olá! Quero comprar o ebook 'Funil de Vendas Digital' por 5€. Meu MBWay é: [SEU_NÚMERO]"
  }
];

export default function Ebooks() {
  return (
    <section id="ebooks" className="relative py-24 w-full bg-black text-white overflow-hidden">
      {/* Background Planets & Nebula */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <motion.img 
          src="/img/planet-purple.png" 
          alt="Purple Planet" 
          className="absolute top-10 left-10 w-48 h-48 opacity-50 blur-[2px]"
          animate={{ y: [0, -20, 0], x: [0, 10, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.img 
          src="/img/planet-gold.png" 
          alt="Gold Planet" 
          className="absolute bottom-20 right-10 w-64 h-64 opacity-50 blur-[1px]"
          animate={{ y: [0, 25, 0], x: [0, -15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.img 
          src="/img/planet-cyan.png" 
          alt="Cyan Planet" 
          className="absolute top-1/2 left-3/4 w-32 h-32 opacity-40 blur-[3px]"
          animate={{ y: [0, -15, 0], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Header da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
              Ebooks Estratégicos Premium
            </h2>
            <p className="text-lg md:text-xl text-gray-400 mb-8">
              Conhecimento estratégico condensado que normalmente custa centenas de euros em consultorias. 
              Acesso instantâneo ao know-how que transformará o seu negócio.
            </p>

            <div className="inline-flex flex-col items-center bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-end gap-2 mb-4">
                <span className="text-5xl font-black text-white">5€</span>
                <span className="text-gray-400 pb-1">/ ebook</span>
              </div>
              <div className="flex items-center gap-2 text-green-400 bg-green-400/10 px-4 py-2 rounded-full border border-green-400/20">
                <span>📱</span>
                <span className="font-medium text-sm">MBWay:</span>
                <span className="font-bold tracking-wider">964 977 047</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Grid de Ebooks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {ebooks.map((ebook, idx) => (
            <motion.div
              key={ebook.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]"
            >
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center text-3xl shadow-inner border border-white/5 group-hover:scale-110 transition-transform duration-300">
                    {ebook.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white mb-1">5€</div>
                    <div className="text-xs text-gray-400 flex items-center gap-1 justify-end">
                      <BookOpen className="w-3 h-3" />
                      {ebook.pages.split('•')[0].trim()}
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">{ebook.title}</h3>
                <p className="text-sm text-gray-400 mb-6 flex-1">{ebook.description}</p>

                <ul className="space-y-3 mb-8">
                  {ebook.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 text-sm text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-white/5 border-t border-white/10">
                <a 
                  href={ebook.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-purple-500/25 active:scale-[0.98]"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Comprar via WhatsApp</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Value Proposition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-amber-500/20 rounded-3xl p-8 md:p-12 text-center shadow-[0_0_40px_rgba(245,158,11,0.1)] relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-50"></div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white flex items-center justify-center gap-3">
            <span className="text-3xl">💎</span> Por que investir 5€?
          </h3>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Cada ebook condensa anos de experiência e centenas de horas de consultoria em estratégias práticas. 
            O valor que vai extrair supera em muito o investimento. Garantia de satisfação ou devolução do dinheiro.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
