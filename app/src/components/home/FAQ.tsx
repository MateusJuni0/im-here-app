'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'Como funciona o processo de desenvolvimento?',
    answer: 'A nossa abordagem "Elite" divide-se em 4 fases: Descoberta, Design, Desenvolvimento e Lançamento. Trabalhamos em estreita colaboração consigo para garantir que cada detalhe reflete a visão da sua marca, com atualizações semanais.'
  },
  {
    question: 'Qual é o prazo típico para a entrega de um projeto premium?',
    answer: 'Projetos institucionais demoram entre 4 a 6 semanas, enquanto plataformas mais complexas (e-commerce, web apps) podem levar de 8 a 12 semanas, dependendo dos requisitos de integração.'
  },
  {
    question: 'Oferecem suporte e manutenção após o lançamento?',
    answer: 'Sim, todos os nossos projetos incluem um período de garantia e oferecemos planos de manutenção "Concierge" para garantir que o seu sistema permanece seguro, rápido e atualizado.'
  },
  {
    question: 'Como garantem a otimização SEO e a performance?',
    answer: 'Utilizamos tecnologias de ponta e as melhores práticas da indústria desde o primeiro dia de código, assegurando carregamentos ultra-rápidos e estruturas amigáveis para os motores de busca e otimização SEO máxima.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-24 bg-black text-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-4xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
          >
            Perguntas Frequentes
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400"
          >
            Transparência total. Tudo o que precisa de saber sobre os nossos serviços.
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
                >
                  <span className="text-lg font-semibold text-gray-200 group-hover:text-emerald-400 transition-colors">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-4 flex-shrink-0 text-gray-400 group-hover:text-emerald-400"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </motion.span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}