'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const services = [
  {
    id: 'ai',
    title: 'Automação & IA',
    titleEn: 'Automation & AI',
    description: 'Chatbots inteligentes e automação de processos que reduzem custos e aumentam eficiência.',
    descriptionEn: 'Intelligent chatbots and process automation that reduce costs and increase efficiency.',
    highlight: '⏱️ -80% tempo em tarefas repetitivas',
    features: ['Chatbots personalizados', 'Automação de vendas', 'Integração WhatsApp'],
    image: '/img/bg-ai.png',
    link: '/servicos/automacao',
    cta: 'Agendar Demo'
  },
  {
    id: 'web',
    title: 'Websites Premium',
    titleEn: 'Premium Websites',
    description: 'Websites que convertem visitantes em clientes. Design premium, performance otimizada e SEO integrado.',
    descriptionEn: 'Websites that convert visitors into customers. Premium design, optimized performance and integrated SEO.',
    highlight: '🚀 +340% conversões em 60 dias',
    features: ['Design responsivo premium', 'SEO otimizado (Google)', 'Performance ultra-rápida'],
    image: '/img/bg-websites.png',
    link: '/servicos/web-design',
    cta: 'Solicitar Orçamento'
  },
  {
    id: 'apps',
    title: 'Apps Móveis',
    titleEn: 'Mobile Apps',
    description: 'Aplicações móveis nativas e híbridas que conectam a sua marca aos clientes 24/7.',
    descriptionEn: 'Native and hybrid mobile applications that connect your brand to customers 24/7.',
    highlight: '📱 Engagement +250% vs website',
    features: ['iOS & Android nativos', 'Push notifications', 'Integração com sistemas'],
    image: '/img/bg-apps.png',
    link: '/servicos/apps',
    cta: 'Ver Demos'
  }
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 bg-black text-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-emerald-400"
          >
            Serviços que Transformam Negócios
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300"
          >
            Soluções digitais premium que elevam a sua marca e geram resultados mensuráveis no mercado português.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="group relative rounded-2xl overflow-hidden bg-gray-900 border border-gray-800 hover:border-purple-500/50 transition-all duration-300 flex flex-col h-full"
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover opacity-20 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-emerald-400 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-300 mb-6 flex-grow">
                  {service.description}
                </p>

                {/* Highlight Badge */}
                <div className="bg-purple-900/40 border border-purple-500/30 rounded-lg p-3 mb-6 inline-block">
                  <span className="text-sm font-semibold text-purple-300">
                    {service.highlight}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-400">
                      <svg className="w-5 h-5 text-emerald-500 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      \
                    </li>
                  ))}
                </ul>

                <Link 
                  href={service.link}
                  className="mt-auto inline-flex items-center justify-center w-full py-3 px-6 rounded-xl font-semibold bg-white/10 hover:bg-white hover:text-black transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                >
                  {service.cta}
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
